import { Button } from '@/components/ui/button';
import { Sparkles, User, LogOut, BarChart3 } from 'lucide-react';

interface HeaderProps {
  onDashboard?: () => void;
  onLogin?: () => void;
  onLogout?: () => void;
  isAuthenticated?: boolean;
}

export function Header({ onDashboard, onLogin, onLogout, isAuthenticated = false }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card backdrop-blur-sm border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <img
              src="/logoClaro.png"
              alt="Logo da empresa"
              className="w-16 h-16 rounded-lg object-contain"
            />
            <div>
              <h1 className="text-xl font-bold text-foreground">SnoodleS</h1>
              <p className="text-xs text-muted-foreground">Crie seu Website em minutos</p>
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
                <Button variant="ghost" size="sm" onClick={onLogout} className="flex items-center">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </Button>
              </>
            ) : (
              <Button variant="outline" size="sm" onClick={onLogin} className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                Entrar
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
