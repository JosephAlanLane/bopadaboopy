import { Recipe } from "@/types/recipe";

export const americanRecipes: Recipe[] = [
  {
    id: '9',
    title: 'Pancakes',
    image: 'https://images.unsplash.com/photo-1617207778900-b0d55d9c2b17?w=800&auto=format&fit=crop',
    recipeUrl: 'https://example.com/pancakes',
    ingredients: [
      { amount: '2', unit: 'cups', item: 'flour' },
      { amount: '2', unit: 'tbsp', item: 'sugar' },
      { amount: '1', unit: 'tbsp', item: 'baking powder' },
      { amount: '1/2', unit: 'tsp', item: 'salt' },
      { amount: '1', unit: 'cup', item: 'milk' },
      { amount: '2', item: 'large eggs' },
      { amount: '1/4', unit: 'cup', item: 'butter' },
    ],
    instructions: [
      'Mix dry ingredients in one bowl',
      'Whisk wet ingredients in another bowl',
      'Combine both and stir until smooth',
      'Pour batter on griddle and cook until golden'
    ],
    cuisine: 'American',
    allergens: ['gluten', 'dairy', 'eggs']
  },
  {
    id: '11',
    title: 'BBQ Ribs',
    image: 'https://images.unsplash.com/photo-1598527550252-68e799ed6463?w=800&auto=format&fit=crop',
    recipeUrl: 'https://example.com/bbq-ribs',
    ingredients: [
      { amount: '2', unit: 'lbs', item: 'pork ribs' },
      { amount: '1', unit: 'cup', item: 'bbq sauce' },
      { amount: '2', unit: 'tbsp', item: 'brown sugar' },
    ],
    instructions: [
      'Preheat oven to 300°F',
      'Rub ribs with brown sugar',
      'Bake for 3 hours, basting with sauce'
    ],
    cuisine: 'American',
    allergens: []
  },
];