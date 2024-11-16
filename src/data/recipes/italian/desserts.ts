import { Recipe } from "@/types/recipe";

export const dessertRecipes: Recipe[] = [
  {
    id: '20',
    title: 'Tiramisu',
    image: 'https://images.unsplash.com/photo-1604037675271-7a4c0b4be2a5?w=800&auto=format&fit=crop',
    recipeUrl: 'https://example.com/tiramisu',
    ingredients: [
      { amount: '2', unit: 'cups', item: 'mascarpone cheese' },
      { amount: '1', unit: 'cup', item: 'coffee' },
      { amount: '1/2', unit: 'cup', item: 'sugar' },
      { amount: '3', unit: '', item: 'eggs' },
      { amount: '1', unit: 'pkg', item: 'ladyfingers' },
    ],
    instructions: [
      'Mix coffee and sugar until dissolved',
      'Combine eggs and mascarpone until smooth',
      'Dip ladyfingers in coffee and layer with mascarpone mixture',
      'Chill and serve'
    ],
    cuisine: 'Italian',
    allergens: ['dairy', 'eggs', 'gluten']
  }
];