"use client"
import React, { createContext, useContext, useState } from 'react';

type FavoritesContextType = {
  favorites: (string | number)[];
  toggleFavorite: (productId: string | number) => void;
  isFavorite: (productId: string | number) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<(string | number)[]>([]);

  const toggleFavorite = (productId: string | number) => {
    setFavorites(current =>
      current.includes(productId)
        ? current.filter(id => id !== productId)
        : [...current, productId]
    );
  };

  const isFavorite = (productId: string | number) => favorites.includes(productId);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};