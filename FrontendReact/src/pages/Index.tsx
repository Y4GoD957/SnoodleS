import { useState } from "react";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { QuestionnaireScreen, QuestionnaireData } from "@/components/QuestionnaireScreen";
import { ResultScreen } from "@/components/ResultScreen";
import { LoginScreen } from "@/components/LoginScreen";
import { SignupScreen } from "@/components/SignupScreen";
import { Dashboard } from "@/components/Dashboard";
import { Header } from "@/components/Header";

import { useToast } from "@/hooks/use-toast";

type Screen = 'welcome' | 'questionnaire' | 'result' | 'login' | 'signup' | 'dashboard';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [questionnaireData, setQuestionnaireData] = useState<QuestionnaireData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  // === Funções de navegação e fluxo ===
  const handleStart = () => setCurrentScreen('questionnaire');

  const handleQuestionnaireComplete = (data: QuestionnaireData) => {
    setQuestionnaireData(data);
    setCurrentScreen('result');
  };

  const handleBackToWelcome = () => setCurrentScreen('welcome');
  const handleBackToQuestionnaire = () => setCurrentScreen('questionnaire');
  const handleStartOver = () => {
    setQuestionnaireData(null);
    setCurrentScreen('welcome');
  };

  const handleShowLogin = () => setCurrentScreen('login');
  const handleShowSignup = () => setCurrentScreen('signup');
  const handleShowDashboard = () => setCurrentScreen(isAuthenticated ? 'dashboard' : 'login');

  // === Funções de autenticação simulada ===
  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsAuthenticated(true);
    setUser({ email });
    setCurrentScreen('welcome');
    setLoading(false);
    return { error: null };
  };

  const handleSignup = async (name: string, email: string, password: string) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('Signup data:', { name, email, password });
    setIsAuthenticated(true);
    setUser({ email });
    setCurrentScreen('welcome');
    setLoading(false);
    return { error: null };
  };

  const handleLogout = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    setIsAuthenticated(false);
    setUser(null);
    setCurrentScreen('welcome');
    setLoading(false);
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
  };

  const handleGoogleAuth = async (): Promise<{ error: null }> => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('Google authentication triggered');
    setIsAuthenticated(true);
    setUser({ email: 'user@gmail.com' });
    setCurrentScreen('welcome');
    setLoading(false);
    return { error: null };
  };

  const handleGithubAuth = async (): Promise<{ error: null }> => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('GitHub authentication triggered');
    setIsAuthenticated(true);
    setUser({ email: 'user@github.com' });
    setCurrentScreen('welcome');
    setLoading(false);
    return { error: null };
  };

  // === Renderização das telas ===
  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onStart={handleStart} />;
      case 'questionnaire':
        return (
          <QuestionnaireScreen
            onComplete={handleQuestionnaireComplete}
            onBack={handleBackToWelcome}
          />
        );
      case 'result':
        return (
          <ResultScreen
            data={questionnaireData!}
            onBack={handleBackToQuestionnaire}
            onStartOver={handleStartOver}
          />
        );
      case 'login':
        return (
          <LoginScreen
            onLogin={handleLogin}
            onBack={handleBackToWelcome}
            onShowSignup={handleShowSignup}
            onGoogleLogin={handleGoogleAuth}
            onGithubLogin={handleGithubAuth}
          />
        );
      case 'signup':
        return (
          <SignupScreen
            onSignup={handleSignup}
            onBack={() => setCurrentScreen('login')}
            onGoogleSignup={handleGoogleAuth}
            onGithubSignup={handleGithubAuth}
          />
        );
      case 'dashboard':
        return <Dashboard onBack={handleBackToWelcome} />;
      default:
        return <WelcomeScreen onStart={handleStart} />;
    }
  };

  // === Loading global simulado ===
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-light flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {(currentScreen === 'welcome' || currentScreen === 'questionnaire' || currentScreen === 'result') && (
        <Header
          onDashboard={handleShowDashboard}
          onLogin={handleShowLogin}
          onLogout={handleLogout}
          isAuthenticated={isAuthenticated}
        />
      )}
      {renderScreen()}
    </div>
  );
};

export default Index;