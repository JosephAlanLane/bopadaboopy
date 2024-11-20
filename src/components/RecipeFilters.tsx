import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { cuisineTypes, allergens } from "@/data/recipes";

interface FiltersProps {
  onApplyFilters: (filters: {
    search: string;
    cuisines: string[];
    allergens: string[];
    maxIngredients: number;
    category?: string;
  }) => void;
}

export const RecipeFilters = ({ onApplyFilters }: FiltersProps) => {
  const [search, setSearch] = useState("");
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [maxIngredients, setMaxIngredients] = useState<number>(20);
  const [category, setCategory] = useState<string>("all");

  useEffect(() => {
    onApplyFilters({
      search,
      cuisines: selectedCuisines,
      allergens: selectedAllergens,
      maxIngredients,
      category: category === "all" ? undefined : category,
    });
  }, [search, selectedCuisines, selectedAllergens, maxIngredients, category, onApplyFilters]);

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm space-y-4">
      <div className="flex gap-4">
        <Input
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 placeholder:text-gray-400"
        />
        <Select 
          value={maxIngredients.toString()} 
          onValueChange={(value) => setMaxIngredients(Number(value))}
        >
          <SelectTrigger className="w-[180px] bg-white dark:bg-black">
            <SelectValue placeholder="Max ingredients" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-black">
            {[5, 10, 15, 20, 25].map((num) => (
              <SelectItem key={num} value={num.toString()}>
                Max {num} ingredients
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={category}
          onValueChange={setCategory}
        >
          <SelectTrigger className="w-[120px] bg-white dark:bg-black">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-black">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="main">Mains</SelectItem>
            <SelectItem value="side">Sides</SelectItem>
            <SelectItem value="dessert">Sweets</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-gray-100 dark:border-gray-700">
          <h3 className="font-medium text-sm text-gray-600 dark:text-gray-300">Cuisine Types</h3>
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
                  className="border-green-400 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                />
                <label htmlFor={`cuisine-${cuisine}`} className="text-sm">{cuisine}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-gray-100 dark:border-gray-700">
          <h3 className="font-medium text-sm text-gray-600 dark:text-gray-300">Allergens</h3>
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
                  className="border-red-400 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                />
                <label htmlFor={`allergen-${allergen}`} className="text-sm">{capitalizeFirstLetter(allergen)}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};