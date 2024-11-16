import { Recipe } from "@/types/recipe";

export const chineseRecipes: Recipe[] = [
  {
    id: '8',
    title: 'Beef Stir Fry',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop',
    recipeUrl: 'https://example.com/stir-fry',
    ingredients: [
      { amount: '1', unit: 'lb', item: 'beef strips' },
      { amount: '2', unit: 'cups', item: 'mixed vegetables' },
      { amount: '3', unit: 'tbsp', item: 'soy sauce' },
      { amount: '2', unit: 'tbsp', item: 'sesame oil' },
    ],
    instructions: [
      'Marinate beef in soy sauce',
      'Stir fry vegetables',
      'Add beef and cook',
      'Serve over rice'
    ],
    cuisine: 'Chinese',
    allergens: ['soy']
  }
];