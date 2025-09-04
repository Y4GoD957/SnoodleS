import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { HexColorPicker } from 'react-colorful';

export interface QuestionnaireData {
  projectName: string;
  niche: string;
  colors: string;
  features: string[];
  aiIntegration: string;
  messageAutomation: string;
  targetAudience: string;
  adminPanel: string;
  platform: string;
  observations: string;
  hasLogo: boolean;
  logoFile: File | null;
  colorPalette: string[];
}

type QuestionId = keyof QuestionnaireData | 'logo' | 'colors';

interface QuestionnaireScreenProps {
  onComplete: (data: QuestionnaireData) => void;
  onBack: () => void;
}

const isValidHex = (hex: string) => /^#([0-9A-Fa-f]{6})$/.test(hex);

const questions: {
  id: QuestionId;
  title: string;
  type: 'input' | 'radio' | 'checkbox' | 'textarea' | 'custom';
  placeholder?: string;
  options?: { id: string; label: string }[];
}[] = [
  {
    id: 'projectName',
    title: 'Qual é o nome do seu projeto?',
    type: 'input',
    placeholder: 'Ex: SnoodleS, ClínicaX, MinhaLoja',
  },
  {
    id: 'niche',
    title: 'Qual é o nicho do seu aplicativo?',
    type: 'input',
    placeholder: 'Ex: clínica, e-commerce, cursos online, etc.',
  },
  {
    id: 'logo',
    title: 'Você possui uma logo para o projeto?',
    type: 'custom',
  },
  {
    id: 'colors',
    title: 'Quais cores principais você gostaria de usar?',
    type: 'custom',
  },
  {
    id: 'features',
    title: 'Quais funcionalidades essenciais você precisa?',
    type: 'checkbox',
    options: [
      { id: 'login', label: 'Sistema de Login' },
      { id: 'scheduling', label: 'Agendamento' },
      { id: 'chat', label: 'Chat/Mensagens' },
      { id: 'ecommerce', label: 'Carrinho de Compras' },
      { id: 'automation', label: 'Automações' },
      { id: 'payments', label: 'Pagamentos' },
      { id: 'reports', label: 'Relatórios' },
      { id: 'notifications', label: 'Notificações' },
    ],
  },
  {
    id: 'aiIntegration',
    title: 'Você gostaria que o aplicativo tivesse integração com IA?',
    type: 'radio',
    options: [
      { id: 'yes', label: 'Sim' },
      { id: 'no', label: 'Não' },
    ],
  },
  {
    id: 'messageAutomation',
    title: 'Deseja suporte a automação de mensagens?',
    type: 'radio',
    options: [
      { id: 'whatsapp', label: 'WhatsApp' },
      { id: 'email', label: 'E-mail' },
      { id: 'telegram', label: 'Telegram' },
      { id: 'all', label: 'Todos os acima' },
      { id: 'none', label: 'Nenhum' },
    ],
  },
  {
    id: 'targetAudience',
    title: 'Qual é o público-alvo principal?',
    type: 'input',
    placeholder: 'Ex: clientes finais, empresas, crianças, médicos, professores',
  },
  {
    id: 'adminPanel',
    title: 'Deseja incluir painel administrativo?',
    type: 'radio',
    options: [
      { id: 'yes', label: 'Sim' },
      { id: 'no', label: 'Não' },
    ],
  },
  {
    id: 'platform',
    title: 'Deseja que o software seja web, mobile ou ambos?',
    type: 'radio',
    options: [
      { id: 'web', label: 'Apenas Web' },
      { id: 'mobile', label: 'Apenas Mobile' },
      { id: 'both', label: 'Web e Mobile' },
    ],
  },
  {
    id: 'observations',
    title: 'Observações adicionais do cliente',
    type: 'textarea',
    placeholder:
      'Descreva qualquer informação adicional, requisitos específicos ou observações importantes sobre o projeto...',
  },
];

