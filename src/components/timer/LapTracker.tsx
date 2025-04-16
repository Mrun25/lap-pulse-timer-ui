
import { motion } from "framer-motion";
import { Flag } from "lucide-react";

interface Lap {
  number: number;
  time: string;
}

interface LapTrackerProps {
  laps: Lap[];
}

export default function LapTracker({ laps }: LapTrackerProps) {
  if (laps.length === 0) {
    return (
      <div className="w-full max-w-md mx-auto bg-secondary/30 dark:bg-secondary/10 rounded-lg p-6 border border-border">
        <div className="text-center text-muted-foreground">
          <p className="mb-2">No laps recorded</p>
          <p className="text-sm">Laps will appear here when the timer starts.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto bg-secondary/30 dark:bg-secondary/10 rounded-lg p-6 border border-border max-h-[300px] overflow-auto">
      <h3 className="text-lg font-racing mb-4 flex items-center">
        <Flag className="w-4 h-4 mr-2 text-f1-red" />
        Lap History
      </h3>
      <ul className="space-y-2">
        {laps.map((lap, index) => (
          <motion.li
            key={lap.number}
            className="flex justify-between items-center border-b border-border pb-2 last:border-b-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <span className="font-racing">
              Lap {lap.number}
            </span>
            <span className="font-mono">{lap.time}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
