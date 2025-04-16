
import { motion } from "framer-motion";

export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-full">
      <motion.div
        className="w-12 h-12 rounded-full border-4 border-f1-red border-t-transparent"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-f1-white dark:bg-f1-black z-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-3xl font-racing mb-8">
          LAP<span className="text-f1-red">PULSE</span>
        </h1>
        <motion.div
          className="w-16 h-16 rounded-full border-4 border-f1-red border-t-transparent mx-auto"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <p className="text-sm mt-4 text-muted-foreground">Loading...</p>
      </motion.div>
    </div>
  );
}
