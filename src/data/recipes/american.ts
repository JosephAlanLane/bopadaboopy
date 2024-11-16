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
    id: '5',
    title: 'Vegetarian Tacos',
    image: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=800&auto=format&fit=crop',
    recipeUrl: 'https://example.com/veggie-tacos',
    ingredients: [
      { amount: '2', unit: 'cups', item: 'black beans' },
      { amount: '1', unit: 'cup', item: 'corn' },
      { amount: '1', item: 'avocado' },
      { amount: '8', item: 'corn tortillas' },
      { amount: '1/2', unit: 'cup', item: 'cilantro' },
    ],
    instructions: [
      'Heat beans and corn',
      'Warm tortillas',
      'Assemble tacos with toppings',
      'Garnish with cilantro'
    ],
    cuisine: 'Mexican',
    allergens: []
  },
];
