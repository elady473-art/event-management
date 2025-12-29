import { useState } from 'react';
import { motion } from 'motion/react';
import { LogIn, Mail, Lock, Calendar, Sparkles } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate login validation
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (email === 'admin@events.com' && password === 'admin123') {
      onLogin();
    } else {
      setError('Invalid credentials. Try admin@events.com / admin123');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background orbs */}
      <motion.div
        className="absolute w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ top: '10%', left: '10%' }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-pink-500/30 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ bottom: '10%', right: '10%' }}
      />

      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo/Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-2xl"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Calendar className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-white mb-2">Event Management System</h1>
          <p className="text-purple-200">Sign in to manage your events</p>
        </motion.div>

        {/* Login Card */}
        <motion.div
          className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-white/90 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="admin@events.com"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-white/90 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                className="bg-red-500/20 border border-red-500/50 rounded-xl p-3 text-red-200 text-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                {error}
              </motion.div>
            )}

            {/* Login Button */}
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
            >
              {isLoading ? (
                <motion.div
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </>
              )}
            </motion.button>
          </form>

          {/* Demo Credentials */}
          <motion.div
            className="mt-6 pt-6 border-t border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-start gap-2 text-purple-200 text-sm">
              <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white/80">Demo Credentials:</p>
                <p className="text-purple-300">Email: admin@events.com</p>
                <p className="text-purple-300">Password: admin123</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
