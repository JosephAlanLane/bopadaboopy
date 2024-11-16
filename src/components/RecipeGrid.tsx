import { Recipe } from "@/types/recipe";
import { useState } from "react";
import { Plus } from "lucide-react";

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
          <div className="p-2 bg-white">
            <h3 className="font-medium truncate">{recipe.title}</h3>
            <p className="text-sm text-gray-500">{recipe.cuisine}</p>
          </div>
        </div>
      ))}
    </div>
  );
};