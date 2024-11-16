import { Recipe } from '@/types/recipe';

export const recipes: Recipe[] = [
  {
    id: '1',
    title: 'Spaghetti Carbonara',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&auto=format&fit=crop',
    recipeUrl: 'https://example.com/carbonara',
    ingredients: [
      { amount: '1 lb', item: 'spaghetti' },
      { amount: '4 oz', item: 'pancetta' },
      { amount: '4 large', item: 'eggs' },
      { amount: '1 cup', item: 'Pecorino Romano cheese' },
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
    id: '2',
    title: 'Pad Thai',
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&auto=format&fit=crop',
    recipeUrl: 'https://example.com/padthai',
    ingredients: [
      { amount: '8 oz', item: 'rice noodles' },
      { amount: '2', item: 'eggs' },
      { amount: '1/2 cup', item: 'tofu' },
      { amount: '1/4 cup', item: 'peanuts' },
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
    id: '3',
    title: 'Mediterranean Quinoa Bowl',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop',
    recipeUrl: 'https://example.com/quinoa-bowl',
    ingredients: [
      { amount: '1 cup', item: 'quinoa' },
      { amount: '2 cups', item: 'cherry tomatoes' },
      { amount: '1 cup', item: 'cucumber' },
      { amount: '1/2 cup', item: 'kalamata olives' },
      { amount: '4 oz', item: 'feta cheese' },
      { amount: '1/4 cup', item: 'olive oil' },
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
    id: '4',
    title: 'Teriyaki Salmon',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&auto=format&fit=crop',
    recipeUrl: 'https://example.com/teriyaki-salmon',
    ingredients: [
      { amount: '4 fillets', item: 'salmon' },
      { amount: '1/2 cup', item: 'soy sauce' },
      { amount: '1/4 cup', item: 'mirin' },
      { amount: '2 tbsp', item: 'brown sugar' },
      { amount: '1 tbsp', item: 'ginger' },
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
  {
    id: '5',
    title: 'Vegetarian Tacos',
    image: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=800&auto=format&fit=crop',
    recipeUrl: 'https://example.com/veggie-tacos',
    ingredients: [
      { amount: '2 cups', item: 'black beans' },
      { amount: '1 cup', item: 'corn' },
      { amount: '1', item: 'avocado' },
      { amount: '8', item: 'corn tortillas' },
      { amount: '1/2 cup', item: 'cilantro' },
    ],
    instructions: [
      'Heat beans and corn',
      'Warm tortillas',
      'Assemble tacos with toppings',
      'Garnish with cilantro'
    ],
    cuisine: 'Mexican',
    allergens: []
  }
];

export const cuisineTypes = [
  'Italian',
  'Thai',
  'Chinese',
  'Mediterranean',
  'American',
  'Japanese',
  'Mexican',
  'Indian'
];

export const allergens = [
  'dairy',
  'eggs',
  'fish',
  'shellfish',
  'tree nuts',
  'peanuts',
  'wheat',
  'soy'
];
