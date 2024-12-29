import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Settings as SettingsIcon, Save } from "lucide-react";
import { Navbar } from "@/components/Navbar";

const Settings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [defaultServings, setDefaultServings] = React.useState(4);
  const [enforceServings, setEnforceServings] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("default_servings, enforce_servings")
          .eq("id", user.id)
          .single();

        if (error) throw error;

        if (data) {
          setDefaultServings(data.default_servings || 4);
          setEnforceServings(data.enforce_servings || false);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
        toast({
          title: "Error",
          description: "Failed to load settings",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [user, navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          default_servings: defaultServings,
          enforce_servings: enforceServings,
        })
        .eq("id", user?.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Settings updated successfully",
      });
    } catch (error) {
      console.error("Error updating settings:", error);
      toast({
        title: "Error",
        description: "Failed to update settings",
        variant: "destructive",
      });
    }
  };

  const handleServingsChange = (value: string) => {
    const num = parseInt(value);
    if (!isNaN(num) && num >= 1 && num <= 24) {
      setDefaultServings(num);
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center items-center min-h-screen">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <div className="container max-w-2xl mx-auto py-8 px-4">
        <div className="flex items-center gap-2 mb-6">
          <SettingsIcon className="w-6 h-6" />
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="defaultServings" className="block text-sm font-medium mb-1">
                Default Number of Servings (1-24)
              </label>
              <Input
                id="defaultServings"
                type="number"
                min="1"
                max="24"
                value={defaultServings}
                onChange={(e) => handleServingsChange(e.target.value)}
                className="w-32"
              />
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="enforceServings" className="text-sm font-medium">
                Enforce Number of Servings for Each Recipe
              </label>
              <Switch
                id="enforceServings"
                checked={enforceServings}
                onCheckedChange={setEnforceServings}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Settings
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;