import { Recipe } from "@/types/recipe";
import { pastaRecipes } from "./italian/pasta";
import { saladRecipes } from "./italian/salads";
import { mainRecipes } from "./italian/mains";
import { dessertRecipes } from "./italian/desserts";

export const italianRecipes: Recipe[] = [
  ...pastaRecipes,
  ...saladRecipes,
  ...mainRecipes,
  ...dessertRecipes
];

// Add these exports
export const unitOptions = [
  'cup',
  'tbsp',
  'tsp',
  'oz',
  'lb',
  'g',
  'ml',
  'whole',
  'slice',
  'piece',
  'clove',
  'pinch',
  'garnish',
  'other'
] as const;

export type UnitOption = typeof unitOptions[number];
