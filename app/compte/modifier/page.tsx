'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { User, ArrowLeft, Save } from 'lucide-react';

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

export default function ModifierCompte() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  
  // État pour les données du formulaire
  const [formData, setFormData] = useState<UserInfo>({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    country: '',
    city: '',
    address: '',
    accountType: ''
  });

  useEffect(() => {
    // Récupérer les informations utilisateur du localStorage
    const storedUserInfo = localStorage.getItem('usersInfos');
    
    if (storedUserInfo) {
      try {
        const parsedUserInfo = JSON.parse(storedUserInfo);
        setFormData(parsedUserInfo);
      } catch (error) {
        console.error('Erreur lors de la récupération des informations utilisateur:', error);
      }
    } else {
      // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
      router.push('/connexion');
    }
    
    setLoading(false);
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ text: '', type: '' });

    try {
      // Sauvegarder les informations mises à jour dans localStorage
      localStorage.setItem('usersInfos', JSON.stringify(formData));
      
      // Afficher un message de succès
      setMessage({
        text: 'Vos informations ont été mises à jour avec succès !',
        type: 'success'
      });
      
      // Rediriger vers la page de profil après un court délai
      setTimeout(() => {
        router.push('/compte');
      }, 2000);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des informations:', error);
      setMessage({
        text: 'Une erreur est survenue lors de la sauvegarde de vos informations.',
        type: 'error'
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {/* En-tête */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-8 text-white">
              <div className="flex items-center">
                <div className="h-20 w-20 rounded-full bg-white text-indigo-600 flex items-center justify-center text-3xl font-bold">
                  {formData.firstName ? formData.firstName.charAt(0).toUpperCase() : ''}
                  {formData.lastName ? formData.lastName.charAt(0).toUpperCase() : ''}
                </div>
                <div className="ml-6">
                  <h1 className="text-2xl font-bold">
                    Modifier mon profil
                  </h1>
                  <p className="text-indigo-100">
                    {formData.accountType === 'vendeur' ? 'Compte Vendeur' : 'Compte Client'}
                  </p>
                </div>
              </div>
            </div>

            {/* Formulaire */}
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <User className="mr-2" /> Informations personnelles
              </h2>
              
              {message.text && (
                <div className={`p-4 mb-6 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {message.text}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      Prénom
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Nom
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                      Genre
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Sélectionnez</option>
                      <option value="homme">Homme</option>
                      <option value="femme">Femme</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Adresse
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      Ville
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                      Pays
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={formData.country || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                
                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={() => router.push('/compte')}
                    className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" /> Retour
                  </button>
                  
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                        Enregistrement...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" /> Enregistrer
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}