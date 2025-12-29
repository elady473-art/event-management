import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Monitor, ChevronLeft, ChevronRight, Smartphone } from 'lucide-react';
import { LoginWireframe } from './wireframes/LoginWireframe';
import { EventFormWireframe } from './wireframes/EventFormWireframe';
import { DashboardWireframe } from './wireframes/DashboardWireframe';

type WireframeType = 'login' | 'event-form' | 'dashboard';
type DeviceType = 'desktop' | 'mobile';

export function WireframeViewer() {
  const [currentWireframe, setCurrentWireframe] = useState<WireframeType>('login');
  const [device, setDevice] = useState<DeviceType>('desktop');

  const wireframes: { id: WireframeType; name: string; component: React.ComponentType<{ isMobile: boolean }> }[] = [
    { id: 'login', name: 'Login Page', component: LoginWireframe },
    { id: 'event-form', name: 'Event Submission', component: EventFormWireframe },
    { id: 'dashboard', name: 'Admin Dashboard', component: DashboardWireframe },
  ];

  const currentIndex = wireframes.findIndex(w => w.id === currentWireframe);
  const CurrentComponent = wireframes[currentIndex].component;

  const handlePrevious = () => {
    const newIndex = (currentIndex - 1 + wireframes.length) % wireframes.length;
    setCurrentWireframe(wireframes[newIndex].id);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % wireframes.length;
    setCurrentWireframe(wireframes[newIndex].id);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-white mb-2">Event Management System</h1>
          <p className="text-purple-300">Interactive Wireframes</p>
        </motion.div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
          {/* Wireframe Selector */}
          <div className="flex gap-2 flex-wrap justify-center">
            {wireframes.map((wireframe) => (
              <motion.button
                key={wireframe.id}
                onClick={() => setCurrentWireframe(wireframe.id)}
                className={`px-4 py-2 rounded-xl transition-all ${
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

          {/* Device Toggle */}
          <div className="flex gap-2 bg-white/5 rounded-xl p-1">
            <motion.button
              onClick={() => setDevice('desktop')}
              className={`p-2 rounded-lg transition-all ${
                device === 'desktop'
                  ? 'bg-white/20 text-white'
                  : 'text-white/40 hover:text-white/60'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Monitor className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={() => setDevice('mobile')}
              className={`p-2 rounded-lg transition-all ${
                device === 'mobile'
                  ? 'bg-white/20 text-white'
                  : 'text-white/40 hover:text-white/60'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Smartphone className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Wireframe Display */}
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 z-10">
            <motion.button
              onClick={handlePrevious}
              className="bg-white/10 backdrop-blur-xl p-3 rounded-full text-white border border-white/20 shadow-xl"
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 z-10">
            <motion.button
              onClick={handleNext}
              className="bg-white/10 backdrop-blur-xl p-3 rounded-full text-white border border-white/20 shadow-xl"
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Wireframe Container */}
          <div className="flex justify-center">
            <motion.div
              className={`bg-white rounded-3xl shadow-2xl overflow-hidden ${
                device === 'desktop' ? 'w-full max-w-6xl' : 'w-full max-w-sm'
              }`}
              layout
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentWireframe}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <CurrentComponent isMobile={device === 'mobile'} />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {wireframes.map((wireframe, index) => (
            <motion.div
              key={wireframe.id}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 w-12'
                  : 'bg-white/20 w-2'
              }`}
              layoutId={`indicator-${wireframe.id}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
