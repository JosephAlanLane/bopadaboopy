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
}

export const RecipeGrid = ({ recipes, onAddRecipe }: RecipeGridProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [displayedRecipes, setDisplayedRecipes] = useState<Recipe[]>([]);
  const [page, setPage] = useState(1);
  const recipesPerPage = 8;
  
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    const start = 0;
    const end = recipesPerPage;
    setDisplayedRecipes(recipes.slice(start, end));
  }, [recipes]);

  useEffect(() => {
    if (inView && displayedRecipes.length < recipes.length) {
      const nextRecipes = recipes.slice(
        0,
        Math.min((page + 1) * recipesPerPage, recipes.length)
      );
      setDisplayedRecipes(nextRecipes);
      setPage(page + 1);
    }
  }, [inView, recipes, page]);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayedRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="relative rounded-lg overflow-hidden"
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
            <div className="p-2 bg-white">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <button className="w-full text-left">
                    <h3 className="font-medium truncate hover:text-primary">
                      {recipe.title}
                    </h3>
                    <p className="text-sm text-gray-500">{recipe.cuisine}</p>
                  </button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 bg-white border shadow-lg">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Ingredients:</h4>
                    <ul className="text-sm space-y-1">
                      {recipe.ingredients.map((ing, idx) => (
                        <li key={idx}>
                          {ing.amount} {ing.unit} {ing.item}
                        </li>
                      ))}
                    </ul>
                    <h4 className="font-semibold">Instructions:</h4>
                    <ol className="text-sm space-y-1 list-decimal list-inside">
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