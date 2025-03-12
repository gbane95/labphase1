'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { User, Mail, MapPin, Edit } from 'lucide-react';

interface UserInfo {
  firstName?: string;
  lastName?: string;
  email?: string;
  gender?: string;
  country?: string;
  city?: string;
  address?: string;
  accountType?: string;
}

export default function CompteUtilisateur() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Récupérer les informations utilisateur du localStorage
    const storedUserInfo = localStorage.getItem('usersInfos');
    
    if (storedUserInfo) {
      try {
        const parsedUserInfo = JSON.parse(storedUserInfo);
        setUserInfo(parsedUserInfo);
      } catch (error) {
        console.error('Erreur lors de la récupération des informations utilisateur:', error);
      }
    } else {
      // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
      router.push('/connexion');
    }
    
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Vous n&apos;êtes pas connecté</h1>
          <button 
            onClick={() => router.push('/connexion')}
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800"
          >
            Se connecter
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {/* En-tête du profil */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-8 text-white">
              <div className="flex items-center">
                <div className="h-20 w-20 rounded-full bg-white text-indigo-600 flex items-center justify-center text-3xl font-bold">
                  {userInfo.firstName ? userInfo.firstName.charAt(0).toUpperCase() : ''}
                  {userInfo.lastName ? userInfo.lastName.charAt(0).toUpperCase() : ''}
                </div>
                <div className="ml-6">
                  <h1 className="text-2xl font-bold">
                    {userInfo.firstName} {userInfo.lastName}
                  </h1>
                  <p className="text-indigo-100">
                    {userInfo.accountType === 'vendeur' ? 'Compte Vendeur' : 'Compte Client'}
                  </p>
                </div>
              </div>
            </div>

            {/* Informations personnelles */}
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <User className="mr-2" /> Informations personnelles
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Nom complet</p>
                    <p className="font-medium">{userInfo.firstName} {userInfo.lastName}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      <p className="font-medium">{userInfo.email}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Genre</p>
                    <p className="font-medium capitalize">{userInfo.gender || 'Non spécifié'}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Adresse</p>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      <p className="font-medium">{userInfo.address || 'Non spécifiée'}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Ville</p>
                    <p className="font-medium">{userInfo.city || 'Non spécifiée'}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Pays</p>
                    <p className="font-medium">{userInfo.country || 'Non spécifié'}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button 
                  className="flex items-center text-sm text-indigo-600 hover:text-indigo-800"
                  onClick={() => router.push('/compte/modifier')}
                >
                  <Edit className="h-4 w-4 mr-1" /> Modifier mes informations
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
