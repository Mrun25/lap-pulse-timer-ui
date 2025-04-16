
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Track } from "@/types";
import F1Car from "./F1Car";

interface TrackAnimationProps {
  track: Track;
  isRunning: boolean;
  progress: number;
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
        
        {/* Track progress trace */}
        <motion.path
          d={track.svgPath}
          fill="transparent"
          stroke="#e10600"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mix-blend-multiply dark:mix-blend-lighten"
          initial={{ pathLength: 0, opacity: 0.5 }}
          animate={{ 
            pathLength: isRunning ? 1 : 0,
            opacity: isRunning ? 0.8 : 0.4,
          }}
          transition={{
            duration: mode === "timer" ? 60 : 60,
            ease: "linear",
            repeat: mode === "stopwatch" ? Infinity : 0
          }}
        />
        
        {/* F1 Car with motion path */}
        <motion.g
          initial={{
            offsetDistance: "0%",
          }}
          animate={{
            offsetDistance: `${progress * 100}%`,
          }}
          style={{
            offsetPath: `path("${track.svgPath}")`,
            offsetRotate: "auto",
          }}
          transition={{
            duration: 0.3,
            ease: isRunning ? "linear" : [0.32, 0, 0.67, 0],
          }}
        >
          <F1Car 
            isRunning={isRunning}
            mode={mode}
          />
        </motion.g>
      </svg>
    </div>
  );
}
