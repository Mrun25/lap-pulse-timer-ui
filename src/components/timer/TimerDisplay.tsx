
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
      <div className={`
        inline-block bg-secondary/50 dark:bg-secondary/20 px-8 py-4 rounded-lg border border-border
        ${mode === "timer" && time < 10 ? "text-f1-red animate-pulse" : ""}
      `}>
        <h2 className="text-6xl md:text-7xl lg:text-8xl font-racing font-bold">
          {formatTime(time)}
        </h2>
        <p className="text-sm font-medium text-muted-foreground mt-1">
          {mode === "timer" ? "COUNTDOWN" : "ELAPSED TIME"}
        </p>
      </div>
    </motion.div>
  );
}
