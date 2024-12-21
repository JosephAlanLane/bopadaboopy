import React from "react";
import { ScrollArea } from "../ui/scroll-area";

interface GroceryListContentProps {
  groceryItems: { [key: string]: any };
  calculateAmount: (amount: number, recipeId: string | undefined) => number;
}

export const GroceryListContent = ({ groceryItems, calculateAmount }: GroceryListContentProps) => {
  return (
    <ScrollArea className="h-40 rounded border bg-gray-50 p-4 dark:bg-gray-700 dark:border-gray-600">
      {Object.entries(groceryItems).map(([item, { amount, unit, recipeId }]) => (
        <div key={item} className="flex justify-between py-1 text-sm">
          <span className="dark:text-gray-200">{item}</span>
          <span className="text-gray-600 dark:text-gray-400">
            {calculateAmount(amount, recipeId).toFixed(1)}{unit ? ` ${unit}` : ''}
          </span>
        </div>
      ))}
    </ScrollArea>
  );
};