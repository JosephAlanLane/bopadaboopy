import { Recipe } from "@/types/recipe";

export const italianRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Spaghetti Carbonara',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&auto=format&fit=crop',
    recipeUrl: 'https://example.com/carbonara',
    ingredients: [
      { amount: '1', unit: 'lb', item: 'spaghetti' },
      { amount: '4', unit: 'oz', item: 'pancetta' },
      { amount: '4', item: 'large eggs' },
      { amount: '1', unit: 'cup', item: 'Pecorino Romano cheese' },
    ],
    instructions: [
      'Bring a large pot of salted water to boil',
      'Cook spaghetti according to package instructions',
      'Meanwhile, cook pancetta until crispy',
      'Mix eggs and cheese in a bowl',
      'Combine all ingredients and serve immediately'
    ],
    cuisine: 'Italian',
    allergens: ['eggs', 'dairy', 'gluten']
  },
  {
    id: '19',
    title: 'Pesto Pasta',
    image: 'https://images.unsplash.com/photo-1587452455433-19f3c2a8eb40?w=800&auto=format&fit=crop',
    recipeUrl: 'https://example.com/pesto-pasta',
    ingredients: [
      { amount: '12', unit: 'oz', item: 'pasta' },
      { amount: '1', unit: 'cup', item: 'pesto' },
      { amount: '1/2', unit: 'cup', item: 'parmesan cheese' },
    ],
    instructions: [
      'Cook pasta according to package directions',
      'Drain and mix with pesto and cheese'
    ],
    cuisine: 'Italian',
    allergens: ['gluten', 'dairy']
  },
];