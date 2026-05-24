import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full flex justify-between items-center p-6">
        <h1 className="text-3xl font-bold text-cyan-400">
          Nexus AI
        </h1>

        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 transition"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-5 py-2 rounded-lg border border-cyan-500 hover:bg-cyan-500 transition"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="grid md:grid-cols-2 gap-10 items-center max-w-6xl w-full">
        
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Welcome to <span className="text-cyan-400">Nexus AI</span>
          </h1>

          <p className="mt-6 text-lg text-gray-300 leading-relaxed">
            Your intelligent AI assistant powered by modern technology.
            Chat smarter, faster, and more efficiently with advanced AI.
          </p>

          <div className="mt-8 flex gap-5">
            <Link
              to="/signup"
              className="px-8 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 transition text-lg font-semibold"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="px-8 py-3 rounded-xl border border-gray-500 hover:border-cyan-400 hover:text-cyan-400 transition text-lg"
            >
              Login
            </Link>
          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex justify-center"
        >
          <img
            src="/images/ai-robot.jpg"
            alt="AI Robot"
            className="w-[400px] drop-shadow-[0_0_25px_rgba(34,211,238,0.7)]"
          />
        </motion.div>
      </div>
    </div>
  );
}