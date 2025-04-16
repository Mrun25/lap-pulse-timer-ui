
import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Track } from "@/types";
import F1Car from "./F1Car";

interface TrackAnimationProps {
  track: Track;
  isRunning: boolean;
  progress: number; // 0 to 1
  mode: "timer" | "stopwatch";
  onLapComplete?: () => void;
}

export default function TrackAnimation({
  track,
  isRunning,
  progress,
  mode,
  onLapComplete,
}: TrackAnimationProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const carControls = useAnimation();
  const trailControls = useAnimation();
  const [previousProgress, setPreviousProgress] = useState(0);
  
  // Handle reset animation
  useEffect(() => {
    if (progress === 0 && previousProgress > 0) {
      // Reset animation
      carControls.start({
        offsetDistance: "0%",
        transition: { 
          duration: 0.5,
          ease: "easeInOut"
        }
      });
      
      // Reset trail
      trailControls.start({
        pathLength: 0,
        opacity: 0.3,
        transition: { 
          duration: 0.5,
          ease: "easeInOut"
        }
      });
    }
    
    setPreviousProgress(progress);
  }, [progress, previousProgress, carControls, trailControls]);

  // Handle lap completion
  useEffect(() => {
    if (mode === "stopwatch" && progress === 0 && previousProgress > 0.9 && onLapComplete) {
      onLapComplete();
    }
  }, [progress, previousProgress, mode, onLapComplete]);
  
  return (
    <div className="w-full max-w-4xl mx-auto h-[40vh] md:h-[50vh] relative">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 210 220"
        className="stroke-f1-black dark:stroke-f1-white"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Base track path */}
        <path
          ref={pathRef}
          d={track.svgPath}
          fill="transparent"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Track progress trail */}
        <motion.path
          d={track.svgPath}
          fill="transparent"
          stroke="#e10600"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0.3 }}
          animate={{
            pathLength: isRunning ? progress : previousProgress,
            opacity: isRunning ? 0.8 : 0.3,
          }}
          transition={{
            duration: isRunning ? 0.3 : 0.5,
            ease: "linear"
          }}
        />
        
        {/* Dotted animation line */}
        <motion.path
          d={track.svgPath}
          fill="transparent"
          stroke="#e10600"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1,3"
          initial={{ pathLength: 0, opacity: 0.3 }}
          animate={{ 
            pathLength: isRunning ? 1 : 0,
            opacity: isRunning ? 0.6 : 0,
          }}
          transition={{
            duration: mode === "timer" ? 60 : 60,
            ease: "linear",
            repeat: mode === "stopwatch" ? Infinity : 0
          }}
        />
        
        {/* F1 Car with proper rotation along the path */}
        <motion.g
          initial={{ offsetDistance: "0%" }}
          animate={carControls}
          style={{
            offsetPath: `path("${track.svgPath}")`,
            offsetRotate: "auto"
          }}
          transition={{
            duration: 0.3,
            ease: isRunning ? "linear" : "easeOut"
          }}
        >
          <F1Car isRunning={isRunning} />
        </motion.g>
        
        {/* Update the car position based on progress */}
        <motion.g
          animate={{ offsetDistance: `${progress * 100}%` }}
          style={{
            offsetPath: `path("${track.svgPath}")`,
            offsetRotate: "auto",
            opacity: 0
          }}
        />
      </svg>
    </div>
  );
}
