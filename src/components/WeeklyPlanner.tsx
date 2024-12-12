import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomMealPlanList } from './CustomMealPlanList';
import { RecipeSection } from './RecipeSection';
import { GroceryList } from './GroceryList';

interface WeeklyPlannerProps {
  defaultTab?: string;
}

export const WeeklyPlanner = ({ defaultTab = "weekly" }: WeeklyPlannerProps) => {
  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="weekly">Weekly Meal Plan</TabsTrigger>
        <TabsTrigger value="custom">Custom Tab</TabsTrigger>
        <TabsTrigger value="grocery">Grocery List</TabsTrigger>
      </TabsList>
      <TabsContent value="weekly">
        <RecipeSection tabContext="weekly" />
      </TabsContent>
      <TabsContent value="custom">
        <CustomMealPlanList tabContext="custom" />
      </TabsContent>
      <TabsContent value="grocery">
        <GroceryList />
      </TabsContent>
    </Tabs>
  );
};