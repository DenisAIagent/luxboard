import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import PasswordResetForm from './PasswordResetForm';
import TwoFactorSetup from './TwoFactorSetup';
import TwoFactorVerification from './TwoFactorVerification';
import SecurityPreferences from './SecurityPreferences';
import { useAuth } from '../../contexts/AuthContext';

type AuthView = 'login' | 'register' | 'reset-password' | '2fa-setup' | '2fa-verify' | 'security-preferences';

export const AuthContainer: React.FC = () => {
  const [currentView, setCurrentView] = useState<AuthView>('login');
  const [error, setError] = useState<string | null>(null);
  const { } = useAuth();

  const handleLoginSuccess = () => {
    // Rediriger vers la page d'accueil ou le tableau de bord
    window.location.href = '/dashboard';
  };

  const handleLoginError = (error: string) => {
    setError(error);
  };

  const handleRegisterSuccess = () => {
    setCurrentView('2fa-setup');
  };

  const handleRegisterError = (error: string) => {
    setError(error);
  };

  const handlePasswordResetSuccess = () => {
    setCurrentView('login');
  };

  const handlePasswordResetError = (error: string) => {
    setError(error);
  };

  const handleTwoFactorSetupSuccess = () => {
    setCurrentView('login');
  };

  const handleTwoFactorVerificationSuccess = () => {
    handleLoginSuccess();
  };

  const renderAuthForm = () => {
    switch (currentView) {
      case 'login':
        return (
          <LoginForm
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
            onForgotPassword={() => setCurrentView('reset-password')}
            onRegister={() => setCurrentView('register')}
          />
        );
      case 'register':
        return (
          <RegisterForm
            onSuccess={handleRegisterSuccess}
            onError={handleRegisterError}
            onLogin={() => setCurrentView('login')}
          />
        );
      case 'reset-password':
        return (
          <PasswordResetForm
            onSuccess={handlePasswordResetSuccess}
            onError={handlePasswordResetError}
            onBack={() => setCurrentView('login')}
          />
        );
      case '2fa-setup':
        return (
          <TwoFactorSetup
            onSuccess={handleTwoFactorSetupSuccess}
            onCancel={() => setCurrentView('login')}
          />
        );
      case '2fa-verify':
        return (
          <TwoFactorVerification
            onSuccess={handleTwoFactorVerificationSuccess}
            onCancel={() => setCurrentView('login')}
          />
        );
      case 'security-preferences':
        return (
          <SecurityPreferences
            onClose={() => setCurrentView('login')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src="/logo.png"
          alt="Logo"
        />
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        {renderAuthForm()}
      </div>
    </div>
  );
};

export default AuthContainer; 