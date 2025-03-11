"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';

type RedirectContextType = {
  redirectUrl: string | null;
  setRedirectUrl: (url: string | null) => void;
};

const RedirectContext = createContext<RedirectContextType | undefined>(undefined);

export const RedirectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  // Clear redirect URL when component mounts to prevent unwanted redirects
  useEffect(() => {
    // We can optionally load from localStorage if we want the redirect to persist across page refreshes
    const savedRedirect = localStorage.getItem('redirectAfterLogin');
    if (savedRedirect) {
      setRedirectUrl(savedRedirect);
      // Clear from localStorage after loading
      localStorage.removeItem('redirectAfterLogin');
    }
  }, []);

  // Save redirect URL to localStorage when it changes
  useEffect(() => {
    if (redirectUrl) {
      localStorage.setItem('redirectAfterLogin', redirectUrl);
    }
  }, [redirectUrl]);

  return (
    <RedirectContext.Provider value={{ redirectUrl, setRedirectUrl }}>
      {children}
    </RedirectContext.Provider>
  );
};

export const useRedirect = () => {
  const context = useContext(RedirectContext);
  if (context === undefined) {
    throw new Error('useRedirect must be used within a RedirectProvider');
  }
  return context;
};