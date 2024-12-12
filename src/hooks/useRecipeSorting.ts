import { useState, useCallback } from 'react';

export const useRecipeSorting = () => {
  const [sortBy, setSortBy] = useState<string>('rating');
  const [isAscending, setIsAscending] = useState(true); // Changed to true so when inverted by the sort function, highest ratings appear first

  const handleSortChange = useCallback((value: string) => {
    setSortBy(value);
  }, []);

  const handleDirectionChange = useCallback(() => {
    setIsAscending(prev => !prev);
  }, []);

  return {
    sortBy,
    isAscending,
    handleSortChange,
    handleDirectionChange
  };
};