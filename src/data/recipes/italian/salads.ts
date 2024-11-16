import { Recipe } from "@/types/recipe";

export const saladRecipes: Recipe[] = [
  {
    id: '10',
    title: 'Caesar Salad',
    image: 'https://images.unsplash.com/photo-1603039282975-daeffe570a78?w=800&auto=format&fit=crop',
    recipeUrl: 'https://example.com/caesar-salad',
    ingredients: [
      { amount: '1', unit: 'large', item: 'romaine lettuce' },
      { amount: '1/2', unit: 'cup', item: 'parmesan cheese' },
      { amount: '1/4', unit: 'cup', item: 'Caesar dressing' },
      { amount: '1/4', unit: 'cup', item: 'croutons' },
    ],
    instructions: [
      'Chop lettuce and place in a bowl',
      'Add dressing and toss well',
      'Top with cheese and croutons'
    ],
    cuisine: 'Italian',
    allergens: ['dairy', 'gluten']
  }
];