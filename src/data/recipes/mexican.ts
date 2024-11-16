import { Recipe } from "@/types/recipe";

export const mexicanRecipes: Recipe[] = [
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
  }
];