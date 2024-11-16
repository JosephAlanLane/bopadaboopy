import { Recipe } from "@/types/recipe";

export const asianRecipes: Recipe[] = [
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
  },
  {
    id: '4',
    title: 'Teriyaki Salmon',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&auto=format&fit=crop',
    recipeUrl: 'https://example.com/teriyaki-salmon',
    ingredients: [
      { amount: '4', item: 'salmon fillets' },
      { amount: '1/2', unit: 'cup', item: 'soy sauce' },
      { amount: '1/4', unit: 'cup', item: 'mirin' },
      { amount: '2', unit: 'tbsp', item: 'brown sugar' },
      { amount: '1', unit: 'tbsp', item: 'ginger' },
    ],
    instructions: [
      'Mix sauce ingredients',
      'Marinate salmon for 30 minutes',
      'Bake at 400°F for 12-15 minutes',
      'Brush with remaining sauce'
    ],
    cuisine: 'Japanese',
    allergens: ['fish', 'soy']
  },
];