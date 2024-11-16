import { Recipe } from "@/types/recipe";

export const thaiRecipes: Recipe[] = [
  {
    id: '2',
    title: 'Pad Thai',
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&auto=format&fit=crop',
    recipeUrl: 'https://example.com/padthai',
    ingredients: [
      { amount: '8', unit: 'oz', item: 'rice noodles' },
      { amount: '2', item: 'eggs' },
      { amount: '1/2', unit: 'cup', item: 'tofu' },
      { amount: '1/4', unit: 'cup', item: 'peanuts' },
    ],
    instructions: [
      'Soak noodles in hot water',
      'Prepare sauce mixture',
      'Stir-fry vegetables and protein',
      'Add noodles and sauce',
      'Garnish with peanuts and serve'
    ],
    cuisine: 'Thai',
    allergens: ['peanuts', 'eggs', 'soy']
  }
];