import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingUp, Package, ArrowLeft } from "lucide-react";

interface DashboardProps {
  onBack: () => void;
}

// Mock data - em uma aplicação real, estes dados viriam de uma API
const mockData = {
  totalSaas: 12,
  totalRevenue: 24500,
  monthlyRevenue: 8950,
  recentSales: [
    { id: 1, client: "João Silva", saas: "E-commerce Medical", value: 2500, date: "2024-01-15" },
    { id: 2, client: "Maria Santos", saas: "Course Platform", value: 1800, date: "2024-01-14" },
    { id: 3, client: "Pedro Costa", saas: "Clinic Manager", value: 3200, date: "2024-01-13" },
    { id: 4, client: "Ana Lima", saas: "Restaurant POS", value: 2100, date: "2024-01-12" },
  ]
};

export function Dashboard({ onBack }: DashboardProps) {
  return (
    <div className="min-h-screen bg-gradient-light">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard Financeiro</h1>
            <p className="text-muted-foreground">Acompanhe o desempenho dos seus SaaS criados</p>
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
              <CardTitle className="text-sm font-medium">Total de SaaS Vendidos</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{mockData.totalSaas}</div>
              <p className="text-xs text-muted-foreground">
                +3 desde o mês passado
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
                R$ {mockData.totalRevenue.toLocaleString('pt-BR')}
              </div>
              <p className="text-xs text-muted-foreground">
                +12% desde o mês passado
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
                R$ {mockData.monthlyRevenue.toLocaleString('pt-BR')}
              </div>
              <p className="text-xs text-muted-foreground">
                +8% desde o mês passado
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Vendas Recentes */}
        <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Vendas Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.recentSales.map((sale) => (
                <div key={sale.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">{sale.client}</p>
                    <p className="text-sm text-muted-foreground">{sale.saas}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">
                      R$ {sale.value.toLocaleString('pt-BR')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(sale.date).toLocaleDateString('pt-BR')}
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
              <CardTitle>Tipos de SaaS Mais Vendidos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">E-commerce</span>
                  <span className="font-medium">35%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Clínicas/Saúde</span>
                  <span className="font-medium">28%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Educação</span>
                  <span className="font-medium">22%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Restaurantes</span>
                  <span className="font-medium">15%</span>
                </div>
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
                    <span className="text-sm font-medium">8/15</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '53%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Receita</span>
                    <span className="text-sm font-medium">R$ 8.950 / R$ 15.000</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '60%' }}></div>
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