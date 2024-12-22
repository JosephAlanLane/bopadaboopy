import { Recipe } from "@/types/recipe";
import { americanRecipes } from "./recipes/american";
import { asianRecipes } from "./recipes/asian";
import { mediterraneanRecipes } from "./recipes/mediterranean";
import { indianRecipes } from "./recipes/indian";
import { mexicanRecipes } from "./recipes/mexican";
import { chineseRecipes } from "./recipes/chinese";

export const recipes: Recipe[] = [
  ...americanRecipes,
  ...asianRecipes,
  ...mediterraneanRecipes,
  ...indianRecipes,
  ...mexicanRecipes,
  ...chineseRecipes
];

export const cuisineTypes = [
  'Italian',
  'Thai',
  'Chinese',
  'Mediterranean',
  'American',
  'Japanese',
  'Mexican',
  'Indian'
];

export const allergens = [
  'dairy',
  'eggs',
  'fish',
  'shellfish',
  'tree nuts',
  'peanuts',
  'wheat',
  'soy'
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