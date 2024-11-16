import { useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { cuisineTypes, allergens } from "@/data/recipes";

interface FiltersProps {
  onApplyFilters: (filters: {
    search: string;
    cuisines: string[];
    allergens: string[];
  }) => void;
}

export const RecipeFilters = ({ onApplyFilters }: FiltersProps) => {
  const [search, setSearch] = useState("");
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);

  const handleApply = () => {
    onApplyFilters({
      search,
      cuisines: selectedCuisines,
      allergens: selectedAllergens,
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
      <div className="flex gap-4">
        <Input
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleApply}>Apply Filters</Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-medium mb-2">Cuisine Types</h3>
          <div className="space-y-2">
            {cuisineTypes.map((cuisine) => (
              <div key={cuisine} className="flex items-center space-x-2">
                <Checkbox
                  id={`cuisine-${cuisine}`}
                  checked={selectedCuisines.includes(cuisine)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedCuisines([...selectedCuisines, cuisine]);
                    } else {
                      setSelectedCuisines(
                        selectedCuisines.filter((c) => c !== cuisine)
                      );
                    }
                  }}
                />
                <label
                  htmlFor={`cuisine-${cuisine}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {cuisine}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Allergens</h3>
          <div className="space-y-2">
            {allergens.map((allergen) => (
              <div key={allergen} className="flex items-center space-x-2">
                <Checkbox
                  id={`allergen-${allergen}`}
                  checked={selectedAllergens.includes(allergen)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedAllergens([...selectedAllergens, allergen]);
                    } else {
                      setSelectedAllergens(
                        selectedAllergens.filter((a) => a !== allergen)
                      );
                    }
                  }}
                />
                <label
                  htmlFor={`allergen-${allergen}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {allergen}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};