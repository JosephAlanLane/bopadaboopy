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
  {
    id: '11',
    title: 'Homemade Gnocchi',
    image: 'https://images.unsplash.com/photo-1617207778900-b0d55d9c2b17?w=800&auto=format&fit=crop',
    recipeUrl: 'https://example.com/gnocchi',
    ingredients: [
      { amount: '2', unit: 'lbs', item: 'potatoes' },
      { amount: '2', unit: 'cups', item: 'flour' },
      { amount: '1', item: 'egg' },
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
      { amount: '4', item: 'veal shanks' },
      { amount: '1', unit: 'cup', item: 'white wine' },
      { amount: '2', item: 'carrots' },
      { amount: '1', item: 'onion' },
    ],
    instructions: [
      'Brown veal shanks',
      'Sauté vegetables',
      'Add wine and broth',
      'Simmer for 2 hours'
    ],
    cuisine: 'Italian',
    allergens: []
  },
  {
    id: '13',
    title: 'Risotto ai Funghi',
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&auto=format&fit=crop',
    recipeUrl: 'https://example.com/risotto',
    ingredients: [
      { amount: '2', unit: 'cups', item: 'arborio rice' },
      { amount: '1', unit: 'lb', item: 'mushrooms' },
      { amount: '1', unit: 'cup', item: 'white wine' },
      { amount: '4', unit: 'cups', item: 'broth' },
    ],
    instructions: [
      'Sauté mushrooms',
      'Toast rice',
      'Add wine and broth gradually',
      'Stir until creamy'
    ],
    cuisine: 'Italian',
    allergens: []
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
  {
    id: '15',
    title: 'Eggplant Parmigiana',
    image: 'https://images.unsplash.com/photo-1541451166788-1e09f2691c47?w=800&auto=format&fit=crop',
    recipeUrl: 'https://example.com/eggplant-parmigiana',
    ingredients: [
      { amount: '2', item: 'eggplant' },
      { amount: '2', unit: 'cups', item: 'marinara sauce' },
      { amount: '2', unit: 'cups', item: 'mozzarella cheese' },
      { amount: '1/2', unit: 'cup', item: 'parmesan cheese' },
    ],
    instructions: [
      'Slice eggplant and sprinkle with salt',
      'Let site for 30 minutes',
      'Rinse and pat dry',
      'Layer with marinara sauce and cheese in a baking dish',
      'Bake until golden and bubbly'
    ],
    cuisine: 'Italian',
    allergens: ['dairy', 'gluten']
  },
  {
    id: '16',
    title: 'Lasagna',
    image: 'https://images.unsplash.com/photo-1544717317-80104b3e657b?w=800&auto=format&fit=crop',
    recipeUrl: 'https://example.com/lasagna',
    ingredients: [
      { amount: '12', item: 'lasagna noodles' },
      { amount: '1', unit: 'lb', item: 'ground beef' },
      { amount: '2', unit: 'cups', item: 'ricotta cheese' },
      { amount: '3', unit: 'cups', item: 'marinara sauce' },
      { amount: '2', unit: 'cups', item: 'mozzarella cheese' },
    ],
    instructions: [
      'Cook noodles according to package instructions',
      'Brown ground beef in a skillet',
      'Layer noodles, beef, ricotta, marinara, and mozzarella in a baking dish',
      'Bake until heated through and cheese is bubbly'
    ],
    cuisine: 'Italian',
    allergens: ['dairy', 'gluten']
  },
  {
    id: '17',
    title: 'Baked Ziti',
    image: 'https://images.unsplash.com/photo-1620739526355-a3c3c18c86b6?w=800&auto=format&fit=crop',
    recipeUrl: 'https://example.com/baked-ziti',
    ingredients: [
      { amount: '1', unit: 'lb', item: 'ziti pasta' },
      { amount: '2', unit: 'cups', item: 'ricotta cheese' },
      { amount: '2', unit: 'cups', item: 'marinara sauce' },
      { amount: '2', unit: 'cups', item: 'mozzarella cheese' },
    ],
    instructions: [
      'Cook ziti according to package instructions',
      'Mix ziti with ricotta and marinara sauce',
      'Transfer to a baking dish and top with mozzarella',
      'Bake until cheese is melted and bubbly'
    ],
    cuisine: 'Italian',
    allergens: ['dairy', 'gluten']
  },
  {
    id: '18',
    title: 'Bruschetta',
    image: 'https://images.unsplash.com/photo-1592041972542-6b017ad56379?w=800&auto=format&fit=crop',
    recipeUrl: 'https://example.com/bruschetta',
    ingredients: [
      { amount: '1', item: 'loaf of Italian bread' },
      { amount: '3', item: 'tomatoes' },
      { amount: '2', item: 'cloves of garlic' },
      { amount: '1/4', unit: 'cup', item: 'basil' },
      { amount: '1/4', unit: 'cup', item: 'olive oil' },
    ],
    instructions: [
      'Toast sliced bread',
      'Mix diced tomatoes, minced garlic, chopped basil, and olive oil',
      'Top toasted bread with tomato mixture and serve'
    ],
    cuisine: 'Italian',
    allergens: ['gluten']
  },
  {
    id: '19',
    title: 'Fettuccine Alfredo',
    image: 'https://images.unsplash.com/photo-1597116998981-516d03857a4f?w=800&auto=format&fit=crop',
    recipeUrl: 'https://example.com/fettuccine-alfredo',
    ingredients: [
      { amount: '1', unit: 'lb', item: 'fettuccine pasta' },
      { amount: '1', unit: 'cup', item: 'heavy cream' },
      { amount: '1/2', unit: 'cup', item: 'parmesan cheese' },
      { amount: '1/4', unit: 'cup', item: 'butter' },
    ],
    instructions: [
      'Cook fettuccine according to package instructions',
      'Simmer cream and butter in a saucepan',
      'Stir in cheese until melted',
      'Combine with pasta and serve'
    ],
    cuisine: 'Italian',
    allergens: ['dairy', 'gluten']
  },
  {
    id: '20',
    title: 'Tiramisu',
    image: 'https://images.unsplash.com/photo-1604037675271-7a4c0b4be2a5?w=800&auto=format&fit=crop',
    recipeUrl: 'https://example.com/tiramisu',
    ingredients: [
      { amount: '2', item: 'cups', item: 'mascarpone cheese' },
      { amount: '1', item: 'cup', item: 'coffee' },
      { amount: '1/2', item: 'cup', item: 'sugar' },
      { amount: '3', item: 'eggs' },
      { amount: '1', item: 'pkg', item: 'ladyfingers' },
    ],
    instructions: [
      'Mix coffee and sugar until dissolved',
      'Combine eggs and mascarpone until smooth',
      'Dip ladyfingers in coffee and layer with mascarpone mixture',
      'Chill and serve'
    ],
    cuisine: 'Italian',
    allergens: ['dairy', 'eggs', 'gluten']
  },
];
