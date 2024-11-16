import { Recipe } from "@/types/recipe";

export const pastaRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Spaghetti Carbonara',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&auto=format&fit=crop',
    recipeUrl: 'https://example.com/carbonara',
    ingredients: [
      { amount: '1', unit: 'lb', item: 'spaghetti' },
      { amount: '4', unit: 'oz', item: 'pancetta' },
      { amount: '4', unit: '', item: 'large eggs' },
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
    id: '14',
    title: 'Pesto Pasta',
    image: 'https://images.unsplash.com/photo-1581777469763-3f96e01269d3?w=800&auto=format&fit=crop',
    recipeUrl: 'https://example.com/pesto-pasta',
    ingredients: [
      { amount: '1', unit: 'lb', item: 'pasta' },
      { amount: '1', unit: 'cup', item: 'basil pesto' },
      { amount: '1/2', unit: 'cup', item: 'parmesan cheese' },
      { amount: '1/4', unit: 'cup', item: 'olive oil' },
    ],
    instructions: [
      'Cook pasta according to package instructions',
      'Drain and return to pot',
      'Mix in pesto and olive oil',
      'Top with parmesan cheese to serve'
    ],
    cuisine: 'Italian',
    allergens: ['gluten', 'dairy']
  },
];