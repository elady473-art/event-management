import { motion } from 'motion/react';

interface EventFormWireframeProps {
  isMobile: boolean;
}

export function EventFormWireframe({ isMobile }: EventFormWireframeProps) {
  return (
    <div className={`bg-gradient-to-br from-purple-50 to-pink-50 ${isMobile ? 'p-4' : 'p-12'} min-h-[700px]`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="h-8 bg-gray-800 rounded-lg w-48" />
            <div className="w-8 h-8 bg-gray-300 rounded-lg" />
          </div>
          <div className="h-4 bg-gray-400 rounded w-64" />
        </motion.div>

        {/* Form Card */}
        <motion.div
          className="bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-200"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Image Upload Section */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="h-4 bg-gray-700 rounded w-32 mb-3" />
            <div className="h-48 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl border-2 border-dashed border-purple-300 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-300 rounded-full mx-auto mb-3" />
                <div className="h-4 bg-gray-600 rounded w-32 mx-auto mb-2" />
                <div className="h-3 bg-gray-400 rounded w-40 mx-auto" />
              </div>
            </div>
          </motion.div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Event Title */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="h-4 bg-gray-700 rounded w-24 mb-3" />
              <div className="h-12 bg-gray-100 border-2 border-gray-200 rounded-xl" />
            </motion.div>

            {/* Event Description */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 }}
            >
              <div className="h-4 bg-gray-700 rounded w-32 mb-3" />
              <div className="h-32 bg-gray-100 border-2 border-gray-200 rounded-xl" />
            </motion.div>

            {/* Date & Time */}
            <motion.div
              className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div>
                <div className="h-4 bg-gray-700 rounded w-20 mb-3" />
                <div className="h-12 bg-gray-100 border-2 border-gray-200 rounded-xl flex items-center justify-between px-4">
                  <div className="h-4 bg-gray-400 rounded w-24" />
                  <div className="w-5 h-5 bg-purple-300 rounded" />
                </div>
              </div>
              <div>
                <div className="h-4 bg-gray-700 rounded w-16 mb-3" />
                <div className="h-12 bg-gray-100 border-2 border-gray-200 rounded-xl flex items-center justify-between px-4">
                  <div className="h-4 bg-gray-400 rounded w-20" />
                  <div className="w-5 h-5 bg-purple-300 rounded" />
                </div>
              </div>
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55 }}
            >
              <div className="h-4 bg-gray-700 rounded w-20 mb-3" />
              <div className="h-12 bg-gray-100 border-2 border-gray-200 rounded-xl flex items-center px-4 gap-3">
                <div className="w-5 h-5 bg-purple-300 rounded" />
                <div className="h-4 bg-gray-400 rounded w-40" />
              </div>
            </motion.div>

            {/* Category & Capacity */}
            <motion.div
              className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div>
                <div className="h-4 bg-gray-700 rounded w-24 mb-3" />
                <div className="h-12 bg-gray-100 border-2 border-gray-200 rounded-xl flex items-center justify-between px-4">
                  <div className="h-4 bg-gray-400 rounded w-28" />
                  <div className="w-4 h-4 bg-purple-300 rounded" />
                </div>
              </div>
              <div>
                <div className="h-4 bg-gray-700 rounded w-32 mb-3" />
                <div className="h-12 bg-gray-100 border-2 border-gray-200 rounded-xl flex items-center px-4">
                  <div className="h-4 bg-gray-400 rounded w-16" />
                </div>
              </div>
            </motion.div>

            {/* Additional Options */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.65 }}
            >
              <div className="h-4 bg-gray-700 rounded w-40 mb-4" />
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-purple-300 rounded border-2 border-purple-400" />
                    <div className="h-3 bg-gray-600 rounded w-32" />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className={`flex ${isMobile ? 'flex-col' : 'gap-4'} pt-6 border-t-2 border-gray-200`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className={`${isMobile ? 'mb-3' : 'flex-1'} h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg`} />
              <div className={`${isMobile ? '' : 'w-32'} h-12 bg-gray-200 border-2 border-gray-300 rounded-xl`} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
