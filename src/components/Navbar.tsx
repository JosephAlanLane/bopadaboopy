import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { ThemeToggle } from "./ThemeToggle";
import { Menu } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <nav className="w-full bg-gray-50 dark:bg-gray-800 border-b border-gray-200 px-4 py-2.5 shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto">
        {/* Logo and Title Section */}
        <div className="w-full md:w-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-4">
            <img 
              src="https://raw.githubusercontent.com/JosephAlanLane/meal-planner-portal/main/nonna-logo.png"
              alt="Italian Nonna" 
              className="w-14 h-14 md:w-24 md:h-24 object-contain"
            />
            <div className="flex flex-col">
              <h1 className="website-title text-primary">Bopada Boopy!</h1>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Your own personal Nonna for meal planning. Mangia! Mangia!</p>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Navigation Links and Buttons */}
        <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto mt-4 md:mt-0`}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
            <Button variant="ghost" className="border border-gray-200 dark:border-gray-700 w-full md:w-auto" onClick={() => navigate("/")}>Home</Button>
            <Button variant="ghost" className="border border-gray-200 dark:border-gray-700 w-full md:w-auto" onClick={() => navigate("/about")}>About</Button>
          </div>
          
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
            {user ? (
              <Button variant="ghost" className="border border-gray-200 dark:border-gray-700 w-full md:w-auto" onClick={handleSignOut}>Sign Out</Button>
            ) : (
              <>
                <Button variant="ghost" className="border border-gray-200 dark:border-gray-700 w-full md:w-auto" onClick={() => navigate("/login")}>Sign In</Button>
                <Button className="border border-gray-200 dark:border-gray-700 w-full md:w-auto" onClick={() => navigate("/login")}>Sign Up</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};