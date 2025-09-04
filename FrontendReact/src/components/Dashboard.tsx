import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingUp, Package, ArrowLeft } from "lucide-react";

interface DashboardProps {
  onBack: () => void;
}

// Dados fictícios do protótipo
const mockData = {
  totalProjects: 12,
  totalRevenue: 24500,
  monthlyRevenue: 8950,
  recentProjects: [
    { id: 1, client_name: "João Silva", project_type: "E-commerce Medical", value: 2500, sale_date: "2024-01-15" },
    { id: 2, client_name: "Maria Santos", project_type: "Course Platform", value: 1800, sale_date: "2024-01-14" },
    { id: 3, client_name: "Pedro Costa", project_type: "Clinic Manager", value: 3200, sale_date: "2024-01-13" },
    { id: 4, client_name: "Ana Lima", project_type: "Restaurant POS", value: 2100, sale_date: "2024-01-12" },
  ],
  projectTypeStats: {
    "E-commerce": 5,
    "Clínicas/Saúde": 3,
    "Educação": 2,
    "Restaurantes": 2,
  },
  currentGoals: {
    sales_goal: 15,
    revenue_goal: 15000,
  },
};

export function Dashboard({ onBack }: DashboardProps) {
  const salesProgress = Math.min((mockData.totalProjects / mockData.currentGoals.sales_goal) * 100, 100);
  const revenueProgress = Math.min((mockData.monthlyRevenue / mockData.currentGoals.revenue_goal) * 100, 100);

  return (
    <div className="min-h-screen bg-gradient-light">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary-foreground mb-2">Dashboard Financeiro</h1>
            <p className="text-primary-foreground/80">Bem-vindo, usuário! Acompanhe o desempenho dos seus projetos</p>
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
              <div className="text-2xl font-bold text-primary">{mockData.totalProjects}</div>
              <p className="text-xs text-muted-foreground">Projetos concluídos</p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Faturamento Total</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                R$ {mockData.totalRevenue.toLocaleString("pt-BR")}
              </div>
              <p className="text-xs text-muted-foreground">+12% desde o mês passado</p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                R$ {mockData.monthlyRevenue.toLocaleString("pt-BR")}
              </div>
              <p className="text-xs text-muted-foreground">
                +8% desde o mês passado
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
            <div className="space-y-4">
              {mockData.recentProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
                >
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">{project.client_name}</p>
                    <p className="text-sm text-muted-foreground">{project.project_type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">
                      R$ {project.value.toLocaleString("pt-BR")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(project.sale_date).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Resumo Mensal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Tipos de Projetos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(mockData.projectTypeStats).map(([type, count]) => {
                  const percentage = Math.round((count / mockData.totalProjects) * 100);
                  return (
                    <div key={type} className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{type}</span>
                      <span className="font-medium">{percentage}% ({count})</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Metas do Mês</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Vendas</span>
                    <span className="text-sm font-medium">
                      {mockData.totalProjects}/{mockData.currentGoals.sales_goal}
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
                      R$ {mockData.monthlyRevenue.toLocaleString("pt-BR")} / R$ {mockData.currentGoals.revenue_goal.toLocaleString("pt-BR")}
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}