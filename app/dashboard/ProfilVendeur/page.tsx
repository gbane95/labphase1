import React from 'react';
import FormProfilVendeur from './FormProfilVendeur';

function ProfilVendeur() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Profil du Vendeur</h1>
          <FormProfilVendeur />
        </div>
      </div>
    </div>
  );
}

export default ProfilVendeur;