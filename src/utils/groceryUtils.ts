import { Recipe, MealPlan } from "@/types/recipe";
import { GroceryItem } from "@/types/grocery";

interface GroceryItemWithRecipe extends GroceryItem {
  recipeId?: string;
}

export const generateGroceryList = (mealPlan: MealPlan, customPortions: { [key: string]: number } = {}) => {
  const groceries: { [key: string]: GroceryItemWithRecipe & { itemName: string } } = {};
  
  Object.entries(mealPlan).forEach(([day, recipe]) => {
    if (!recipe) return;
    
    const servingMultiplier = customPortions[day] 
      ? customPortions[day] / (recipe.servings || 1)
      : 1;

    console.log(`Processing recipe ${recipe.id} (${recipe.title}) for ${day}:`, {
      originalServings: recipe.servings,
      customPortions: customPortions[day],
      servingMultiplier
    });

    recipe.ingredients.forEach(({ amount, item, unit }) => {
      const key = `${item.toLowerCase()}_${unit || ''}`;
      const numericAmount = parseFloat(amount) || 0;
      const adjustedAmount = numericAmount * servingMultiplier;
      
      console.log(`Calculating amount for ${item} (${day}):`, {
        original: numericAmount,
        multiplier: servingMultiplier,
        adjusted: adjustedAmount
      });
      
      if (groceries[key]) {
        groceries[key].amount += adjustedAmount;
      } else {
        groceries[key] = { 
          amount: adjustedAmount, 
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