
import Layout from "@/components/layout/Layout";
import TrackGrid from "@/components/tracks/TrackGrid";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 pt-8 pb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-racing mb-4">
              LAP<span className="text-f1-red">PULSE</span> GP CHRONOS
            </h1>
            <p className="max-w-2xl mx-auto text-muted-foreground">
              Experience the thrill of Formula 1 timing with our interactive track-based timer and stopwatch. 
              Select any circuit from the 2024 F1 calendar below to begin.
            </p>
          </motion.div>
          
          <TrackGrid />
        </div>
      </motion.div>
    </Layout>
  );
}
