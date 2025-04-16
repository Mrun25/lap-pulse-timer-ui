
import { useState } from "react";
import { tracks } from "@/data/tracks";
import TrackCard from "./TrackCard";
import { Button } from "@/components/ui/button";
import { Shuffle } from "lucide-react";

export default function TrackGrid() {
  const [filter, setFilter] = useState("all");
  const [selectedTrack, setSelectedTrack] = useState(null);

  const getFilteredTracks = () => {
    switch(filter) {
      case "europe":
        return tracks.filter(track => 
          ["AT", "BE", "ES", "GB", "HU", "IT", "MC", "NL"].includes(track.countryCode)
        );
      case "asia":
        return tracks.filter(track => 
          ["AE", "AZ", "BH", "CN", "JP", "QA", "SA", "SG"].includes(track.countryCode)
        );
      case "americas":
        return tracks.filter(track => 
          ["BR", "CA", "MX", "US"].includes(track.countryCode)
        );
      case "australia":
        return tracks.filter(track => 
          ["AU"].includes(track.countryCode)
        );
      default:
        return tracks;
    }
  };

  const getRandomTrack = () => {
    const randomIndex = Math.floor(Math.random() * tracks.length);
    return tracks[randomIndex].id;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-2xl font-racing">2024 F1 Grand Prix Calendar</h2>
        
        <div className="flex flex-wrap gap-2">
          <Button 
            onClick={() => setFilter("all")} 
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            className="font-racing"
          >
            All
          </Button>
          <Button 
            onClick={() => setFilter("europe")} 
            variant={filter === "europe" ? "default" : "outline"}
            size="sm"
            className="font-racing"
          >
            Europe
          </Button>
          <Button 
            onClick={() => setFilter("asia")} 
            variant={filter === "asia" ? "default" : "outline"}
            size="sm"
            className="font-racing"
          >
            Asia
          </Button>
          <Button 
            onClick={() => setFilter("americas")} 
            variant={filter === "americas" ? "default" : "outline"}
            size="sm"
            className="font-racing"
          >
            Americas
          </Button>
          <Button
            onClick={() => setFilter("australia")}
            variant={filter === "australia" ? "default" : "outline"}
            size="sm"
            className="font-racing"
          >
            Australia
          </Button>
          <Button 
            onClick={() => window.location.href = `/track/${getRandomTrack()}`}
            variant="racing"
            size="sm"
            className="font-racing"
          >
            <Shuffle className="h-4 w-4 mr-2" />
            Random
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {getFilteredTracks().map((track) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </div>
    </div>
  );
}
