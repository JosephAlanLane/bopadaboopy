import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { cuisineTypes, allergens } from "@/data/recipes";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { Button } from "./ui/button";
import { Filter } from "lucide-react";

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
  const [isOpen, setIsOpen] = useState(false);

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
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm space-y-4 max-w-full overflow-hidden"
    >
      <div className="flex items-center justify-end gap-2 flex-wrap">
        <Select 
          value={maxIngredients.toString()} 
          onValueChange={(value) => setMaxIngredients(Number(value))}
        >
          <SelectTrigger className="w-[180px] h-8 bg-white dark:bg-black">
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
          <SelectTrigger className="w-[100px] h-8 bg-white dark:bg-black">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="w-[100px] bg-white dark:bg-black">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="main">Mains</SelectItem>
            <SelectItem value="side">Sides</SelectItem>
            <SelectItem value="dessert">Sweets</SelectItem>
          </SelectContent>
        </Select>

        <CollapsibleTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-2 h-8 px-3">
            <Filter className="h-3.5 w-3.5" />
            <span className="text-sm">Filters</span>
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 space-y-2 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-gray-100 dark:border-gray-700">
            <h3 className="font-medium text-sm text-gray-600 dark:text-gray-300">Cuisine Types</h3>
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
              {cuisineTypes.map((cuisine) => (
                <div key={cuisine} className="flex items-center space-x-2 min-w-0">
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
                  <label htmlFor={`cuisine-${cuisine}`} className="text-sm truncate">{cuisine}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 space-y-2 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-gray-100 dark:border-gray-700">
            <h3 className="font-medium text-sm text-gray-600 dark:text-gray-300">Allergens</h3>
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
              {allergens.map((allergen) => (
                <div key={allergen} className="flex items-center space-x-2 min-w-0">
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
                  <label htmlFor={`allergen-${allergen}`} className="text-sm truncate">{capitalizeFirstLetter(allergen)}</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Input
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 placeholder:text-gray-400 border-gray-200 focus:border-gray-300 dark:border-gray-700 dark:focus:border-gray-600 transition-colors"
        />
      </CollapsibleContent>
    </Collapsible>
  );
};