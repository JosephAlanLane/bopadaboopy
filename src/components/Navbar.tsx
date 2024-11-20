import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <img src="/nonna-logo.png" alt="Nonna Logo" className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              Your own personal Nonna for meal planning. Mangia! Mangia!
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link to="/about" className="transition-colors hover:text-foreground/80 text-foreground">About</Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};