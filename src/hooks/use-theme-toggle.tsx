
import { useEffect, useState } from "react";

export function useThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">(
    localStorage.getItem("lapPulse-theme") === "light" ? "light" : "dark"
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("lapPulse-theme", theme);
  }, [theme]);

  return { theme, setTheme };
}
