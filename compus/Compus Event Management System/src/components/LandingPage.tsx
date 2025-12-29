import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 to-purple-900/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-white mb-8 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Online Campus Event
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Management System
            </span>
          </motion.h1>

          <motion.p
            className="text-white/90 text-xl mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Streamline your campus events with our comprehensive management platform.
            Create, manage, and track events effortlessly.
          </motion.p>

          <motion.button
            onClick={onGetStarted}
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full overflow-hidden shadow-2xl hover:shadow-blue-500/50 transition-all duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.button>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-20 w-20 h-20 bg-blue-500/20 rounded-full blur-xl"
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"
          animate={{
            y: [0, 20, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </div>
  );
}
