import React from "react";
import { Slider } from "../ui/slider";

interface GroceryListHeaderProps {
  globalServings: number;
  setGlobalServings: (value: number) => void;
}

export const GroceryListHeader = ({ globalServings, setGlobalServings }: GroceryListHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-2">
      <h2 className="font-semibold inline-flex items-center">Grocery List</h2>
      <div className="flex items-center gap-1">
        <span className="text-xs text-gray-500 dark:text-gray-400">Servings:</span>
        <Slider
          value={[globalServings]}
          onValueChange={(value) => setGlobalServings(value[0])}
          min={1}
          max={10}
          step={1}
          className="w-20"
        />
        <span className="text-xs text-gray-500 min-w-[20px] dark:text-gray-400">{globalServings}x</span>
      </div>
    </div>
  );
};