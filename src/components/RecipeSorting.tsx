import { ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface RecipeSortingProps {
  sortBy: string;
  isAscending: boolean;
  onSortChange: (value: string) => void;
  onDirectionChange: () => void;
}

export const RecipeSorting = ({ 
  sortBy, 
  isAscending, 
  onSortChange, 
  onDirectionChange 
}: RecipeSortingProps) => {
  return (
    <div className="flex items-center gap-2">
      <Select
        value={sortBy}
        onValueChange={onSortChange}
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
        onClick={onDirectionChange}
        className="h-8 px-2"
      >
        {!isAscending ? (
          <ArrowUp className="h-4 w-4" />
        ) : (
          <ArrowDown className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};