import { Recipe } from "@/types/recipe";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
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
  const [displayedRecipes, setDisplayedRecipes] = useState<Recipe[]>([]);
  const [page, setPage] = useState(1);
  const recipesPerPage = 8;
  
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (recipes.length > 0) {
      setDisplayedRecipes(recipes.slice(0, recipesPerPage));
      setPage(1);
    }
  }, [recipes.length]);

  useEffect(() => {
    if (inView && displayedRecipes.length < recipes.length) {
      const nextPage = page + 1;
      const start = 0;
      const end = nextPage * recipesPerPage;
      setDisplayedRecipes(recipes.slice(start, end));
      setPage(nextPage);
    }
  }, [inView, recipes, page, displayedRecipes.length]);

  const adjustAmount = (amount: string) => {
    const numericAmount = parseFloat(amount);
    if (!isNaN(numericAmount)) {
      return (numericAmount * servings).toFixed(1);
    }
    return amount;
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayedRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="relative rounded-recipe overflow-hidden bg-white dark:bg-gray-800 shadow-sm transition-transform hover:scale-[1.02]"
          >
            <div
              className="relative"
              onMouseEnter={() => setHoveredId(recipe.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full aspect-square object-cover rounded-t-recipe"
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
            <div className="p-2">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <button className="w-full text-left">
                    <h3 className="font-medium truncate hover:text-primary dark:text-white">
                      {recipe.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{recipe.cuisine}</p>
                  </button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 bg-white dark:bg-gray-800 border shadow-lg">
                  <div className="space-y-2">
                    <h4 className="font-semibold dark:text-white">Ingredients:</h4>
                    <ul className="text-sm space-y-1 dark:text-gray-300">
                      {recipe.ingredients.map((ing, idx) => (
                        <li key={idx}>
                          {adjustAmount(ing.amount)} {ing.unit} {ing.item}
                        </li>
                      ))}
                    </ul>
                    <h4 className="font-semibold dark:text-white">Instructions:</h4>
                    <ol className="text-sm space-y-1 list-decimal list-inside dark:text-gray-300">
                      {recipe.instructions.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
        ))}
      </div>
      <div ref={ref} className="h-10" />
    </>
  );
};