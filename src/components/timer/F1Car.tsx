
import { motion } from "framer-motion";

interface F1CarProps {
  isRunning: boolean;
  mode: "timer" | "stopwatch";
}

export default function F1Car({ isRunning, mode }: F1CarProps) {
  return (
    <motion.g>
      {/* F1 Car body - using simplified top-down view */}
      <motion.path
        d="M -10,0 L -8,-3 L -5,-4 L 5,-4 L 8,-3 L 10,0 L 8,3 L 5,4 L -5,4 L -8,3 Z"
        fill="#e10600"
        stroke="#000"
        strokeWidth="0.5"
      />
      {/* Wheels */}
      <motion.rect x="-7" y="-5" width="3" height="1.5" fill="#000" />
      <motion.rect x="4" y="-5" width="3" height="1.5" fill="#000" />
      <motion.rect x="-7" y="3.5" width="3" height="1.5" fill="#000" />
      <motion.rect x="4" y="3.5" width="3" height="1.5" fill="#000" />
      
      {/* Animation effects when running */}
      {isRunning && (
        <>
          <circle 
            r="12" 
            fill="rgba(225, 6, 0, 0.15)" 
            className="animate-ping" 
          />
          <circle 
            r="8" 
            fill="rgba(225, 6, 0, 0.25)" 
            className="animate-pulse" 
          />
        </>
      )}
    </motion.g>
  );
}
