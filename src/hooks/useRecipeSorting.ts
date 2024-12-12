import { useState, useCallback } from 'react';

export const useRecipeSorting = () => {
  const [sortBy, setSortBy] = useState<string>('rating');
  const [isAscending, setIsAscending] = useState(false);

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