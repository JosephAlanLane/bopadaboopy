import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Checkbox } from "../ui/checkbox";

interface GroceryListContentProps {
  groceryItems: { [key: string]: any };
  calculateAmount: (amount: number, recipeId: string | undefined) => number;
  selectedItems: Set<string>;
  onItemToggle: (item: string) => void;
}

export const GroceryListContent = ({ 
  groceryItems, 
  calculateAmount,
  selectedItems,
  onItemToggle
}: GroceryListContentProps) => {
  return (
    <ScrollArea className="h-40 rounded border bg-gray-50 p-4 dark:bg-gray-700 dark:border-gray-600">
      {Object.entries(groceryItems).map(([item, { amount, unit, recipeId }]) => (
        <div key={item} className="flex items-center justify-between py-1 text-sm">
          <div className="flex items-center gap-2">
            <Checkbox 
              id={`checkbox-${item}`}
              checked={selectedItems.has(item)}
              onCheckedChange={() => onItemToggle(item)}
            />
            <label 
              htmlFor={`checkbox-${item}`}
              className="dark:text-gray-200 cursor-pointer"
            >
              {item}
            </label>
          </div>
          <span className="text-gray-600 dark:text-gray-400">
            {calculateAmount(amount, recipeId).toFixed(1)}{unit ? ` ${unit}` : ''}
          </span>
        </div>
      ))}
    </ScrollArea>
  );
};