
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { Flag, Clock3 } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full z-10 py-4 px-6 md:px-8">
      <div className="flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-f1-red rounded-md w-8 h-8 flex items-center justify-center">
            <Clock3 className="text-f1-white h-5 w-5" />
          </div>
          <h1 className="text-xl font-bold font-racing tracking-wider">
            LAP<span className="text-f1-red">PULSE</span>
          </h1>
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
