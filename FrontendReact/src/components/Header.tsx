import { Button } from "@/components/ui/button";
import { Sparkles, User, LogOut, BarChart3 } from "lucide-react";

interface HeaderProps {
  onDashboard?: () => void;
  onLogin?: () => void;
  onLogout?: () => void;
  isAuthenticated?: boolean;
}

export function Header({ onDashboard, onLogin, onLogout, isAuthenticated = false }: HeaderProps) {
  return (
    <header className="bg-card/80 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">SaaS Creator</h1>
              <p className="text-xs text-muted-foreground">Crie seu SaaS em minutos</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onDashboard}
                  className="flex items-center"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLogout}
                  className="flex items-center"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={onLogin}
                className="flex items-center"
              >
                <User className="w-4 h-4 mr-2" />
                Entrar
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>