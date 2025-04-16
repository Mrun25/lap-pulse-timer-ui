
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import Layout from "@/components/layout/Layout";
import TrackAnimation from "@/components/timer/TrackAnimation";
import TimerControls from "@/components/timer/TimerControls";
import TimerDisplay from "@/components/timer/TimerDisplay";
import LapTracker from "@/components/timer/LapTracker";
import { tracks } from "@/data/tracks";
import { ChevronLeft } from "lucide-react";
import ReactCountryFlag from "react-country-flag";

interface Lap {
  number: number;
  time: string;
}

export default function TrackPage() {
  const { trackId } = useParams();
  const track = tracks.find((t) => t.id === trackId);
  
  const [mode, setMode] = useState<"timer" | "stopwatch">("timer");
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(180); // 3 minutes default
  const [progress, setProgress] = useState(0);
  const [laps, setLaps] = useState<Lap[]>([]);
  const [showLapNotification, setShowLapNotification] = useState(false);
  const [currentLap, setCurrentLap] = useState(0);
  
  // Timer/Stopwatch logic
  useEffect(() => {
    let interval: number | undefined;
    
    if (isRunning) {
      interval = window.setInterval(() => {
        if (mode === "timer") {
          setTime((prevTime) => {
            if (prevTime <= 1) {
              setIsRunning(false);
              toast.success("Timer completed!");
              return 0;
            }
            return prevTime - 1;
          });
        } else {
          // Stopwatch mode
          setTime((prevTime) => prevTime + 1);
        }
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, mode]);
  
  // Update progress based on time
  useEffect(() => {
    if (mode === "timer") {
      // For timer, progress is inverse (starts at 0, goes to 1)
      const initialTime = 180; // Default 3 minutes
      setProgress(1 - time / initialTime);
    } else {
      // For stopwatch, progress cycles every minute (0 to 1)
      setProgress((time % 60) / 60);
      
      // Auto-record a lap every full minute
      if (time > 0 && time % 60 === 0 && isRunning) {
        const lapNumber = time / 60;
        recordLap(lapNumber);
      }
    }
  }, [time, mode, isRunning]);
  
  // Function to record a lap
  const recordLap = (lapNumber?: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const lapTime = `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    
    const newLapNumber = lapNumber || currentLap + 1;
    
    setLaps((prevLaps) => [
      ...prevLaps,
      { number: newLapNumber, time: lapTime }
    ]);
    
    setCurrentLap(newLapNumber);
    
    // Show notification
    setShowLapNotification(true);
    setTimeout(() => setShowLapNotification(false), 2000);
    
    toast.success(`Lap ${newLapNumber} recorded: ${lapTime}`);
  };
  
  // Handlers
  const handleStart = () => {
    setIsRunning(true);
  };
  
  const handlePause = () => {
    setIsRunning(false);
  };
  
  const handleReset = () => {
    setIsRunning(false);
    setTime(mode === "timer" ? 180 : 0);
    setProgress(0);
    
    if (mode === "stopwatch") {
      setLaps([]);
      setCurrentLap(0);
    }
  };
  
  const handleSetTime = (minutes: number, seconds: number) => {
    const totalSeconds = minutes * 60 + seconds;
    setTime(totalSeconds);
  };
  
  const handleLap = () => {
    if (mode === "stopwatch" && isRunning) {
      recordLap();
    }
  };
  
  const handleLapComplete = () => {
    if (mode === "stopwatch" && isRunning) {
      // This is triggered by the TrackAnimation component when a lap is completed
      // The lap recording is now handled in the time effect to ensure accuracy
    }
  };
  
  if (!track) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-racing mb-4">Track not found</h2>
          <Link to="/" className="text-f1-red hover:underline">
            Return to track selection
          </Link>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="flex items-center mb-8">
          <Link 
            to="/"
            className="mr-4 p-2 rounded-full hover:bg-secondary/50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          
          <div className="flex items-center gap-3">
            <ReactCountryFlag 
              countryCode={track.countryCode} 
              svg 
              style={{ width: '2em', height: '2em', borderRadius: '3px' }}
            />
            <div>
              <h1 className="text-2xl font-racing">{track.name}</h1>
              <p className="text-sm text-muted-foreground">{track.country} - {track.date}</p>
            </div>
          </div>
        </div>
        
        {/* Lap notification */}
        <AnimatePresence>
          {showLapNotification && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-24 right-8 bg-f1-red text-white px-4 py-2 rounded-md shadow-lg z-50"
            >
              Lap {currentLap} Recorded!
            </motion.div>
          )}
        </AnimatePresence>
        
        <TimerDisplay time={time} mode={mode} />
        
        <TrackAnimation 
          track={track} 
          isRunning={isRunning}
          progress={progress}
          mode={mode}
          onLapComplete={handleLapComplete}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <TimerControls 
            mode={mode}
            setMode={setMode}
            isRunning={isRunning}
            onStart={handleStart}
            onPause={handlePause}
            onReset={handleReset}
            onSetTime={handleSetTime}
            onLap={handleLap}
          />
          
          <LapTracker laps={laps} />
        </div>
      </motion.div>
    </Layout>
  );
}
