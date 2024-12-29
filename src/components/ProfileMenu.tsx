import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Settings, CreditCard, Mail, User, LogOut } from "lucide-react";

export const ProfileMenu = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (!user) return null;

  const userInitials = user.email ? user.email[0].toUpperCase() : "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <Avatar className="h-8 w-8 border border-gray-200 dark:border-gray-700">
          <AvatarImage src={user.user_metadata?.avatar_url} />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {userInitials}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("/profile")}>
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/settings")}>
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/subscription")}>
          <CreditCard className="mr-2 h-4 w-4" />
          Subscription
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => window.location.href = 'mailto:support@bopadaboopy.com'}>
          <Mail className="mr-2 h-4 w-4" />
          Contact Support
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="text-red-600 dark:text-red-400">
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};