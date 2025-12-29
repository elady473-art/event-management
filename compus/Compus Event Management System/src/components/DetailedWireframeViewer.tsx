import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Monitor, Smartphone, Code2, Eye, Info } from 'lucide-react';
import { LoginDetailedWireframe } from './detailed-wireframes/LoginDetailedWireframe';
import { EventFormDetailedWireframe } from './detailed-wireframes/EventFormDetailedWireframe';
import { DashboardDetailedWireframe } from './detailed-wireframes/DashboardDetailedWireframe';

type WireframeType = 'login' | 'event-form' | 'dashboard';
type ViewMode = 'wireframe' | 'code' | 'info';

export function DetailedWireframeViewer() {
  const [currentWireframe, setCurrentWireframe] = useState<WireframeType>('login');
  const [viewMode, setViewMode] = useState<ViewMode>('wireframe');
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');

  const wireframes = [
    { 
      id: 'login' as const, 
      name: 'Login Page', 
      component: LoginDetailedWireframe,
      description: 'User authentication interface with email/password and social login options'
    },
    { 
      id: 'event-form' as const, 
      name: 'Event Submission', 
      component: EventFormDetailedWireframe,
      description: 'Comprehensive form for creating and managing events'
    },
    { 
      id: 'dashboard' as const, 
      name: 'Admin Dashboard', 
      component: DashboardDetailedWireframe,
      description: 'Central hub for managing all events with statistics and quick actions'
    },
  ];

  const currentWireframeData = wireframes.find(w => w.id === currentWireframe);
  const CurrentComponent = currentWireframeData?.component;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.header
        className="bg-white/10 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Logo & Title */}
            <div>
              <h1 className="text-white mb-1">Event Management System</h1>
              <p className="text-purple-300 text-sm">Interactive Wireframes with Details</p>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Wireframe Selector */}
              <div className="flex gap-2 flex-wrap">
                {wireframes.map((wireframe) => (
                  <motion.button
                    key={wireframe.id}
                    onClick={() => setCurrentWireframe(wireframe.id)}
                    className={`px-4 py-2 rounded-xl text-sm transition-all ${
                      currentWireframe === wireframe.id
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                        : 'bg-white/10 text-white/60 hover:bg-white/20'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {wireframe.name}
                  </motion.button>
                ))}
              </div>

              {/* View Mode Toggle */}
              <div className="flex gap-1 bg-white/5 rounded-xl p-1">
                <motion.button
                  onClick={() => setViewMode('wireframe')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'wireframe' ? 'bg-white/20 text-white' : 'text-white/40'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  title="Wireframe View"
                >
                  <Eye className="w-4 h-4" />
                </motion.button>
                <motion.button
                  onClick={() => setViewMode('code')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'code' ? 'bg-white/20 text-white' : 'text-white/40'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  title="Code View"
                >
                  <Code2 className="w-4 h-4" />
                </motion.button>
                <motion.button
                  onClick={() => setViewMode('info')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'info' ? 'bg-white/20 text-white' : 'text-white/40'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  title="Info View"
                >
                  <Info className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Device Toggle */}
              <div className="flex gap-1 bg-white/5 rounded-xl p-1">
                <motion.button
                  onClick={() => setDevice('desktop')}
                  className={`p-2 rounded-lg transition-all ${
                    device === 'desktop' ? 'bg-white/20 text-white' : 'text-white/40'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  title="Desktop View"
                >
                  <Monitor className="w-4 h-4" />
                </motion.button>
                <motion.button
                  onClick={() => setDevice('mobile')}
                  className={`p-2 rounded-lg transition-all ${
                    device === 'mobile' ? 'bg-white/20 text-white' : 'text-white/40'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  title="Mobile View"
                >
                  <Smartphone className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Description */}
        <motion.div
          className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 mb-8 border border-white/20"
          layout
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <Info className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white mb-1">{currentWireframeData?.name}</h2>
              <p className="text-purple-200 text-sm">{currentWireframeData?.description}</p>
            </div>
          </div>
        </motion.div>

        {/* Wireframe Display */}
        <AnimatePresence mode="wait">
          {CurrentComponent && (
            <motion.div
              key={`${currentWireframe}-${viewMode}-${device}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CurrentComponent viewMode={viewMode} isMobile={device === 'mobile'} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
