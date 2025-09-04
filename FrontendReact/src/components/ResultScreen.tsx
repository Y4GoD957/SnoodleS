import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';
import { QuestionnaireData } from './QuestionnaireScreen';
import { useToast } from '@/hooks/use-toast';

interface ResultScreenProps {
  data: QuestionnaireData;
  onBack: () => void;
  onStartOver: () => void;
}

export function ResultScreen({ data, onBack, onStartOver }: ResultScreenProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const { toast } = useToast();

  const generatePrompt = () => {
    const featuresText = data.features
      .map((f) => {
        const featureNames: Record<string, string> = {
          login: 'Sistema de Login',
          scheduling: 'Agendamento',
          chat: 'Chat/Mensagens',
          ecommerce: 'Carrinho de Compras',
          automation: 'Automações',
          payments: 'Pagamentos',
          reports: 'Relatórios',
          notifications: 'Notificações',
        };
        return featureNames[f] || f;
      })
      .join(', ');

    return `Crie um SaaS completo com as seguintes especificações:

**Nicho:** ${data.niche}
**Cores:** ${data.colors}
**Público-Alvo:** ${data.targetAudience}
**Plataforma:** ${data.platform === 'web' ? 'Web' : data.platform === 'mobile' ? 'Mobile' : 'Web e Mobile'}

**Funcionalidades:** ${featuresText}

**IA:** ${data.aiIntegration === 'yes' ? 'Sim - Implementar recursos de IA' : 'Não'}
**Automação:** ${
      data.messageAutomation === 'whatsapp'
        ? 'WhatsApp'
        : data.messageAutomation === 'email'
          ? 'E-mail'
          : data.messageAutomation === 'telegram'
            ? 'Telegram'
            : data.messageAutomation === 'all'
              ? 'WhatsApp, E-mail e Telegram'
              : 'Não necessário'
    }
**Admin:** ${data.adminPanel === 'yes' ? 'Sim' : 'Não'}

${data.observations ? `**Observações:** ${data.observations}` : ''}

Crie um aplicativo moderno, responsivo e profissional com design atrativo e UX intuitiva.`;
  };

  const handleGenerateCode = async () => {
    setIsGenerating(true);

    try {
      const prompt = generatePrompt();

      // Simula chamada de API - aqui você integraria com a API do Lovable
      const response = await fetch('/api/generate-saas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (response.ok) {
        const result = await response.json();
        setGeneratedCode(result.code);

        toast({
          title: 'Código gerado com sucesso!',
          description: 'Seu SaaS foi criado e está pronto para uso.',
        });
      } else {
        throw new Error('Falha na geração do código');
      }
    } catch (error) {
      console.error('Erro ao gerar código:', error);
      toast({
        title: 'Erro na geração',
        description: 'Ocorreu um erro ao gerar o código. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-light p-4 grid place-items-center">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div
            className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center 
                        bg-gradient-hero shadow-glow"
          >
            {isGenerating ? (
              <Loader2 className="w-10 h-10 text-primary-foreground animate-spin" />
            ) : (
              <CheckCircle className="w-10 h-10 text-primary-foreground" />
            )}
          </div>
          <h1 className="text-3xl font-bold text-primary-foreground mb-2">
            {isGenerating
              ? 'Gerando seu SaaS...'
              : generatedCode
                ? 'SaaS Gerado com Sucesso!'
                : 'Pronto para Gerar seu SaaS!'}
          </h1>
          <p className="text-primary-foreground/80 text-lg">
            {isGenerating
              ? 'Aguarde enquanto criamos seu aplicativo personalizado'
              : generatedCode
                ? 'Seu SaaS foi criado e está pronto para uso'
                : 'Clique no botão abaixo para gerar seu SaaS automaticamente'}
          </p>
        </div>

        {!generatedCode && !isGenerating && (
          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm mb-6">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold mb-4">Especificação Pronta</h3>
              <p className="text-muted-foreground mb-6">
                Baseado nas suas respostas, vamos gerar automaticamente um SaaS completo e
                funcional.
              </p>
              <Button variant="hero" size="lg" onClick={handleGenerateCode} className="px-8">
                <CheckCircle className="w-5 h-5 mr-2" />
                Gerar SaaS Agora
              </Button>
            </CardContent>
          </Card>
        )}

        {isGenerating && (
          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm mb-6">
            <CardContent className="p-6 text-center">
              <div className="space-y-4">
                <Loader2 className="w-12 h-12 mx-auto animate-spin text-primary" />
                <h3 className="text-lg font-semibold">Criando seu SaaS personalizado...</h3>
                <p className="text-muted-foreground">
                  Isso pode levar alguns momentos. Estamos configurando todas as funcionalidades
                  solicitadas.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {generatedCode && (
          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm mb-6">
            <CardHeader>
              <CardTitle>Seu SaaS foi Criado!</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 rounded-lg p-4 max-h-96 overflow-y-auto">
                <pre className="text-sm text-foreground whitespace-pre-wrap font-mono">
                  {generatedCode}
                </pre>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-center space-x-4 mt-8">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <Button variant="hero" onClick={onStartOver}>
            Criar Novo SaaS
          </Button>
        </div>
      </div>
    </div>
  );
}
