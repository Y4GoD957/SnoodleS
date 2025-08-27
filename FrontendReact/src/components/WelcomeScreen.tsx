import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Rocket } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-light flex items-center justify-center p-4">
      <Card className="max-w-lg w-full shadow-card border-0 bg-card/80 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
              <Sparkles className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Bem-vindo ao SaaS Creator
            </h1>
            <p className="text-muted-foreground text-lg">
              Vamos criar o SaaS perfeito para seu negócio em apenas alguns passos
            </p>
          </div>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center text-left space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold text-sm">1</span>
              </div>
              <span className="text-muted-foreground">Responda algumas perguntas sobre seu negócio</span>
            </div>
            <div className="flex items-center text-left space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold text-sm">2</span>
              </div>
              <span className="text-muted-foreground">Receba um prompt estruturado personalizado</span>
            </div>
            <div className="flex items-center text-left space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold text-sm">3</span>
              </div>
              <span className="text-muted-foreground">Tenha seu SaaS criado automaticamente</span>
            </div>
          </div>

          <Button 
            onClick={onStart}
            size="lg"
            variant="hero"
            className="w-full"
          >
            <Rocket className="w-5 h-5 mr-2" />
            Começar Agora
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}