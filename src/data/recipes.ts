import { Recipe } from '@/types/recipe';
import { italianRecipes } from './recipes/italian';
import { thaiRecipes } from './recipes/thai';
import { mediterraneanRecipes } from './recipes/mediterranean';
import { americanRecipes } from './recipes/american';
import { japaneseRecipes } from './recipes/japanese';
import { mexicanRecipes } from './recipes/mexican';
import { indianRecipes } from './recipes/indian';
import { chineseRecipes } from './recipes/chinese';

export const recipes: Recipe[] = [
  ...italianRecipes,
  ...thaiRecipes,
  ...mediterraneanRecipes,
  ...americanRecipes,
  ...japaneseRecipes,
  ...mexicanRecipes,
  ...indianRecipes,
  ...chineseRecipes,
];

export const cuisineTypes = [
  'Italian',
  'Thai',
  'Chinese',
  'Mediterranean',
  'American',
  'Japanese',
  'Mexican',
  'Indian',
  'French',
  'Korean'
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