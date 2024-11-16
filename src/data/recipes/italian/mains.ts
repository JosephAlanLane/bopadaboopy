import { Recipe } from "@/types/recipe";

export const mainRecipes: Recipe[] = [
  {
    id: '11',
    title: 'Homemade Gnocchi',
    image: 'https://images.unsplash.com/photo-1617207778900-b0d55d9c2b17?w=800&auto=format&fit=crop',
    recipeUrl: 'https://example.com/gnocchi',
    ingredients: [
      { amount: '2', unit: 'lbs', item: 'potatoes' },
      { amount: '2', unit: 'cups', item: 'flour' },
      { amount: '1', unit: '', item: 'egg' },
      { amount: '1', unit: 'tsp', item: 'salt' },
    ],
    instructions: [
      'Boil potatoes until tender',
      'Mash potatoes and let cool',
      'Mix with flour, egg, and salt',
      'Form into small dumplings',
      'Cook in boiling water until they float'
    ],
    cuisine: 'Italian',
    allergens: ['gluten', 'eggs']
  },
  {
    id: '12',
    title: 'Osso Buco',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop',
    recipeUrl: 'https://example.com/ossobuco',
    ingredients: [
      { amount: '4', unit: '', item: 'veal shanks' },
      { amount: '1', unit: 'cup', item: 'white wine' },
      { amount: '2', unit: '', item: 'carrots' },
      { amount: '1', unit: '', item: 'onion' },
    ],
    instructions: [
      'Brown veal shanks',
      'Sauté vegetables',
      'Add wine and broth',
      'Simmer for 2 hours'
    ],
    cuisine: 'Italian',
    allergens: []
  }
];