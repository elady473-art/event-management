import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface Position {
  x: number;
  y: number;
}

export function MagneticButton() {
  const [mousePos, setMousePos] = useState<Position>({ x: 0, y: 0 });
  const [isNear, setIsNear] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  // Surrounding element positions (relative to button center)
  const elements = [
    { id: 1, baseX: -180, baseY: -120, color: 'bg-blue-500' },
    { id: 2, baseX: 180, baseY: -120, color: 'bg-purple-500' },
    { id: 3, baseX: -200, baseY: 0, color: 'bg-pink-500' },
    { id: 4, baseX: 200, baseY: 0, color: 'bg-cyan-500' },
    { id: 5, baseX: -180, baseY: 120, color: 'bg-indigo-500' },
    { id: 6, baseX: 180, baseY: 120, color: 'bg-violet-500' },
    { id: 7, baseX: 0, baseY: -150, color: 'bg-fuchsia-500' },
    { id: 8, baseX: 0, baseY: 150, color: 'bg-blue-400' },
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current) return;

      const rect = buttonRef.current.getBoundingClientRect();
      const buttonCenterX = rect.left + rect.width / 2;
      const buttonCenterY = rect.top + rect.height / 2;

      // Calculate distance from mouse to button center
      const distance = Math.sqrt(
        Math.pow(e.clientX - buttonCenterX, 2) + 
        Math.pow(e.clientY - buttonCenterY, 2)
      );

      // Magnetic field radius
      const magneticRadius = 300;
      setIsNear(distance < magneticRadius);

      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const calculateMagneticOffset = (baseX: number, baseY: number) => {
    if (!buttonRef.current || !isNear) return { x: 0, y: 0 };

    const rect = buttonRef.current.getBoundingClientRect();
    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;

    // Element's actual position on screen
    const elementX = buttonCenterX + baseX;
    const elementY = buttonCenterY + baseY;

    // Distance from mouse to element
    const dx = mousePos.x - elementX;
    const dy = mousePos.y - elementY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Magnetic strength (stronger when closer)
    const magneticRadius = 300;
    const strength = Math.max(0, 1 - distance / magneticRadius);
    
    // Pull element toward mouse
    const pullStrength = 80;
    return {
      x: dx * strength * pullStrength / 100,
      y: dy * strength * pullStrength / 100,
    };
  };

  return (
    <div ref={buttonRef} className="relative">
      {/* Surrounding elements */}
      {elements.map((element) => {
        const offset = calculateMagneticOffset(element.baseX, element.baseY);
        return (
          <motion.div
            key={element.id}
            className={`absolute w-6 h-6 rounded-full ${element.color} shadow-lg`}
            style={{
              left: '50%',
              top: '50%',
            }}
            animate={{
              x: element.baseX + offset.x,
              y: element.baseY + offset.y,
            }}
            transition={{
              type: 'spring',
              stiffness: 150,
              damping: 15,
              mass: 0.5,
            }}
          />
        );
      })}

      {/* Central button */}
      <motion.button
        className="relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-2xl flex items-center gap-2 overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: isNear
            ? '0 0 40px rgba(168, 85, 247, 0.6), 0 0 80px rgba(236, 72, 153, 0.4)'
            : '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Sparkles className="w-5 h-5" />
        <span>Magnetic Button</span>
        
        {/* Glow effect when near */}
        {isNear && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-30 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: 'loop',
            }}
          />
        )}
      </motion.button>

      {/* Instruction text */}
      <motion.p
        className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-white/60 text-sm whitespace-nowrap"
        animate={{
          opacity: isNear ? 0 : 1,
        }}
      >
        Move your mouse closer to see the effect
      </motion.p>
    </div>
  );
}
