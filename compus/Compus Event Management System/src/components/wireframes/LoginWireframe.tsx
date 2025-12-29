import { motion } from 'motion/react';

interface LoginWireframeProps {
  isMobile: boolean;
}

export function LoginWireframe({ isMobile }: LoginWireframeProps) {
  return (
    <div className={`bg-gradient-to-br from-indigo-50 to-purple-50 ${isMobile ? 'p-6' : 'p-12'} min-h-[600px] flex items-center justify-center`}>
      <div className={`w-full ${isMobile ? 'max-w-full' : 'max-w-md'}`}>
        {/* Logo/Brand */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl mb-4 shadow-lg">
            <div className="w-8 h-8 border-4 border-white rounded-lg" />
          </div>
          <div className="h-8 bg-gray-800 rounded-lg w-64 mx-auto mb-2" />
          <div className="h-4 bg-gray-400 rounded w-48 mx-auto" />
        </motion.div>

        {/* Login Form */}
        <motion.div
          className="bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-200"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Email Input */}
          <div className="mb-6">
            <div className="h-4 bg-gray-700 rounded w-24 mb-3" />
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 bg-purple-300 rounded" />
              <div className="h-12 bg-gray-100 border-2 border-gray-200 rounded-xl pl-12" />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <div className="h-4 bg-gray-700 rounded w-20 mb-3" />
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 bg-purple-300 rounded" />
              <div className="h-12 bg-gray-100 border-2 border-gray-200 rounded-xl pl-12" />
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className={`flex ${isMobile ? 'flex-col gap-3' : 'justify-between items-center'} mb-6`}>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-300 rounded" />
              <div className="h-3 bg-gray-400 rounded w-24" />
            </div>
            <div className="h-3 bg-purple-400 rounded w-28" />
          </div>

          {/* Login Button */}
          <motion.div
            className="h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl mb-6 shadow-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          />

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-gray-300" />
            <div className="h-3 bg-gray-400 rounded w-12" />
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* Social Login */}
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-3`}>
            <div className="h-12 bg-gray-100 border-2 border-gray-200 rounded-xl flex items-center justify-center gap-2">
              <div className="w-5 h-5 bg-blue-500 rounded-full" />
              <div className="h-3 bg-gray-600 rounded w-20" />
            </div>
            <div className="h-12 bg-gray-100 border-2 border-gray-200 rounded-xl flex items-center justify-center gap-2">
              <div className="w-5 h-5 bg-red-500 rounded-full" />
              <div className="h-3 bg-gray-600 rounded w-20" />
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <div className="h-3 bg-gray-400 rounded w-48 mx-auto mb-2" />
            <div className="h-3 bg-purple-400 rounded w-32 mx-auto" />
          </div>
        </motion.div>

        {/* Footer Info */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-4 h-4 bg-purple-300 rounded" />
            <div className="h-3 bg-gray-500 rounded w-32" />
          </div>
          <div className="h-3 bg-gray-400 rounded w-40 mx-auto" />
        </motion.div>
      </div>
    </div>
  );
}
