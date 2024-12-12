import { useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { MealPlan, Recipe } from "@/types/recipe";
import { Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";

interface SaveMealPlanButtonProps {
  mealPlan: MealPlan;
  customMeals?: (Recipe | null)[];
  activeTab?: "weekly" | "custom";
}

export const SaveMealPlanButton = ({ 
  mealPlan, 
  customMeals = [], 
  activeTab = "weekly" 
}: SaveMealPlanButtonProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [title, setTitle] = useState("My Weekly Meal Plan");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setIsSaving(true);
    try {
      let recipes;
      
      if (activeTab === "weekly") {
        recipes = Object.values(mealPlan)
          .filter(recipe => recipe !== null)
          .map(recipe => ({
            id: recipe!.id,
            title: recipe!.title,
            image: recipe!.image,
            recipeUrl: recipe!.recipeUrl,
            ingredients: recipe!.ingredients,
            instructions: recipe!.instructions,
            cuisine: recipe!.cuisine,
            allergens: recipe!.allergens,
            cook_time_minutes: recipe!.cook_time_minutes || null,
            servings: recipe!.servings || null,
            rating: recipe!.rating || null,
            category: recipe!.category || null
          }));
      } else {
        recipes = customMeals
          .filter((recipe): recipe is Recipe => recipe !== null)
          .map(recipe => ({
            id: recipe.id,
            title: recipe.title,
            image: recipe.image,
            recipeUrl: recipe.recipeUrl,
            ingredients: recipe.ingredients,
            instructions: recipe.instructions,
            cuisine: recipe.cuisine,
            allergens: recipe.allergens,
            cook_time_minutes: recipe.cook_time_minutes || null,
            servings: recipe.servings || null,
            rating: recipe.rating || null,
            category: recipe.category || null
          }));
      }

      console.log('Saving meal plan with recipes:', recipes);

      const { error } = await supabase
        .from('saved_meal_plans')
        .insert({
          user_id: user.id,
          title: title,
          description: description,
          recipes: recipes,
          is_public: isPublic
        });

      if (error) throw error;

      setShowDialog(false);
      toast({
        title: "Meal plan saved!",
        description: "You can find it in your saved meal plans",
      });
    } catch (error) {
      console.error('Error saving meal plan:', error);
      toast({
        title: "Error saving meal plan",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowDialog(true)}
        disabled={isSaving}
        className="h-8 px-2"
      >
        <Save className="w-4 h-4" />
      </Button>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Meal Plan</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Meal Plan Name</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a name for your meal plan"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your meal plan"
                className="h-20"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="public">Share with others</Label>
              <Switch
                id="public"
                checked={isPublic}
                onCheckedChange={setIsPublic}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};