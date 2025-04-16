
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Timer, StopCircle } from "lucide-react";

interface TimerControlsProps {
  mode: "timer" | "stopwatch";
  setMode: (mode: "timer" | "stopwatch") => void;
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSetTime: (minutes: number, seconds: number) => void;
}

export default function TimerControls({
  mode,
  setMode,
  isRunning,
  onStart,
  onPause,
  onReset,
  onSetTime,
}: TimerControlsProps) {
  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(0);

  const handleSetTime = () => {
    onSetTime(minutes, seconds);
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-secondary/30 dark:bg-secondary/10 rounded-lg p-6 border border-border">
      <div className="flex justify-center space-x-4 mb-6">
        <Button
          variant={mode === "timer" ? "default" : "outline"}
          onClick={() => setMode("timer")}
          className="font-racing"
        >
          <Timer className="w-4 h-4 mr-2" />
          Timer Mode
        </Button>
        <Button
          variant={mode === "stopwatch" ? "default" : "outline"}
          onClick={() => setMode("stopwatch")}
          className="font-racing"
        >
          <StopCircle className="w-4 h-4 mr-2" />
          Stopwatch Mode
        </Button>
      </div>

      {mode === "timer" && !isRunning && (
        <div className="mb-6">
          <div className="flex justify-center space-x-4">
            <div>
              <label htmlFor="minutes" className="block text-sm font-medium mb-1">
                Minutes
              </label>
              <input
                id="minutes"
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value))}
                className="w-24 rounded-md border border-border bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-f1-red"
              />
            </div>
            <div>
              <label htmlFor="seconds" className="block text-sm font-medium mb-1">
                Seconds
              </label>
              <input
                id="seconds"
                type="number"
                min="0"
                max="59"
                value={seconds}
                onChange={(e) => setSeconds(Number(e.target.value))}
                className="w-24 rounded-md border border-border bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-f1-red"
              />
            </div>
          </div>
          <Button onClick={handleSetTime} variant="racing" className="mt-4 font-racing">
            Set Time
          </Button>
        </div>
      )}

      <div className="flex justify-center space-x-4">
        {!isRunning ? (
          <Button 
            onClick={onStart} 
            variant="racing" 
            size="xl"
            className="font-racing shadow-[0_0_10px_rgba(225,6,0,0.5)] hover:shadow-[0_0_20px_rgba(225,6,0,0.7)]"
          >
            <Play className="w-5 h-5 mr-2" />
            Start
          </Button>
        ) : (
          <Button 
            onClick={onPause} 
            variant="outline"
            size="xl"
            className="font-racing"
          >
            <Pause className="w-5 h-5 mr-2" />
            Pause
          </Button>
        )}
        <Button 
          onClick={onReset} 
          variant="secondary" 
          size="xl"
          className="font-racing"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Reset
        </Button>
      </div>
    </div>
  );
}
