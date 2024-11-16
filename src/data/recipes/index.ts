import { Recipe } from "@/types/recipe";
import { italianRecipes } from "./italian";
import { asianRecipes } from "./asian";
import { mediterraneanRecipes } from "./mediterranean";
import { americanRecipes } from "./american";

export const recipes: Recipe[] = [
  ...italianRecipes,
  ...asianRecipes,
  ...mediterraneanRecipes,
  ...americanRecipes,
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