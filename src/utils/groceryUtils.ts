import { Recipe, MealPlan } from "@/types/recipe";
import { GroceryItem } from "@/types/grocery";

export const generateGroceryList = (mealPlan: MealPlan) => {
  const groceries: { [key: string]: GroceryItem & { itemName: string } } = {};
  
  Object.values(mealPlan).forEach((recipe) => {
    if (!recipe) return;
    recipe.ingredients.forEach(({ amount, item, unit }) => {
      const key = `${item.toLowerCase()}_${unit || ''}`;
      const numericAmount = parseFloat(amount) || 0;
      
      if (groceries[key]) {
        groceries[key].amount += numericAmount;
      } else {
        groceries[key] = { 
          amount: numericAmount, 
          unit,
          itemName: item 
        };
      }
    });
  });

  const displayList: { [key: string]: GroceryItem } = {};
  Object.entries(groceries).forEach(([_key, value]) => {
    displayList[value.itemName] = {
      amount: Math.round(value.amount * 100) / 100,
      unit: value.unit
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