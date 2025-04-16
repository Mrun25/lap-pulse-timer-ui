
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useThemeToggle } from "@/hooks/use-theme-toggle";

export default function ThemeToggle() {
  const { theme, setTheme } = useThemeToggle();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-full bg-secondary/80 hover:bg-secondary w-10 h-10 flex items-center justify-center"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-f1-white" />
      ) : (
        <Moon className="h-5 w-5 text-f1-black" />
      )}
    </Button>
  );
}
