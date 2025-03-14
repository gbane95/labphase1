"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';

export type CartItem = {
  id: string | number;
  name: string;
  price: string | number;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: string | number) => void;
  updateQuantity: (productId: string | number, quantity: number) => void;
  cartCount: number;
  uniqueItemsCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Charger le panier depuis le stockage local lors du montage du composant
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
      }
    }
  }, []);

  // Fonction d'aide pour normaliser le prix
  const normalizePrice = (price: string | number): number => {
    if (typeof price === 'number') return price;
    return parseFloat(price.replace(/[^0-9.,]+/g, '').replace(',', '.'));
  };

  const addToCart = (product: CartItem) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === product.id && item.size === product.size);
      let newCart;
      if (existingItem) {
        newCart = currentCart.map(item =>
          (item.id === product.id && item.size === product.size)
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      } else {
        newCart = [...currentCart, { ...product, quantity: product.quantity || 1 }];
      }
      // Enregistrer dans le stockage local
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const removeFromCart = (productId: string | number) => {
    setCart(currentCart => {
      const newCart = currentCart.filter(item => item.id !== productId);
      // Enregistrer dans le stockage local
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const updateQuantity = (productId: string | number, quantity: number) => {
    setCart(currentCart => {
      // Mettre à jour la quantité, en s'assurant qu'elle ne descende jamais en dessous de 1
      // De cette façon, les éléments ne disparaîtront pas lorsque vous cliquez sur le signe moins
      const newCart = currentCart.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      );
      // Enregistrer dans le stockage local
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };


  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const uniqueItemsCount = cart.length; // Nombre d'articles uniques dans le panier

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, cartCount, uniqueItemsCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart doit être utilisé dans un CartProvider');
  }
  return context;
};