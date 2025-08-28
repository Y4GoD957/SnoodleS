import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Rocket } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-light flex items-center justify-center p-4">
      <Card className="max-w-lg w-full border-0 bg-card/90 backdrop-blur-sm shadow-2xl rounded-xl">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
              <img src="/logo.png" alt="Logo da empresa" className="w-28 h-28 mx-auto rounded-xl object-contain" />
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Bem-vindo ao SnoodleS
            </h1>
            <p className="text-muted-foreground text-lg">
              Vamos criar o website perfeito para seu negócio em apenas alguns passos
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
              <span className="text-muted-foreground">Receba um código estruturado personalizado</span>
            </div>
            <div className="flex items-center text-left space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold text-sm">3</span>
              </div>
              <span className="text-muted-foreground">Tenha seu Website criado automaticamente</span>
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