import { Recipe } from "@/types/recipe";

export const indianRecipes: Recipe[] = [
  {
    id: '7',
    title: 'Chicken Tikka Masala',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop',
    recipeUrl: 'https://example.com/tikka-masala',
    ingredients: [
      { amount: '2', unit: 'lbs', item: 'chicken breast' },
      { amount: '2', unit: 'cups', item: 'yogurt' },
      { amount: '2', unit: 'tbsp', item: 'garam masala' },
      { amount: '1', unit: 'can', item: 'tomato sauce' },
      { amount: '1', unit: 'cup', item: 'heavy cream' },
    ],
    instructions: [
      'Marinate chicken in yogurt and spices',
      'Grill chicken until cooked',
      'Prepare sauce with tomatoes and cream',
      'Combine and simmer'
    ],
    cuisine: 'Indian',
    allergens: ['dairy']
  }
];