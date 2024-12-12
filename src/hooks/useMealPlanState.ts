import { useState } from 'react';

export const useMealPlanState = (initialIsSaved: boolean = false) => {
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(initialIsSaved);

  return {
    showDialog,
    setShowDialog,
    isLoading,
    setIsLoading,
    isSaved,
    setIsSaved
  };
};