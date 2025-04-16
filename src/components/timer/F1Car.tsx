
import { motion } from "framer-motion";

interface F1CarProps {
  isRunning: boolean;
  rotation?: number;
}

export default function F1Car({ isRunning, rotation = 0 }: F1CarProps) {
  return (
    <g style={{ transform: `rotate(${rotation}deg)` }}>
      {/* F1 Car SVG - Top-down view */}
      <motion.g
        animate={isRunning ? { 
          scale: [0.95, 1, 0.95],
          filter: ['drop-shadow(0 0 2px rgba(225,6,0,0.3))', 'drop-shadow(0 0 4px rgba(225,6,0,0.5))', 'drop-shadow(0 0 2px rgba(225,6,0,0.3))']
        } : {}}
        transition={{ 
          duration: 1, 
          repeat: Infinity, 
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      >
        {/* Main body */}
        <rect x="-6" y="-2" width="12" height="4" rx="1" fill="#e10600" />
        
        {/* Front wing */}
        <rect x="4" y="-3" width="3" height="6" rx="0.5" fill="#333" />
        
        {/* Rear wing */}
        <rect x="-7" y="-3" width="2" height="6" rx="0.5" fill="#111" />
        
        {/* Cockpit */}
        <circle cx="-1" cy="0" r="1.2" fill="#111" />
        
        {/* Wheels with shadow effect */}
        <rect x="2" y="-3" width="1.5" height="1.5" rx="0.5" fill="#111" filter="url(#wheel-shadow)" />
        <rect x="2" y="1.5" width="1.5" height="1.5" rx="0.5" fill="#111" filter="url(#wheel-shadow)" />
        <rect x="-3.5" y="-3" width="1.5" height="1.5" rx="0.5" fill="#111" filter="url(#wheel-shadow)" />
        <rect x="-3.5" y="1.5" width="1.5" height="1.5" rx="0.5" fill="#111" filter="url(#wheel-shadow)" />
      </motion.g>

      {/* Enhanced glow effect when running */}
      {isRunning && (
        <motion.circle
          cx="0"
          cy="0"
          r="8"
          fill="url(#carGlow)"
          animate={{ 
            opacity: [0.2, 0.4, 0.2],
            scale: [0.9, 1.1, 0.9],
            filter: ['blur(4px)', 'blur(6px)', 'blur(4px)']
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      )}

      {/* Definitions for effects */}
      <defs>
        <radialGradient id="carGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e10600" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#e10600" stopOpacity="0" />
        </radialGradient>
        <filter id="wheel-shadow">
          <feDropShadow dx="0" dy="1" stdDeviation="0.5" floodOpacity="0.3" />
        </filter>
      </defs>
    </g>
  );
}
