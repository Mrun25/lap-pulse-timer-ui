
import { motion } from "framer-motion";

interface F1CarProps {
  isRunning: boolean;
}

export default function F1Car({ isRunning }: F1CarProps) {
  return (
    <g>
      {/* F1 Car SVG - Top-down view */}
      <motion.g
        animate={isRunning ? { scale: [0.9, 1, 0.9] } : {}}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      >
        {/* Main body */}
        <rect x="-6" y="-2" width="12" height="4" rx="1" fill="#e10600" />
        
        {/* Front wing */}
        <rect x="4" y="-3" width="3" height="6" rx="0.5" fill="#333" />
        
        {/* Rear wing */}
        <rect x="-7" y="-3" width="2" height="6" rx="0.5" fill="#333" />
        
        {/* Cockpit */}
        <circle cx="-1" cy="0" r="1.2" fill="#111" />
        
        {/* Wheels */}
        <rect x="2" y="-3" width="1.5" height="1.5" rx="0.5" fill="#111" />
        <rect x="2" y="1.5" width="1.5" height="1.5" rx="0.5" fill="#111" />
        <rect x="-3.5" y="-3" width="1.5" height="1.5" rx="0.5" fill="#111" />
        <rect x="-3.5" y="1.5" width="1.5" height="1.5" rx="0.5" fill="#111" />
      </motion.g>

      {/* Glow effect when running */}
      {isRunning && (
        <motion.circle
          cx="0"
          cy="0"
          r="8"
          fill="rgba(225, 6, 0, 0.15)"
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
            scale: [0.8, 1.1, 0.8]
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
      )}
    </g>
  );
}
