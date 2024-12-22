import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { cuisineTypes, allergens } from "@/data/recipes";
import { useToast } from "./ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface Ingredient {
  amount: string;
  unit: string;
  item: string;
}

export const AddRecipeDialog = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [instructions, setInstructions] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [portions, setPortions] = useState("");
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [originatingUrl, setOriginatingUrl] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([{ amount: "", unit: "", item: "" }]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to submit recipes",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('pending_recipes')
        .insert({
          user_id: user.id,
          title,
          image: imageUrl,
          cuisine: selectedCuisines[0], // Primary cuisine
          instructions: instructions.split('\n').filter(line => line.trim() !== ''),
          ingredients: ingredients,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Recipe submitted successfully",
        description: "Your recipe will be reviewed by our team",
      });
      
      setIsOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error submitting recipe:', error);
      toast({
        title: "Error submitting recipe",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setTitle("");
    setImageUrl("");
    setInstructions("");
    setCookTime("");
    setPortions("");
    setSelectedCuisines([]);
    setSelectedAllergens([]);
    setOriginatingUrl("");
    setIngredients([{ amount: "", unit: "", item: "" }]);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { amount: "", unit: "", item: "" }]);
  };

  const updateIngredient = (index: number, field: keyof Ingredient, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setIngredients(newIngredients);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Recipe
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Submit a New Recipe</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL *</Label>
            <Input
              id="imageUrl"
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Ingredients *</Label>
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder="Amount"
                  value={ingredient.amount}
                  onChange={(e) => updateIngredient(index, 'amount', e.target.value)}
                  required
                  className="w-24"
                />
                <Input
                  placeholder="Unit"
                  value={ingredient.unit}
                  onChange={(e) => updateIngredient(index, 'unit', e.target.value)}
                  required
                  className="w-24"
                />
                <Input
                  placeholder="Ingredient"
                  value={ingredient.item}
                  onChange={(e) => updateIngredient(index, 'item', e.target.value)}
                  required
                  className="flex-1"
                />
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addIngredient} className="w-full">
              Add Ingredient
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructions">Instructions *</Label>
            <Textarea
              id="instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              required
              className="min-h-[100px]"
              placeholder="Enter each instruction on a new line"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cookTime">Cook Time (minutes) *</Label>
              <Input
                id="cookTime"
                type="number"
                min="1"
                max="600"
                value={cookTime}
                onChange={(e) => setCookTime(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="portions">Portions *</Label>
              <Input
                id="portions"
                type="number"
                min="1"
                max="24"
                value={portions}
                onChange={(e) => setPortions(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Cuisine Types *</Label>
            <div className="grid grid-cols-2 gap-2">
              {cuisineTypes.map((cuisine) => (
                <div key={cuisine} className="flex items-center space-x-2">
                  <Checkbox
                    id={`cuisine-${cuisine}`}
                    checked={selectedCuisines.includes(cuisine)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedCuisines([...selectedCuisines, cuisine]);
                      } else {
                        setSelectedCuisines(selectedCuisines.filter((c) => c !== cuisine));
                      }
                    }}
                  />
                  <label htmlFor={`cuisine-${cuisine}`} className="text-sm">
                    {cuisine}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Allergens</Label>
            <div className="grid grid-cols-2 gap-2">
              {allergens.map((allergen) => (
                <div key={allergen} className="flex items-center space-x-2">
                  <Checkbox
                    id={`allergen-${allergen}`}
                    checked={selectedAllergens.includes(allergen)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedAllergens([...selectedAllergens, allergen]);
                      } else {
                        setSelectedAllergens(selectedAllergens.filter((a) => a !== allergen));
                      }
                    }}
                  />
                  <label htmlFor={`allergen-${allergen}`} className="text-sm">
                    {allergen}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="originatingUrl">Original Recipe URL (optional)</Label>
            <Input
              id="originatingUrl"
              type="url"
              value={originatingUrl}
              onChange={(e) => setOriginatingUrl(e.target.value)}
              placeholder="https://"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Submit Recipe</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};