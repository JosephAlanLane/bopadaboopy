import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-white border-b border-gray-200 px-4 py-2.5">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center space-x-8">
          <h1 className="text-2xl font-bold text-primary">MealPin</h1>
          <div className="hidden md:flex space-x-4">
            <Button variant="ghost" onClick={() => navigate("/")}>Home</Button>
            <Button variant="ghost" onClick={() => navigate("/about")}>About</Button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost">Sign In</Button>
          <Button>Sign Up</Button>
        </div>
      </div>
    </nav>
  );
};