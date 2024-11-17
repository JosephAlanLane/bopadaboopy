import { Recipe } from "@/types/recipe";
import { useState } from "react";
import { Plus, Clock, Users, Star } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface RecipeGridProps {
  recipes: Recipe[];
  onAddRecipe: (recipe: Recipe) => void;
  servings?: number;
}

export const RecipeGrid = ({ recipes, onAddRecipe, servings = 1 }: RecipeGridProps) => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [sortBy, setSortBy] = useState<string>("rating");
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const adjustAmount = (amount: string) => {
    const numericAmount = parseFloat(amount);
    if (!isNaN(numericAmount)) {
      return (numericAmount * servings).toFixed(1);
    }
    return amount;
  };

  const sortedRecipes = [...recipes].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "cookTime":
        return (a.cook_time_minutes || 0) - (b.cook_time_minutes || 0);
      case "servings":
        return (b.servings || 0) - (a.servings || 0);
      default:
        return a.title.localeCompare(b.title);
    }
  });

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Recipes</h2>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px] bg-white dark:bg-gray-800">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating">Rating</SelectItem>
            <SelectItem value="title">Name</SelectItem>
            <SelectItem value="cookTime">Cook Time</SelectItem>
            <SelectItem value="servings">Servings</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="relative rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-sm transition-transform hover:scale-[1.02]"
            draggable
          >
            <div className="relative">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full aspect-square object-cover"
              />
              <button
                className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity duration-200"
                onClick={() => onAddRecipe(recipe)}
              >
                <Plus className="w-8 h-8 text-white" />
              </button>
            </div>
            <div className="p-3">
              <h3 
                className="font-medium truncate hover:text-primary dark:text-white cursor-pointer"
                onClick={() => setSelectedRecipe(recipe)}
              >
                {recipe.title}
              </h3>
              <div className="flex items-center justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
                {recipe.cook_time_minutes && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{recipe.cook_time_minutes}m</span>
                  </div>
                )}
                {recipe.servings && (
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{recipe.servings}</span>
                  </div>
                )}
                {recipe.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{recipe.rating}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div ref={ref} className="h-10" />

      <Dialog open={selectedRecipe !== null} onOpenChange={() => setSelectedRecipe(null)}>
        {selectedRecipe && (
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedRecipe.title}</DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[70vh] px-1">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Ingredients</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <li key={index}>
                        {adjustAmount(ingredient.amount)} {ingredient.unit} {ingredient.item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Instructions</h4>
                  <ol className="list-decimal pl-5 space-y-2">
                    {selectedRecipe.instructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </ScrollArea>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};