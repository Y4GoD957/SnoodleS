import { useState, useEffect } from 'react';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { QuestionnaireScreen, QuestionnaireData } from '@/components/QuestionnaireScreen';
import { ResultScreen } from '@/components/ResultScreen';
import { LoginScreen } from '@/components/LoginScreen';
import { SignupScreen } from '@/components/SignupScreen';
import { Dashboard } from '@/components/Dashboard';
import { Header } from '@/components/Header';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

type Screen = 'welcome' | 'questionnaire' | 'result' | 'login' | 'signup' | 'dashboard';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [questionnaireData, setQuestionnaireData] = useState<QuestionnaireData | null>(null);
  const { user, loading, signIn, signUp, signOut, signInWithGoogle, signInWithGithub } = useAuth();
  const { toast } = useToast();

  // Verificar se o usuário está autenticado
  const isAuthenticated = !!user;

  const handleStart = () => {
    setCurrentScreen('questionnaire');
  };

  const handleQuestionnaireComplete = (data: QuestionnaireData) => {
    setQuestionnaireData(data);
    setCurrentScreen('result');
  };

  const handleBackToWelcome = () => {
    setCurrentScreen('welcome');
  };

  const handleBackToQuestionnaire = () => {
    setCurrentScreen('questionnaire');
  };

  const handleStartOver = () => {
    setQuestionnaireData(null);
    setCurrentScreen('welcome');
  };

  const handleLogin = async (email: string, password: string) => {
    const result = await signIn(email, password);
    if (!result.error) {
      setCurrentScreen('welcome');
    }
    return result;
  };

  const handleLogout = async () => {
    const { error } = await signOut();
    if (!error) {
      setCurrentScreen('welcome');
      toast({
        title: 'Logout realizado',
        description: 'Você foi desconectado com sucesso.',
      });
    }
  };

  const handleShowLogin = () => {
    setCurrentScreen('login');
  };

  const handleShowDashboard = () => {
    if (isAuthenticated) {
      setCurrentScreen('dashboard');
    } else {
      setCurrentScreen('login');
    }
  };

  const handleShowSignup = () => {
    setCurrentScreen('signup');
  };

  const handleSignup = async (name: string, email: string, password: string) => {
    const result = await signUp(email, password, name);
    if (!result.error) {
      // Não redirecionar automaticamente - usuário precisa confirmar email
      setCurrentScreen('login');
    }
    return result;
  };

  const handleGoogleAuth = async () => {
    const result = await signInWithGoogle();
    if (!result.error) {
      setCurrentScreen('welcome');
    }
    return result;
  };

  const handleGithubAuth = async () => {
    const result = await signInWithGithub();
    if (!result.error) {
      setCurrentScreen('welcome');
    }
    return result;
  };

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

  // Mostrar loading enquanto verificamos a autenticação
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
      {(currentScreen === 'welcome' ||
        currentScreen === 'questionnaire' ||
        currentScreen === 'result') && (
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
