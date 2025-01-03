import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { ThemeToggle } from "./ThemeToggle";
import { Menu } from "lucide-react";
import { useState } from "react";
import { SubscriptionButton } from "./SubscriptionButton";
import { ProfileMenu } from "./ProfileMenu";

// Define logo URLs as constants
const PRIMARY_LOGO_URL = 'https://i.ibb.co/JrR24V4/nonna-logo.png';
const FALLBACK_LOGO_URL = '/nonna-logo.png';

export const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoSrc, setLogoSrc] = useState(PRIMARY_LOGO_URL);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleLogoError = () => {
    console.error('Logo failed to load, using fallback');
    if (logoSrc !== FALLBACK_LOGO_URL) {
      setLogoSrc(FALLBACK_LOGO_URL);
    }
  };

  return (
    <nav className="w-full bg-gray-50 dark:bg-gray-800 border-b border-gray-200 px-4 py-2.5 shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto">
        {/* Mobile Layout */}
        <div className="w-full md:hidden">
          <div className="flex flex-col items-center relative">
            <div className="flex flex-col items-center">
              <img 
                src={logoSrc}
                alt="Italian Nonna" 
                className="w-32 h-32 object-contain mt-2"
                onError={handleLogoError}
                loading="eager"
              />
              <div className="text-center mt-1">
                <h1 className="website-title text-primary">Bopada Boopy!</h1>
                <div className="text-[11px] text-gray-600 dark:text-gray-400">
                  Your meal planning Nonna<br />
                  <span className="italic">"Mangia! Mangia!"</span>
                </div>
              </div>
            </div>
            
            <div className="w-full flex justify-between items-center absolute bottom-0">
              <ThemeToggle />
              <div className="flex items-center gap-2">
                {user && <ProfileMenu />}
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex items-center space-x-2 md:space-x-4">
          <img 
            src={logoSrc}
            alt="Italian Nonna" 
            className="w-28 h-28 object-contain"
            onError={handleLogoError}
            loading="eager"
          />
          <div className="flex flex-col">
            <h1 className="website-title text-primary">Bopada Boopy!</h1>
            <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
              Your meal planning Nonna<br />
              <span className="italic">"Mangia! Mangia!"</span>
            </div>
          </div>
        </div>

        {/* Navigation Links and Buttons */}
        <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto mt-4 md:mt-0`}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
            <Button variant="ghost" className="border border-gray-200 dark:border-gray-700 w-full md:w-auto" onClick={() => navigate("/")}>Home</Button>
            <Button variant="ghost" className="border border-gray-200 dark:border-gray-700 w-full md:w-auto" onClick={() => navigate("/meal-plans")}>Meal Plans</Button>
            <Button variant="ghost" className="border border-gray-200 dark:border-gray-700 w-full md:w-auto" onClick={() => navigate("/about")}>About</Button>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {user && <ProfileMenu />}
          </div>
          
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
            {user ? (
              <>
                <Button variant="ghost" className="border border-gray-200 dark:border-gray-700 w-full md:w-auto md:hidden" onClick={handleSignOut}>Sign Out</Button>
                <SubscriptionButton />
              </>
            ) : (
              <>
                <Button variant="ghost" className="border border-gray-200 dark:border-gray-700 w-full md:w-auto" onClick={() => navigate("/login")}>Sign In</Button>
                <Button className="border border-gray-200 dark:border-gray-700 w-full md:w-auto" onClick={() => navigate("/login")}>Sign Up</Button>
                <Button 
                  className="bg-gradient-to-r from-primary to-secondary text-white w-full md:w-auto hover:from-primary/90 hover:to-secondary/90"
                  onClick={() => navigate("/login")}
                >
                  Join the Family for $1/month!
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};