
import { motion } from "framer-motion";

interface TimerDisplayProps {
  time: number;
  mode: "timer" | "stopwatch";
}

export default function TimerDisplay({ time, mode }: TimerDisplayProps) {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <motion.div 
      className="text-center mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className={`
          inline-block bg-secondary/50 dark:bg-secondary/20 
          px-8 py-4 rounded-lg border border-border backdrop-blur-sm
          ${mode === "timer" && time < 10 ? "shadow-[0_0_15px_rgba(225,6,0,0.3)]" : ""}
          transition-shadow duration-300
        `}
        animate={{
          scale: mode === "timer" && time < 10 ? [0.98, 1.02, 0.98] : 1
        }}
        transition={{
          duration: 1,
          repeat: mode === "timer" && time < 10 ? Infinity : 0,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      >
        <motion.h2 
          className="text-6xl md:text-7xl lg:text-8xl font-racing font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent"
          animate={{
            color: mode === "timer" && time < 10 ? ["#e10600", "#ff1a1a", "#e10600"] : undefined
          }}
          transition={{
            duration: 1,
            repeat: mode === "timer" && time < 10 ? Infinity : 0,
            repeatType: "reverse"
          }}
        >
          {formatTime(time)}
        </motion.h2>
        <p className="text-sm font-medium text-muted-foreground mt-1 tracking-wider">
          {mode === "timer" ? "COUNTDOWN" : "ELAPSED TIME"}
        </p>
      </motion.div>
    </motion.div>
  );
}
