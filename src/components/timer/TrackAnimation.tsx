
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Track } from "@/types";

interface TrackAnimationProps {
  track: Track;
  isRunning: boolean;
  progress: number; // 0 to 1
  mode: "timer" | "stopwatch";
}

export default function TrackAnimation({
  track,
  isRunning,
  progress,
  mode,
}: TrackAnimationProps) {
  const pathRef = useRef<SVGPathElement>(null);
  
  return (
    <div className="w-full max-w-4xl mx-auto h-[40vh] md:h-[50vh] relative">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 210 220"
        className="stroke-f1-black dark:stroke-f1-white"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          ref={pathRef}
          d={track.svgPath}
          fill="transparent"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        <motion.path
          d={track.svgPath}
          fill="transparent"
          stroke="#e10600"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1,3"
          initial={{ pathLength: 0, opacity: 0.5 }}
          animate={{ 
            pathLength: isRunning ? 1 : 0,
            opacity: isRunning ? 0.7 : 0.3,
          }}
          transition={{
            duration: mode === "timer" ? 60 : 60,
            ease: "linear",
            repeat: mode === "stopwatch" ? Infinity : 0
          }}
        />
        
        <motion.g
          initial={{
            offsetDistance: "0%"
          }}
          animate={{
            offsetDistance: `${progress * 100}%`
          }}
          style={{
            offsetPath: `path("${track.svgPath}")`,
            offsetRotate: "auto"
          }}
          transition={{
            duration: 0.3,
            ease: isRunning ? "linear" : "easeOut"
          }}
        >
          <polygon 
            points="-5,-3 5,-3 0,5" 
            fill="#e10600"
            className="origin-center"
          />
          {isRunning && (
            <circle 
              r="10" 
              fill="rgba(225, 6, 0, 0.2)" 
              className="animate-ping" 
            />
          )}
        </motion.g>
      </svg>
    </div>
  );
}
