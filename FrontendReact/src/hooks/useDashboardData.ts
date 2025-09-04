import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

// Tipos para os dados do dashboard
export interface Project {
  id: string;
  client_name: string;
  project_type: string;
  value: number;
  status: string;
  sale_date: string;
  created_at: string;
}

export interface MonthlyGoal {
  id: string;
  month_year: string;
  sales_goal: number;
  revenue_goal: number;
}

export interface DashboardStats {
  totalProjects: number;
  totalRevenue: number;
  monthlyRevenue: number;
  recentProjects: Project[];
  currentGoals: MonthlyGoal | null;
  projectTypeStats: { [key: string]: number };
}

/**
 * Hook para buscar e gerenciar dados do dashboard
 */
export function useDashboardData() {
  const { user } = useAuth();
  const [data, setData] = useState<DashboardStats>({
    totalProjects: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
    recentProjects: [],
    currentGoals: null,
    projectTypeStats: {},
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Memoizar loadDashboardData para evitar loops infinitos
  const loadDashboardData = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      // Buscar projetos
      const { data: projects, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (projectsError) throw projectsError;

      // Buscar metas do mês atual
      const currentMonth = new Date().toISOString().slice(0, 7);
      const { data: goals, error: goalsError } = await supabase
        .from('monthly_goals')
        .select('*')
        .eq('user_id', user.id)
        .eq('month_year', currentMonth)
        .maybeSingle();

      if (goalsError) throw goalsError;

      // Calcular estatísticas
      const totalProjects = projects?.length || 0;
      const totalRevenue = projects?.reduce((sum, p) => sum + Number(p.value), 0) || 0;

      const currentMonthProjects =
        projects?.filter((p) => p.sale_date?.startsWith(currentMonth)) || [];
      const monthlyRevenue = currentMonthProjects.reduce((sum, p) => sum + Number(p.value), 0);

      const projectTypeStats: { [key: string]: number } = {};
      projects?.forEach((project) => {
        projectTypeStats[project.project_type] = (projectTypeStats[project.project_type] || 0) + 1;
      });

      setData({
        totalProjects,
        totalRevenue,
        monthlyRevenue,
        recentProjects: projects?.slice(0, 5) || [],
        currentGoals: goals,
        projectTypeStats,
      });
    } catch (err) {
      console.error('Erro ao carregar dados do dashboard:', err);
      setError('Erro ao carregar dados do dashboard');
    } finally {
      setLoading(false);
    }
  }, [user]);

  // useEffect atualizado, sem warnings
  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  // Adicionar projeto
  const addProject = async (projectData: Omit<Project, 'id' | 'created_at'>) => {
    if (!user) return { error: 'Usuário não autenticado' };

    try {
      const { error } = await supabase
        .from('projects')
        .insert([{ ...projectData, user_id: user.id }]);

      if (error) throw error;

      await loadDashboardData();
      return { error: null };
    } catch (err) {
      console.error('Erro ao adicionar projeto:', err);
      return { error: 'Erro ao adicionar projeto' };
    }
  };

  // Definir metas mensais
  const setMonthlyGoals = async (salesGoal: number, revenueGoal: number) => {
    if (!user) return { error: 'Usuário não autenticado' };

    try {
      const currentMonth = new Date().toISOString().slice(0, 7);

      const { error } = await supabase.from('monthly_goals').upsert([
        {
          user_id: user.id,
          month_year: currentMonth,
          sales_goal: salesGoal,
          revenue_goal: revenueGoal,
        },
      ]);

      if (error) throw error;

      await loadDashboardData();
      return { error: null };
    } catch (err) {
      console.error('Erro ao definir metas:', err);
      return { error: 'Erro ao definir metas' };
    }
  };

  return {
    data,
    loading,
    error,
    addProject,
    setMonthlyGoals,
    refresh: loadDashboardData,
  };
}
