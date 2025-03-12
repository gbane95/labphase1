"use client";

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

// Importez dynamiquement la barre latérale sans SSR pour éviter les problèmes d'hydratation
const Sidebar = dynamic(() => import('@/components/Sidebar'), {
  ssr: false,
  loading: () => <div className="w-64 h-screen bg-gray-800"></div>
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const userInfo = localStorage.getItem('usersInfos');
    if (!userInfo) {
      // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
      router.push('/connexion');
    } else {
      try {
        // Vérifier si l'utilisateur est un vendeur
        const userData = JSON.parse(userInfo);
        if (userData.accountType !== 'vendeur') {
          // Rediriger vers la page d'accueil si l'utilisateur n'est pas un vendeur
          router.push('/');
        }
      } catch (error) {
        console.error('Erreur lors de la vérification des informations utilisateur:', error);
        router.push('/connexion');
      }
    }
  }, [router]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-4 md:ml-64 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}