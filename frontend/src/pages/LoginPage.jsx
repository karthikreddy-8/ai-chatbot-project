import AnimatedBackground from '../components/ui/AnimatedBackground';
import LoginForm from '../components/auth/LoginForm';

/**
 * LoginPage — Premium futuristic login page with animated background.
 */
export default function LoginPage() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <AnimatedBackground particleCount={50} />
      <LoginForm />
    </div>
  );
}
