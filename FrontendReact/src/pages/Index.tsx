import { useState } from "react";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { QuestionnaireScreen, QuestionnaireData } from "@/components/QuestionnaireScreen";
import { ResultScreen } from "@/components/ResultScreen";
import { LoginScreen } from "@/components/LoginScreen";
import { SignupScreen } from "@/components/SignupScreen";
import { Dashboard } from "@/components/Dashboard";
import { Header } from "@/components/Header";

type Screen = 'welcome' | 'questionnaire' | 'result' | 'login' | 'signup' | 'dashboard';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [questionnaireData, setQuestionnaireData] = useState<QuestionnaireData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);

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

  const handleLogin = (email: string, password: string) => {
    // Simula autenticação (em uma aplicação real, seria com Supabase)
    setIsAuthenticated(true);
    setUser({ email });
    setCurrentScreen('welcome');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setCurrentScreen('welcome');
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

  const handleSignup = (name: string, email: string, password: string) => {
    // Aqui você pode integrar com seu backend externo
    console.log('Signup data:', { name, email, password });
    setIsAuthenticated(true);
    setUser({ email });
    setCurrentScreen('welcome');
  };

  const handleGoogleAuth = () => {
    // Aqui você pode integrar com o Google OAuth
    console.log('Google authentication triggered');
  };

  const handleGithubAuth = () => {
    // Aqui você pode integrar com o GitHub OAuth
    console.log('GitHub authentication triggered');
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
        return (
          <Dashboard
            onBack={handleBackToWelcome}
          />
        );
      default:
        return <WelcomeScreen onStart={handleStart} />;
    }
  };

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
