import { Recipe } from "@/types/recipe";
import { useState } from "react";
import { Plus, Clock, Users, Star, ArrowDown, ArrowUp } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";

interface RecipeGridProps {
  recipes: Recipe[];
  onAddRecipe: (recipe: Recipe) => void;
  servings?: number;
  onSortChange: (value: string, ascending: boolean) => void;
}

export const RecipeGrid = ({ recipes, onAddRecipe, servings = 1, onSortChange }: RecipeGridProps) => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [sortBy, setSortBy] = useState<string>("popular");
  const [isAscending, setIsAscending] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const handleSortChange = (value: string) => {
    setSortBy(value);
    onSortChange(value, isAscending);
  };

  const toggleSortDirection = () => {
    setIsAscending(!isAscending);
    onSortChange(sortBy, !isAscending);
  };

  const adjustAmount = (amount: string) => {
    const numericAmount = parseFloat(amount);
    if (!isNaN(numericAmount)) {
      return (numericAmount * servings).toFixed(1);
    }
    return amount;
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Recipes</h2>
        <div className="flex items-center gap-2">
          <Select
            value={sortBy}
            onValueChange={handleSortChange}
          >
            <SelectTrigger className="w-[130px] h-8 bg-white dark:bg-black text-xs">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="w-[130px] bg-white dark:bg-black">
              <SelectItem value="popular">Popular Now</SelectItem>
              <SelectItem value="rating">Top Rated</SelectItem>
              <SelectItem value="cookTime">Total Time</SelectItem>
              <SelectItem value="servings">Portions</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSortDirection}
            className="h-8 px-2"
          >
            {isAscending ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {recipes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-lg text-gray-500 dark:text-gray-400">No recipes found</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 [&>*]:border-0">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="relative rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-sm transition-transform hover:scale-[1.02] border-0"
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
              <div className="p-1">
                <h3 
                  className="font-medium truncate hover:text-primary dark:text-white cursor-pointer"
                  onClick={() => setSelectedRecipe(recipe)}
                >
                  {recipe.title}
                </h3>
                <div className="flex items-center justify-between text-[10px] text-gray-600 dark:text-gray-400">
                  {recipe.cook_time_minutes && (
                    <div className="flex items-center gap-0.5">
                      <Clock className="w-2.5 h-2.5" />
                      <span>{recipe.cook_time_minutes}m</span>
                    </div>
                  )}
                  {recipe.servings && (
                    <div className="flex items-center gap-0.5">
                      <Users className="w-2.5 h-2.5" />
                      <span>{recipe.servings}</span>
                    </div>
                  )}
                  {recipe.rating && (
                    <div className="flex items-center gap-0.5">
                      <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                      <span>{recipe.rating}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
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