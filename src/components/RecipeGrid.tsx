import { Recipe } from "@/types/recipe";
import { useState } from "react";
import { Plus, Clock, Users, Star } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useInView } from "react-intersection-observer";

interface RecipeGridProps {
  recipes: Recipe[];
  onAddRecipe: (recipe: Recipe) => void;
  servings?: number;
}

export const RecipeGrid = ({ recipes, onAddRecipe, servings = 1 }: RecipeGridProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [displayedRecipes, setDisplayedRecipes] = useState<Recipe[]>(recipes);
  const [page, setPage] = useState(1);
  
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

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayedRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="relative rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-sm transition-transform hover:scale-[1.02]"
          >
            <div
              className="relative"
              onMouseEnter={() => setHoveredId(recipe.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full aspect-square object-cover"
              />
              {hoveredId === recipe.id && (
                <div
                  className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer transition-opacity duration-200"
                  onClick={() => onAddRecipe(recipe)}
                >
                  <Plus className="w-8 h-8 text-white" />
                </div>
              )}
            </div>
            <div className="p-3">
              <h3 className="font-medium truncate hover:text-primary dark:text-white">
                {recipe.title}
              </h3>
              <div className="flex items-center justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{recipe.cook_time_minutes}m</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{recipe.servings}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{recipe.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div ref={ref} className="h-10" />
    </>
  );
};