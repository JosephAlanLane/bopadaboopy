import React from 'react';
import { Heart } from "lucide-react";

interface HeartButtonProps {
  isSaved: boolean;
  isLoading: boolean;
  onClick: (e: React.MouseEvent) => void;
}

export const HeartButton = ({ isSaved, isLoading, onClick }: HeartButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 transition-colors"
    >
      <Heart 
        className={`w-5 h-5 transition-colors ${
          isSaved 
            ? 'text-red-500 fill-red-500' 
            : 'text-gray-400 dark:text-gray-500 hover:text-red-500'
        }`} 
      />
    </button>
  );
};