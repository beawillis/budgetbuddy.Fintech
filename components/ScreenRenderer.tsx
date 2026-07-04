'use client'

import { useApp } from '@/lib/AppContext'
import { Home, ReceiptText, Target, TrendingUp, User, Plus, X } from 'lucide-react'
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
import TransactionsScreen from './screens/TransactionsScreen'
import ProfileScreen from './screens/ProfileScreen'
import EditProfileScreen from './screens/EditProfileScreen'
import ChangePasswordScreen from './screens/ChangePasswordScreen'
import BiometricLoginScreen from './screens/BiometricLoginScreen'
import TwoStepVerificationScreen from './screens/TwoStepVerificationScreen'
import NotificationsScreen from './screens/NotificationsScreen'
import SaveMoreScreen from './screens/SaveMoreScreen'
import DepositScreen from './screens/DepositScreen'
import ReviewDepositScreen from './screens/ReviewDepositScreen'
import DepositSuccessScreen from './screens/DepositSuccessScreen'
import SavingsScreen from './screens/SavingsScreen'
import ChallengeScreen from './screens/ChallengeScreen'
import EmergencyScreen from './screens/EmergencyScreen'
import LoansScreen from './screens/LoansScreen'
import InvestmentsScreen from './screens/InvestmentsScreen'
import AssistantScreen from './screens/AssistantScreen'

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
      case 'transactions':
        return <TransactionsScreen />
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
      case 'changePassword':
        return <ChangePasswordScreen />
      case 'biometricLogin':
        return <BiometricLoginScreen />
      case 'twoStepVerification':
        return <TwoStepVerificationScreen />
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
      case 'savings':
        return <SavingsScreen />
      case 'challenge':
        return <ChallengeScreen />
      case 'emergency':
        return <EmergencyScreen />
      case 'loans':
        return <LoansScreen />
      case 'investments':
        return <InvestmentsScreen />
      case 'assistant':
        return <AssistantScreen />
      default:
        return <Dashboard />
    }
  }

  if (isAuthScreen) {
    return renderScreen()
  }

  return (
    <div className="min-h-screen w-full bg-[#f4f6fb] px-0 sm:px-3 lg:px-6">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col lg:py-4">
        <div className="relative flex flex-1 flex-col overflow-hidden bg-[#f4f6fb] lg:rounded-[32px] lg:border lg:border-white/70 lg:shadow-[0_20px_80px_rgba(15,23,42,0.12)]">
          {isModalScreen && (
            <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setScreen('dashboard')} />
          )}

          <main className={`relative flex-1 w-full overflow-y-auto ${isModalScreen ? 'overflow-hidden' : 'pb-24 sm:pb-28'}`}>
            {renderScreen()}
          </main>

          {!isModalScreen && (
            <nav className="sticky bottom-0 z-50 w-full border-t border-white/70 bg-white/90 backdrop-blur-xl lg:rounded-b-[32px]">
              <div className="mx-auto flex h-20 max-w-3xl items-center justify-around px-2 sm:max-w-4xl lg:max-w-none lg:px-6">
                <NavButton icon={Home} label="Home" screen="dashboard" />
                <NavButton icon={Target} label="Goals" screen="goals" />
                <FloatingButton />
                <NavButton icon={ReceiptText} label="Activity" screen="transactions" />
                <NavButton icon={TrendingUp} label="Reports" screen="analytics" />
                <NavButton icon={User} label="Profile" screen="profile" />
              </div>
            </nav>
          )}

          {isModalScreen && (
            <button
              onClick={() => setScreen('dashboard')}
              className="absolute right-4 top-4 z-50 rounded-full bg-white p-2.5 shadow-lg"
            >
              <X size={22} className="text-foreground" />
            </button>
          )}
        </div>
      </div>
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
      className={`flex h-14 flex-1 flex-col items-center justify-center rounded-2xl text-[11px] font-semibold transition-all ${
        isActive ? 'bg-primary text-white shadow-lg shadow-purple-200' : 'text-muted-foreground hover:bg-secondary'
      }`}
    >
      <Icon size={20} />
      <span className="mt-1">{label}</span>
    </button>
  )
}

function FloatingButton() {
  const { setScreen } = useApp()
  return (
    <button
      onClick={() => setScreen('newDeposit')}
      className="flex h-16 w-16 shrink-0 -translate-y-5 flex-col items-center justify-center rounded-full bg-primary text-white shadow-xl shadow-purple-300 transition-transform hover:scale-105"
    >
      <Plus size={28} />
    </button>
  )
}
