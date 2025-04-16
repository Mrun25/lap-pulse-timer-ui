
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Track } from "@/types";
import ReactCountryFlag from "react-country-flag";

interface TrackCardProps {
  track: Track;
}

export default function TrackCard({ track }: TrackCardProps) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  
  return (
    <motion.div
      className={`relative overflow-hidden bg-secondary/30 dark:bg-secondary/10 rounded-lg border cursor-pointer
        ${hovered ? "border-f1-red shadow-lg" : "border-border"}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      onClick={() => navigate(`/track/${track.id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ReactCountryFlag 
              countryCode={track.countryCode} 
              svg 
              style={{ width: '1.5em', height: '1.5em', borderRadius: '2px' }}
            />
            <h3 className="font-racing font-semibold">{track.name}</h3>
          </div>
          <span className="text-xs text-muted-foreground">{track.date}</span>
        </div>
        
        <div className="relative h-32 flex items-center justify-center">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 210 220"
            className="stroke-f1-black dark:stroke-f1-white"
          >
            <path
              d={track.svgPath}
              fill="transparent"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            {hovered && (
              <motion.circle
                cx="50"
                cy="120"
                r="3"
                fill="rgba(225, 6, 0, 0.8)"
                className="animate-pulse"
                initial={{ 
                  opacity: 0,
                  pathLength: 0, 
                  pathOffset: 0 
                }}
                animate={{ 
                  opacity: 1,
                  pathLength: 1,
                  pathOffset: 1
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              />
            )}
          </svg>
        </div>
        
        <div className="mt-2">
          <p className="text-sm font-semibold">{track.country}</p>
        </div>
      </div>
      
      {hovered && (
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-1 bg-f1-red"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
}
