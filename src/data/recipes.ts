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
  },
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
  },
  {
    id: '9',
    title: 'Pancakes',
    image: 'https://images.unsplash.com/photo-1617207778900-b0d55d9c2b17?w=800&auto=format&fit=crop',
    recipeUrl: 'https://example.com/pancakes',
    ingredients: [
      { amount: '2', unit: 'cups', item: 'flour' },
      { amount: '2', unit: 'tbsp', item: 'sugar' },
      { amount: '1', unit: 'tbsp', item: 'baking powder' },
      { amount: '1/2', unit: 'tsp', item: 'salt' },
      { amount: '1', unit: 'cup', item: 'milk' },
      { amount: '2', unit: 'large', item: 'eggs' },
      { amount: '1/4', unit: 'cup', item: 'butter' },
    ],
    instructions: [
      'Mix dry ingredients in one bowl',
      'Whisk wet ingredients in another bowl',
      'Combine both and stir until smooth',
      'Pour batter on griddle and cook until golden'
    ],
    cuisine: 'American',
    allergens: ['gluten', 'dairy', 'eggs']
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
  {
    id: '11',
    title: 'BBQ Ribs',
    image: 'https://images.unsplash.com/photo-1598527550252-68e799ed6463?w=800&auto=format&fit=crop',
    recipeUrl: 'https://example.com/bbq-ribs',
    ingredients: [
      { amount: '2', unit: 'lbs', item: 'pork ribs' },
      { amount: '1', unit: 'cup', item: 'bbq sauce' },
      { amount: '2', unit: 'tbsp', item: 'brown sugar' },
    ],
    instructions: [
      'Preheat oven to 300°F',
      'Rub ribs with brown sugar',
      'Bake for 3 hours, basting with sauce'
    ],
    cuisine: 'American',
    allergens: []
  },
  {
    id: '12',
    title: 'Lentil Soup',
    image: 'https://images.unsplash.com/photo-1597116998981-516d03857a4f?w=800&auto=format&fit=crop',
    recipeUrl: 'https://example.com/lentil-soup',
    ingredients: [
      { amount: '1', unit: 'cup', item: 'lentils' },
      { amount: '4', unit: 'cups', item: 'vegetable broth' },
      { amount: '1', unit: 'large', item: 'carrot' },
      { amount: '1', unit: 'large', item: 'onion' },
      { amount: '2', unit: 'cloves', item: 'garlic' },
    ],
    instructions: [
      'Sauté onion and garlic',
      'Add carrot and cook for another minute',
      'Add lentils and broth, simmer for 30 minutes'
    ],
    cuisine: 'Vegetarian',
    allergens: []
  },
  {
    id: '13',
    title: 'Chocolate Chip Cookies',
    image: 'https://images.unsplash.com/photo-1560311079-d5a69f02f226?w=800&auto=format&fit=crop',
    recipeUrl: 'https://example.com/chocolate-chip-cookies',
    ingredients: [
      { amount: '2', unit: 'cups', item: 'flour' },
      { amount: '1', unit: 'cup', item: 'brown sugar' },
      { amount: '1/2', unit: 'cup', item: 'white sugar' },
      { amount: '1', unit: 'cup', item: 'butter' },
      { amount: '1', item: 'egg' },
      { amount: '2', unit: 'cups', item: 'chocolate chips' },
    ],
    instructions: [
      'Preheat oven to 350°F',
      'Cream butter and sugars',
      'Add egg and mix well',
      'Fold in flour and chocolate chips',
      'Bake for 10-12 minutes'
    ],
    cuisine: 'American',
    allergens: ['gluten', 'dairy', 'eggs']
  },
  {
    id: '14',
    title: 'Eggplant Parmesan',
    image: 'https://images.unsplash.com/photo-1621771168268-23a1ffbef44c?w=800&auto=format&fit=crop',
    recipeUrl: 'https://example.com/eggplant-parmesan',
    ingredients: [
      { amount: '1', unit: 'large', item: 'eggplant' },
      { amount: '2', unit: 'cups', item: 'marinara sauce' },
      { amount: '2', unit: 'cups', item: 'mozzarella cheese' },
      { amount: '1/2', unit: 'cup', item: 'parmesan cheese' },
    ],
    instructions: [
      'Slice eggplant and salt to remove bitterness',
      'Layer eggplant, sauce, and cheese in a dish',
      'Bake for 30 minutes at 375°F'
    ],
    cuisine: 'Italian',
    allergens: ['dairy', 'gluten']
  },
  {
    id: '15',
    title: 'Stuffed Peppers',
    image: 'https://images.unsplash.com/photo-1571946132476-e74f5d3bd037?w=800&auto=format&fit=crop',
    recipeUrl: 'https://example.com/stuffed-peppers',
    ingredients: [
      { amount: '4', item: 'bell peppers' },
      { amount: '1', unit: 'lb', item: 'ground beef' },
      { amount: '1', unit: 'cup', item: 'rice' },
      { amount: '1', unit: 'cup', item: 'tomato sauce' },
    ],
    instructions: [
      'Cook rice and mix with ground beef and sauce',
      'Stuff peppers with mixture',
      'Bake at 375°F for 30 minutes'
    ],
    cuisine: 'American',
    allergens: ['gluten']
  },
  {
    id: '16',
    title: 'Fish Tacos',
    image: 'https://images.unsplash.com/photo-1617056484276-0f7ca8f7c795?w=800&auto=format&fit=crop',
    recipeUrl: 'https://example.com/fish-tacos',
    ingredients: [
      { amount: '1', unit: 'lb', item: 'white fish' },
      { amount: '1', unit: 'tsp', item: 'cumin' },
      { amount: '1', unit: 'tsp', item: 'paprika' },
      { amount: '8', item: 'corn tortillas' },
    ],
    instructions: [
      'Season fish and grill or bake',
      'Assemble tacos with toppings of choice'
    ],
    cuisine: 'Mexican',
    allergens: []
  },
  {
    id: '17',
    title: 'Fried Rice',
    image: 'https://images.unsplash.com/photo-1589528161513-0c03ef09bee2?w=800&auto=format&fit=crop',
    recipeUrl: 'https://example.com/fried-rice',
    ingredients: [
      { amount: '2', unit: 'cups', item: 'cooked rice' },
      { amount: '1', unit: 'cup', item: 'mixed vegetables' },
      { amount: '2', unit: 'eggs' },
      { amount: '2', unit: 'tbsp', item: 'soy sauce' },
    ],
    instructions: [
      'Heat oil in a pan',
      'Scramble eggs and add vegetables',
      'Add rice and soy sauce, stir until heated'
    ],
    cuisine: 'Chinese',
    allergens: ['soy', 'eggs']
  },
  {
    id: '18',
    title: 'Chili',
    image: 'https://images.unsplash.com/photo-1522231591719-3e67e44f1002?w=800&auto=format&fit=crop',
    recipeUrl: 'https://example.com/chili',
    ingredients: [
      { amount: '1', unit: 'lb', item: 'ground beef' },
      { amount: '1', unit: 'can', item: 'kidney beans' },
      { amount: '1', unit: 'can', item: 'diced tomatoes' },
      { amount: '1', unit: 'tbsp', item: 'chili powder' },
    ],
    instructions: [
      'Cook ground beef until browned',
      'Add beans, tomatoes, and seasoning',
      'Simmer for 30 minutes'
    ],
    cuisine: 'American',
    allergens: []
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
  {
    id: '20',
    title: 'Mango Salsa',
    image: 'https://images.unsplash.com/photo-1596043018010-62d1e6c25de4?w=800&auto=format&fit=crop',
    recipeUrl: 'https://example.com/mango-salsa',
    ingredients: [
      { amount: '1', item: 'mango' },
      { amount: '1/2', unit: 'small', item: 'red onion' },
      { amount: '1', item: 'jalapeño' },
      { amount: '1', item: 'lime' },
    ],
    instructions: [
      'Dice mango, onion, and jalapeño',
      'Mix with lime juice and serve'
    ],
    cuisine: 'Mexican',
    allergens: []
  },
  {
    id: '21',
    title: 'French Toast',
    image: 'https://images.unsplash.com/photo-1610072633481-79bfb96d249e?w=800&auto=format&fit=crop',
    recipeUrl: 'https://example.com/french-toast',
    ingredients: [
      { amount: '4', item: 'slices of bread' },
      { amount: '2', item: 'eggs' },
      { amount: '1/2', unit: 'cup', item: 'milk' },
      { amount: '1', unit: 'tbsp', item: 'cinnamon' },
    ],
    instructions: [
      'Whisk eggs, milk, and cinnamon together',
      'Dip bread in mixture and cook on skillet'
    ],
    cuisine: 'American',
    allergens: ['gluten', 'dairy', 'eggs']
  },
  {
    id: '22',
    title: 'Apple Pie',
    image: 'https://images.unsplash.com/photo-1521578377597-fde4b350d78e?w=800&auto=format&fit=crop',
    recipeUrl: 'https://example.com/apple-pie',
    ingredients: [
      { amount: '2', unit: 'cups', item: 'sliced apples' },
      { amount: '1', unit: 'cup', item: 'sugar' },
      { amount: '1', unit: 'tsp', item: 'cinnamon' },
      { amount: '1', item: 'pie crust' },
    ],
    instructions: [
      'Mix apples with sugar and cinnamon',
      'Fill pie crust and bake until golden'
    ],
    cuisine: 'American',
    allergens: ['gluten', 'dairy']
  },
  {
    id: '23',
    title: 'Sushi',
    image: 'https://images.unsplash.com/photo-1615855713157-6fb92f7a86ca?w=800&auto=format&fit=crop',
    recipeUrl: 'https://example.com/sushi',
    ingredients: [
      { amount: '2', unit: 'cups', item: 'sushi rice' },
      { amount: '1/4', unit: 'cup', item: 'rice vinegar' },
      { amount: '1', item: 'sheet', item: 'nori' },
    ],
    instructions: [
      'Cook sushi rice and let cool',
      'Add vinegar and mix well',
      'Place rice on nori, add fillings and roll'
    ],
    cuisine: 'Japanese',
    allergens: ['fish']
  },
  {
    id: '24',
    title: 'Rice Pudding',
    image: 'https://images.unsplash.com/photo-1593788782152-c63ee2cd2fa2?w=800&auto=format&fit=crop',
    recipeUrl: 'https://example.com/rice-pudding',
    ingredients: [
      { amount: '1', unit: 'cup', item: 'rice' },
      { amount: '4', unit: 'cups', item: 'milk' },
      { amount: '1/2', unit: 'cup', item: 'sugar' },
      { amount: '1', unit: 'tbsp', item: 'vanilla extract' },
    ],
    instructions: [
      'Combine rice, milk and sugar in a pot',
      'Cook over low heat, stirring until thickened',
      'Add vanilla and serve'
    ],
    cuisine: 'American',
    allergens: ['dairy']
  },
  {
    id: '25',
    title: 'Mushroom Risotto',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&auto=format&fit=crop',
    recipeUrl: 'https://example.com/risotto',
    ingredients: [
      { amount: '1.5', unit: 'cups', item: 'arborio rice' },
      { amount: '8', unit: 'oz', item: 'mushrooms' },
      { amount: '1/2', unit: 'cup', item: 'white wine' },
      { amount: '4', unit: 'cups', item: 'vegetable broth' },
      { amount: '1/2', unit: 'cup', item: 'parmesan cheese' },
    ],
    instructions: [
      'Sauté mushrooms',
      'Toast rice in butter',
      'Add wine and broth gradually',
      'Finish with parmesan'
    ],
    cuisine: 'Italian',
    allergens: ['dairy']
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
