
import { motion, AnimatePresence } from "framer-motion";
import { Flag } from "lucide-react";
import type { Lap } from "@/types";

interface LapTrackerProps {
  laps: Lap[];
}

export default function LapTracker({ laps }: LapTrackerProps) {
  if (laps.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md mx-auto bg-secondary/30 dark:bg-secondary/10 backdrop-blur-sm rounded-lg p-6 border border-border"
      >
        <div className="text-center text-muted-foreground">
          <motion.div 
            animate={{ 
              opacity: [0.5, 1, 0.5],
              y: [0, -5, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            <Flag className="w-8 h-8 mx-auto mb-3 text-muted-foreground/50" />
          </motion.div>
          <p className="mb-2 font-racing">No laps recorded</p>
          <p className="text-sm">Laps will appear here when recorded</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto bg-secondary/30 dark:bg-secondary/10 backdrop-blur-sm rounded-lg p-6 border border-border max-h-[300px] overflow-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-track-transparent"
    >
      <h3 className="text-lg font-racing mb-4 flex items-center">
        <Flag className="w-4 h-4 mr-2 text-f1-red" />
        Lap History
      </h3>
      <ul className="space-y-2">
        <AnimatePresence mode="popLayout">
          {laps.map((lap, index) => (
            <motion.li
              key={lap.number}
              className="flex justify-between items-center py-2 px-3 rounded-md bg-secondary/20 dark:bg-secondary/10 backdrop-blur-sm border border-border/50"
              initial={{ opacity: 0, x: -20, height: 0 }}
              animate={{ opacity: 1, x: 0, height: "auto" }}
              exit={{ opacity: 0, x: 20, height: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <motion.span 
                className="font-racing"
                initial={{ color: "#e10600" }}
                animate={{ color: "currentColor" }}
                transition={{ duration: 0.5 }}
              >
                Lap {lap.number}
              </motion.span>
              <span className="font-mono text-sm bg-secondary/30 dark:bg-secondary/20 px-2 py-1 rounded">
                {lap.time}
              </span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </motion.div>
  );
}
