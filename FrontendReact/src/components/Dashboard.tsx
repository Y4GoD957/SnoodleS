import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingUp, Package, ArrowLeft, Loader2 } from "lucide-react";
import { useDashboardData } from "@/hooks/useDashboardData";
import { useAuth } from "@/hooks/useAuth";

interface DashboardProps {
  onBack: () => void;
}

export function Dashboard({ onBack }: DashboardProps) {
  const { user } = useAuth();
  const { data, loading, error } = useDashboardData();

  // Calcular porcentagem das metas
  const salesProgress = data.currentGoals?.sales_goal 
    ? Math.min((data.totalProjects / data.currentGoals.sales_goal) * 100, 100)
    : 0;
  
  const revenueProgress = data.currentGoals?.revenue_goal 
    ? Math.min((data.monthlyRevenue / data.currentGoals.revenue_goal) * 100, 100)
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-light flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-light flex items-center justify-center">
        <Card className="max-w-md w-full shadow-card border-0 bg-card/80 backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <p className="text-destructive mb-4">{error}</p>
            <Button onClick={onBack} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-light">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard Financeiro</h1>
            <p className="text-muted-foreground">
              Bem-vindo, {user?.email?.split('@')[0]}! Acompanhe o desempenho dos seus projetos
            </p>
          </div>
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>

        {/* Cards de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Projetos Vendidos</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{data.totalProjects}</div>
              <p className="text-xs text-muted-foreground">
                {data.totalProjects === 0 ? 'Nenhum projeto ainda' : 'Projetos concluídos'}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Faturamento Total</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                R$ {data.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-muted-foreground">
                {data.totalProjects > 0 ? `Média de R$ ${(data.totalRevenue / data.totalProjects).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} por projeto` : 'Sem receita ainda'}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                R$ {data.monthlyRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-muted-foreground">
                {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Projetos Recentes */}
        <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Projetos Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            {data.recentProjects.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">Nenhum projeto encontrado</p>
                <p className="text-sm text-muted-foreground">
                  Adicione seus primeiros projetos para começar a acompanhar suas vendas
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {data.recentProjects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">{project.client_name}</p>
                      <p className="text-sm text-muted-foreground">{project.project_type}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">
                        R$ {Number(project.value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(project.sale_date).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Resumo Mensal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Tipos de Projetos</CardTitle>
            </CardHeader>
            <CardContent>
              {Object.keys(data.projectTypeStats).length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Nenhum projeto cadastrado ainda
                </p>
              ) : (
                <div className="space-y-3">
                  {Object.entries(data.projectTypeStats).map(([type, count]) => {
                    const percentage = Math.round((count / data.totalProjects) * 100);
                    return (
                      <div key={type} className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">{type}</span>
                        <span className="font-medium">{percentage}% ({count})</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Metas do Mês</CardTitle>
            </CardHeader>
            <CardContent>
              {data.currentGoals ? (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Vendas</span>
                      <span className="text-sm font-medium">
                        {data.totalProjects}/{data.currentGoals.sales_goal}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${salesProgress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Receita</span>
                      <span className="text-sm font-medium">
                        R$ {data.monthlyRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} / 
                        R$ {Number(data.currentGoals.revenue_goal).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${revenueProgress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground mb-2">
                    Nenhuma meta definida para este mês
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Defina suas metas para acompanhar seu progresso
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}