
import { ReactNode } from "react";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-f1-white dark:bg-f1-black text-f1-black dark:text-f1-white transition-colors duration-300">
      <Header />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
