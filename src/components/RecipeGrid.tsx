import { Recipe } from "@/types/recipe";
import { useState } from "react";
import { Plus } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface RecipeGridProps {
  recipes: Recipe[];
  onAddRecipe: (recipe: Recipe) => void;
}

export const RecipeGrid = ({ recipes, onAddRecipe }: RecipeGridProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {recipes.map((recipe) => (
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
                className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer animate-fade-in"
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
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <h4 className="font-semibold">Ingredients:</h4>
                  <ul className="text-sm space-y-1">
                    {recipe.ingredients.map((ing, idx) => (
                      <li key={idx}>
                        {ing.amount} {ing.item}
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
  );
};