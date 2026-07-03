'use client'

import { useApp } from '@/lib/AppContext'
import { Home, Target, TrendingUp, User, Plus, ChevronLeft, X } from 'lucide-react'
import SplashScreen from './screens/SplashScreen'
import OnboardingScreen from './screens/OnboardingScreen'
import SignInScreen from './screens/SignInScreen'
import SignUpScreen from './screens/SignUpScreen'
import ForgotPasswordScreen from './screens/ForgotPasswordScreen'
import SuccessScreen from './screens/SuccessScreen'
import Dashboard from './screens/Dashboard'
import GoalsScreen from './screens/GoalsScreen'
import CreateGoalScreen from './screens/CreateGoalScreen'
import GoalCreatedScreen from './screens/GoalCreatedScreen'
import AnalyticsScreen from './screens/AnalyticsScreen'
import ProfileScreen from './screens/ProfileScreen'
import EditProfileScreen from './screens/EditProfileScreen'
import NotificationsScreen from './screens/NotificationsScreen'
import SaveMoreScreen from './screens/SaveMoreScreen'
import DepositScreen from './screens/DepositScreen'
import ReviewDepositScreen from './screens/ReviewDepositScreen'
import DepositSuccessScreen from './screens/DepositSuccessScreen'

export default function ScreenRenderer() {
  const { screen, setScreen } = useApp()

  const isAuthScreen = [
    'splash',
    'onboarding1',
    'onboarding2',
    'onboarding3',
    'signin',
    'signup',
    'forgotPassword1',
    'forgotPassword2',
    'forgotPassword3',
    'loginSuccess',
    'accountCreated',
  ].includes(screen)

  const isModalScreen = [
    'createGoal',
    'saveMore',
    'newDeposit',
    'reviewDeposit',
    'notifications',
    'editProfile',
  ].includes(screen)

  const renderScreen = () => {
    switch (screen) {
      case 'splash':
        return <SplashScreen />
      case 'onboarding1':
      case 'onboarding2':
      case 'onboarding3':
        return <OnboardingScreen stepNumber={parseInt(screen.replace('onboarding', ''))} />
      case 'signin':
        return <SignInScreen />
      case 'signup':
        return <SignUpScreen />
      case 'forgotPassword1':
      case 'forgotPassword2':
      case 'forgotPassword3':
        return <ForgotPasswordScreen stepNumber={parseInt(screen.replace('forgotPassword', ''))} />
      case 'loginSuccess':
        return <SuccessScreen type="login" />
      case 'accountCreated':
        return <SuccessScreen type="signup" />
      case 'dashboard':
        return <Dashboard />
      case 'goals':
        return <GoalsScreen />
      case 'createGoal':
        return <CreateGoalScreen />
      case 'goalCreated':
        return <GoalCreatedScreen />
      case 'analytics':
        return <AnalyticsScreen />
      case 'profile':
        return <ProfileScreen />
      case 'editProfile':
        return <EditProfileScreen />
      case 'notifications':
        return <NotificationsScreen />
      case 'saveMore':
        return <SaveMoreScreen />
      case 'newDeposit':
        return <DepositScreen />
      case 'reviewDeposit':
        return <ReviewDepositScreen />
      case 'depositSuccess':
        return <DepositSuccessScreen />
      default:
        return <Dashboard />
    }
  }

  if (isAuthScreen) {
    return renderScreen()
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {isModalScreen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setScreen('dashboard')} />
      )}

      <main className={`flex-1 overflow-y-auto ${isModalScreen ? 'overflow-hidden' : 'pb-20'}`}>
        {renderScreen()}
      </main>

      {!isModalScreen && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50">
          <div className="flex justify-around items-center h-20 max-w-md mx-auto">
            <NavButton icon={Home} label="Home" screen="dashboard" />
            <NavButton icon={Target} label="Goals" screen="goals" />
            <FloatingButton />
            <NavButton icon={TrendingUp} label="Analytics" screen="analytics" />
            <NavButton icon={User} label="Profile" screen="profile" />
          </div>
        </nav>
      )}

      {isModalScreen && (
        <button
          onClick={() => setScreen('dashboard')}
          className="fixed top-6 right-6 z-50 p-2 bg-white rounded-full shadow-lg"
        >
          <X size={24} className="text-foreground" />
        </button>
      )}
    </div>
  )
}

function NavButton({
  icon: Icon,
  label,
  screen,
}: {
  icon: any
  label: string
  screen: string
}) {
  const { screen: currentScreen, setScreen } = useApp()
  const isActive = currentScreen === screen

  return (
    <button
      onClick={() => setScreen(screen as any)}
      className={`flex flex-col items-center justify-center w-16 h-16 rounded-lg transition-colors ${
        isActive
          ? 'bg-primary text-white'
          : 'text-muted-foreground hover:bg-secondary'
      }`}
    >
      <Icon size={24} />
      <span className="text-xs mt-1">{label}</span>
    </button>
  )
}

function FloatingButton() {
  const { setScreen } = useApp()
  return (
    <button
      onClick={() => setScreen('newDeposit')}
      className="flex flex-col items-center justify-center w-16 h-16 rounded-full bg-primary text-white hover:bg-opacity-90 transform -translate-y-6 shadow-lg"
    >
      <Plus size={32} />
    </button>
  )
}
