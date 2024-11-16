import { Recipe } from "@/types/recipe";

export const mediterraneanRecipes: Recipe[] = [
  {
    id: '3',
    title: 'Mediterranean Quinoa Bowl',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop',
    recipeUrl: 'https://example.com/quinoa-bowl',
    ingredients: [
      { amount: '1', unit: 'cup', item: 'quinoa' },
      { amount: '2', unit: 'cups', item: 'cherry tomatoes' },
      { amount: '1', unit: 'cup', item: 'cucumber' },
      { amount: '1/2', unit: 'cup', item: 'kalamata olives' },
      { amount: '4', unit: 'oz', item: 'feta cheese' },
      { amount: '1/4', unit: 'cup', item: 'olive oil' },
    ],
    instructions: [
      'Cook quinoa according to package instructions',
      'Chop vegetables',
      'Combine all ingredients',
      'Drizzle with olive oil and serve'
    ],
    cuisine: 'Mediterranean',
    allergens: ['dairy']
  },
  {
    id: '6',
    title: 'Greek Salad',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&auto=format&fit=crop',
    recipeUrl: 'https://example.com/greek-salad',
    ingredients: [
      { amount: '2', unit: 'cups', item: 'romaine lettuce' },
      { amount: '1', unit: 'cup', item: 'cherry tomatoes' },
      { amount: '1/2', unit: 'cup', item: 'cucumber' },
      { amount: '1/4', unit: 'cup', item: 'red onion' },
      { amount: '1/2', unit: 'cup', item: 'kalamata olives' },
      { amount: '4', unit: 'oz', item: 'feta cheese' },
    ],
    instructions: [
      'Chop all vegetables',
      'Combine in a large bowl',
      'Add dressing and toss',
      'Top with feta cheese'
    ],
    cuisine: 'Mediterranean',
    allergens: ['dairy']
  },
];