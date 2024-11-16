import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <nav className="w-full bg-white border-b border-gray-200 px-4 py-2.5 shadow-sm">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-4">
            <img 
              src="/nonna-logo.png"
              alt="Italian Nonna" 
              className="w-16 h-16 object-contain"
            />
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-primary">Babada Boopie</h1>
              <p className="text-sm text-gray-600">Your own personal Nonna</p>
            </div>
          </div>
          <div className="hidden md:flex space-x-4">
            <Button variant="ghost" onClick={() => navigate("/")}>Home</Button>
            <Button variant="ghost" onClick={() => navigate("/about")}>About</Button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <Button variant="ghost" onClick={handleSignOut}>Sign Out</Button>
          ) : (
            <>
              <Button variant="ghost" onClick={() => navigate("/login")}>Sign In</Button>
              <Button onClick={() => navigate("/login")}>Sign Up</Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};