import { motion } from 'motion/react';

interface DashboardWireframeProps {
  isMobile: boolean;
}

export function DashboardWireframe({ isMobile }: DashboardWireframeProps) {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 min-h-[800px]">
      {/* Header/Navigation */}
      <motion.div
        className="bg-white border-b-2 border-gray-200 px-6 py-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl" />
            <div className="h-6 bg-gray-800 rounded w-32" />
          </div>
          <div className="flex items-center gap-3">
            {!isMobile && (
              <>
                <div className="w-8 h-8 bg-gray-200 rounded-lg" />
                <div className="w-8 h-8 bg-gray-200 rounded-lg" />
              </>
            )}
            <div className="w-10 h-10 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full" />
          </div>
        </div>
      </motion.div>

      <div className={`${isMobile ? 'p-4' : 'p-8'}`}>
        {/* Page Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="h-8 bg-gray-800 rounded-lg w-48 mb-2" />
              <div className="h-4 bg-gray-400 rounded w-64" />
            </div>
            {!isMobile && (
              <div className="h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl w-40 shadow-lg" />
            )}
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-4 mb-8`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {[
            'from-blue-400 to-cyan-400',
            'from-purple-400 to-pink-400',
            'from-green-400 to-emerald-400',
            'from-orange-400 to-red-400',
          ].map((gradient, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="h-3 bg-gray-500 rounded w-20" />
                <div className={`w-10 h-10 bg-gradient-to-br ${gradient} rounded-xl`} />
              </div>
              <div className="h-8 bg-gray-800 rounded-lg w-16" />
            </motion.div>
          ))}
        </motion.div>

        {/* Filter/Search Bar */}
        <motion.div
          className={`bg-white rounded-2xl p-4 shadow-lg border-2 border-gray-200 mb-6 ${isMobile ? '' : 'flex items-center justify-between'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className={`flex items-center gap-4 ${isMobile ? 'mb-4' : 'flex-1'}`}>
            <div className={`h-10 bg-gray-100 border-2 border-gray-200 rounded-xl ${isMobile ? 'flex-1' : 'w-64'} flex items-center px-3 gap-2`}>
              <div className="w-5 h-5 bg-purple-300 rounded" />
              <div className="h-3 bg-gray-400 rounded w-32" />
            </div>
            {!isMobile && (
              <>
                <div className="h-10 bg-gray-100 border-2 border-gray-200 rounded-xl w-40 flex items-center justify-between px-3">
                  <div className="h-3 bg-gray-400 rounded w-20" />
                  <div className="w-4 h-4 bg-purple-300 rounded" />
                </div>
                <div className="h-10 bg-gray-100 border-2 border-gray-200 rounded-xl w-32 flex items-center justify-between px-3">
                  <div className="h-3 bg-gray-400 rounded w-16" />
                  <div className="w-4 h-4 bg-purple-300 rounded" />
                </div>
              </>
            )}
          </div>
          <div className="flex gap-2">
            <div className="w-10 h-10 bg-gray-200 rounded-xl" />
            <div className="w-10 h-10 bg-gray-200 rounded-xl" />
          </div>
        </motion.div>

        {/* Events Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="h-6 bg-gray-700 rounded w-32" />
            <div className="h-4 bg-purple-400 rounded-full w-12 px-3" />
          </div>

          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-6`}>
            {[1, 2, 3, 4, 5, 6].slice(0, isMobile ? 3 : 6).map((i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
              >
                {/* Image */}
                <div className="h-40 bg-gradient-to-br from-purple-200 to-pink-200 relative">
                  <div className="absolute top-3 left-3 h-6 bg-purple-500 rounded-full w-20" />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <div className="w-8 h-8 bg-white/80 rounded-lg" />
                    <div className="w-8 h-8 bg-white/80 rounded-lg" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="h-5 bg-gray-800 rounded w-full mb-2" />
                  <div className="h-3 bg-gray-400 rounded w-full mb-1" />
                  <div className="h-3 bg-gray-400 rounded w-3/4 mb-4" />

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-purple-300 rounded" />
                      <div className="h-3 bg-gray-500 rounded w-24" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-purple-300 rounded" />
                      <div className="h-3 bg-gray-500 rounded w-20" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-purple-300 rounded" />
                      <div className="h-3 bg-gray-500 rounded w-32" />
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="h-3 bg-gray-500 rounded w-16" />
                      <div className="h-3 bg-gray-600 rounded w-12" />
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: `${60 + i * 5}%` }} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pagination */}
        {!isMobile && (
          <motion.div
            className="flex items-center justify-center gap-2 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="w-10 h-10 bg-gray-200 rounded-lg" />
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg" />
            <div className="w-10 h-10 bg-gray-200 rounded-lg" />
            <div className="w-10 h-10 bg-gray-200 rounded-lg" />
            <div className="w-10 h-10 bg-gray-200 rounded-lg" />
          </motion.div>
        )}
      </div>
    </div>
  );
}
