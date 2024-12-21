import { Recipe, MealPlan } from "@/types/recipe";
import { GroceryItem } from "@/types/grocery";

interface GroceryItemWithRecipe extends GroceryItem {
  recipeId?: string;
}

export const generateGroceryList = (mealPlan: MealPlan, customServings: { [key: string]: number } = {}) => {
  const groceries: { [key: string]: GroceryItemWithRecipe & { itemName: string } } = {};
  
  Object.values(mealPlan).forEach((recipe) => {
    if (!recipe) return;
    
    const servingMultiplier = customServings[recipe.id] 
      ? customServings[recipe.id] / (recipe.servings || 1)
      : 1;

    console.log(`Generating grocery list for recipe ${recipe.id}:`, {
      recipeTitle: recipe.title,
      originalServings: recipe.servings,
      customServings: customServings[recipe.id],
      servingMultiplier
    });

    recipe.ingredients.forEach(({ amount, item, unit }) => {
      const key = `${item.toLowerCase()}_${unit || ''}`;
      const numericAmount = parseFloat(amount) || 0;
      
      if (groceries[key]) {
        groceries[key].amount += numericAmount * servingMultiplier;
      } else {
        groceries[key] = { 
          amount: numericAmount * servingMultiplier, 
          unit,
          itemName: item,
          recipeId: recipe.id
        };
      }
    });
  });

  const displayList: { [key: string]: GroceryItemWithRecipe } = {};
  Object.entries(groceries).forEach(([_key, value]) => {
    displayList[value.itemName] = {
      amount: Math.round(value.amount * 100) / 100,
      unit: value.unit,
      recipeId: value.recipeId
    };
  });

  return displayList;
};

export const getNextDate = (dayName: string) => {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = new Date();
  const todayDay = today.getDay();
  const targetDay = days.indexOf(dayName.toLowerCase());
  let daysUntilTarget = targetDay - todayDay;
  if (daysUntilTarget <= 0) daysUntilTarget += 7;
  
  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() + daysUntilTarget);
  return targetDate.toISOString().split('T')[0].replace(/-/g, '');
};
