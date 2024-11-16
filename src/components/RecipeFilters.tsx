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
  }) => void;
}

export const RecipeFilters = ({ onApplyFilters }: FiltersProps) => {
  const [search, setSearch] = useState("");
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [maxIngredients, setMaxIngredients] = useState<number>(20);

  useEffect(() => {
    onApplyFilters({
      search,
      cuisines: selectedCuisines,
      allergens: selectedAllergens,
      maxIngredients,
    });
  }, [search, selectedCuisines, selectedAllergens, maxIngredients, onApplyFilters]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
      <div className="flex gap-4">
        <Input
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />
        <Select 
          value={maxIngredients.toString()} 
          onValueChange={(value) => setMaxIngredients(Number(value))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Max ingredients" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {[5, 10, 15, 20, 25].map((num) => (
              <SelectItem key={num} value={num.toString()}>
                Max {num} ingredients
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2 p-4 bg-[#E8F5E9] rounded-lg border border-white">
          <h3 className="font-medium text-sm text-green-900">Cuisine Types</h3>
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
                <label htmlFor={`cuisine-${cuisine}`} className="text-sm">{cuisine}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2 p-4 bg-red-50 rounded-lg border border-white">
          <h3 className="font-medium text-sm text-red-900">Allergens</h3>
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
                <label htmlFor={`allergen-${allergen}`} className="text-sm">{allergen}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};