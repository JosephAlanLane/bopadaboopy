import { Recipe } from "@/types/recipe";

export const japaneseRecipes: Recipe[] = [
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
  }
];