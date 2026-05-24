import AnimatedBackground from '../components/ui/AnimatedBackground';
import RegisterForm from '../components/auth/RegisterForm';

/**
 * RegisterPage — Premium futuristic registration page.
 */
export default function RegisterPage() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <AnimatedBackground particleCount={50} />
      <RegisterForm />
    </div>
  );
}