export function QuestionnaireScreen({ onComplete, onBack }: QuestionnaireScreenProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuestionnaireData>>({
    features: [],
    colorPalette: ['#000000'],
    hasLogo: false,
    logoFile: null,
    projectName: '',
  });

  const handleAnswer = <K extends QuestionId>(
    questionId: K,
    value: K extends keyof QuestionnaireData ? QuestionnaireData[K] : unknown
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      onComplete(answers as QuestionnaireData);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    } else {
      onBack();
    }
  };

  const isAnswered = () => {
    const question = questions[currentQuestion];
    const answer = answers[question.id as keyof QuestionnaireData];

    if (question.id === 'observations') return true;

    if (question.type === 'checkbox') return Array.isArray(answer) && answer.length > 0;

    if (question.id === 'logo') return answers.hasLogo !== undefined;

    if (question.id === 'colors') return (answers.colorPalette ?? []).length > 0;

    return answer && answer.toString().trim() !== '';
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-light flex items-center justify-center p-4 py-20 mt-16">
      <div className="flex flex-col justify-center w-full max-w-lg">
        <Card className="max-w-lg w-full border border-purple-300/20 bg-white/95 backdrop-blur-sm shadow-[0_0_25px_rgba(168,85,247,0.35)] rounded-xl">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="text-2xl font-bold text-foreground">
                Pergunta {currentQuestion + 1} de {questions.length}
              </CardTitle>
              <div className="text-sm text-muted-foreground">{Math.round(progress)}%</div>
            </div>
            <Progress value={progress} className="h-2" />
          </CardHeader>

          <CardContent className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground mb-6">{question.title}</h3>

            <div className="space-y-4">
              {/* INPUT */}
              {question.type === 'input' && (
                <Input
                  placeholder={question.placeholder}
                  value={(answers[question.id as keyof QuestionnaireData] as string) || ''}
                  onChange={(e) => handleAnswer(question.id, e.target.value)}
                  className="text-base"
                />
              )}

              {/* TEXTAREA */}
              {question.type === 'textarea' && (
                <Textarea
                  placeholder={question.placeholder}
                  value={(answers[question.id as keyof QuestionnaireData] as string) || ''}
                  onChange={(e) => handleAnswer(question.id, e.target.value)}
                  className="text-base min-h-[120px]"
                  rows={6}
                />
              )}

              {/* RADIO */}
              {question.type === 'radio' && question.options && (
                <RadioGroup
                  value={(answers[question.id as keyof QuestionnaireData] as string) || ''}
                  onValueChange={(value) => handleAnswer(question.id, value)}
                >
                  {question.options.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.id} id={option.id} />
                      <Label htmlFor={option.id} className="text-base cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {/* CHECKBOX */}
              {question.type === 'checkbox' && question.options && (
                <div className="space-y-3">
                  {question.options.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={option.id}
                        checked={(answers.features || []).includes(option.id)}
                        onCheckedChange={(checked) => {
                          const currentFeatures = answers.features || [];
                          if (checked) handleAnswer('features', [...currentFeatures, option.id]);
                          else
                            handleAnswer(
                              'features',
                              currentFeatures.filter((f) => f !== option.id)
                            );
                        }}
                      />
                      <Label htmlFor={option.id} className="text-base cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              )}

 {/* LOGO */}
{question.id === 'logo' && (
  <div className="space-y-4">
    {/* Checkbox de "Tenho uma logo" */}
    <div className="flex items-center space-x-2">
      <Checkbox
        id="hasLogo"
        checked={Boolean(answers.hasLogo)}
        onCheckedChange={(checked) => {
          handleAnswer('hasLogo', checked === true);
          if (!checked) handleAnswer('logoFile', null);
        }}
      />
      <Label htmlFor="hasLogo" className="text-base cursor-pointer">
        Tenho uma logo
      </Label>
    </div>

    {/* Campo de upload e miniatura */}
    {answers.hasLogo && (
      <div className="flex flex-col space-y-2">
        <label
          htmlFor="logoUpload"
          className="inline-block px-4 py-2 text-sm font-medium rounded-md cursor-pointer border border-gray-300 bg-white hover:bg-gray-100 transition-colors"
        >
          Escolher arquivo
        </label>
        <input
          id="logoUpload"
          type="file"
          accept="image/png, image/jpeg, image/svg+xml"
          onChange={(e) => handleAnswer('logoFile', e.target.files?.[0] ?? null)}
          className="hidden"
        />

        {/* Miniatura */}
        {answers.logoFile && (
          <div className="mt-2">
            <p className="text-xs text-muted-foreground mb-1">Pré-visualização:</p>
            <img
              src={URL.createObjectURL(answers.logoFile)}
              alt="Logo selecionada"
              className="w-20 h-20 object-contain border rounded-md"
            />
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          Formatos permitidos: PNG, JPG, SVG. Recomendado 512x512px. Máx. 2MB.
        </p>
      </div>
    )}

    {/* Checkbox de "Não tenho logo" */}
    <div className="flex items-center space-x-2">
      <Checkbox
        id="noLogo"
        checked={!answers.hasLogo}
        onCheckedChange={(checked) => {
          if (checked) {
            handleAnswer('hasLogo', false);
            handleAnswer('logoFile', null);
          }
        }}
      />
      <Label htmlFor="noLogo" className="text-base cursor-pointer">
        Não tenho logo
      </Label>
    </div>
  </div>
)}


{/* COLORS */}
{question.id === 'colors' && (
  <div className="space-y-6">
    {(answers.colorPalette ?? ['#000000']).map((color, index) => (
      <div key={index} className="space-y-4">

        {/* Parte de cima: Color Picker e cor ampliada */}
        <div className="flex items-center space-x-4">
          <HexColorPicker
            color={color}
            onChange={(newColor) => {
              const updated = [...(answers.colorPalette ?? [])];
              updated[index] = newColor;
              handleAnswer('colorPalette', updated);
            }}
          />
          <div
            className="w-36 h-36 rounded-lg border border-gray-300 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            style={{
              backgroundColor: isValidHex(color) ? color : '#fff',
            }}
          />
        </div>

        {/* Parte de baixo: Hex input + botões */}
        <div className="flex items-center space-x-2">
          <Input
            value={color}
            onChange={(e) => {
              let value = e.target.value;

              // Permite apenas 7 caracteres (# + 6 dígitos)
              if (value.length > 7) {
                value = value.slice(0, 7);
              }

              // Atualiza em tempo real
              const updated = [...(answers.colorPalette ?? [])];
              updated[index] = value;
              handleAnswer('colorPalette', updated);
            }}
            onBlur={(e) => {
              // Valida ao sair do input
              const value = e.target.value;
              const hexRegex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
              if (!hexRegex.test(value)) {
                const updated = [...(answers.colorPalette ?? [])];
                updated[index] = '#000000'; // valor padrão se inválido
                handleAnswer('colorPalette', updated);
              }
            }}
            className="w-24"
            placeholder="#000000"
          />

          {(answers.colorPalette ?? []).length > 1 && (
            <Button
              variant="destructive"
              onClick={() =>
                handleAnswer(
                  'colorPalette',
                  (answers.colorPalette ?? []).filter((_, i) => i !== index)
                )
              }
            >
              Remover
            </Button>
          )}

          {(answers.colorPalette ?? []).length < 4 &&
            index === (answers.colorPalette ?? []).length - 1 && (
              <Button
                onClick={() =>
                  handleAnswer('colorPalette', [
                    ...(answers.colorPalette ?? []),
                    '#000000',
                  ])
                }
              >
                Adicionar cor
              </Button>
            )}
        </div>
      </div>
    ))}
  </div>
)}




            </div>

            <div className="flex justify-between pt-6">
              <Button variant="outline" onClick={handlePrevious} className="flex items-center">
                <ChevronLeft className="w-4 h-4 mr-2" />
                {currentQuestion === 0 ? 'Voltar ao Início' : 'Anterior'}
              </Button>

              <Button
                variant={currentQuestion === questions.length - 1 ? 'hero' : 'default'}
                onClick={handleNext}
                disabled={!isAnswered()}
                className="flex items-center"
              >
                {currentQuestion === questions.length - 1 ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Finalizar
                  </>
                ) : (
                  <>
                    Próxima <ChevronRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
