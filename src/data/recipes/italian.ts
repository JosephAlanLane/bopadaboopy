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
  },
];