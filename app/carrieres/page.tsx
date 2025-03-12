'use client';
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';

const CarrieresPage = () => {
  // Sample job listings
  const jobListings = [
    {
      id: 1,
      title: 'Styliste Senior',
      department: 'Design',
      location: 'Abidjan, côte d ivoire',
      type: 'Temps plein',
      description: 'Nous recherchons un styliste senior talentueux pour rejoindre notre équipe créative et contribuer au développement de nos collections.',
    },
    {
      id: 2,
      title: 'Responsable Marketing Digital',
      department: 'Marketing',
      location: 'Abidjan, côte d ivoire',
      type: 'Temps plein',
      description: 'Dirigez notre stratégie de marketing digital pour renforcer notre présence en ligne et développer notre communauté.',
    },
    {
      id: 3,
      title: 'Conseiller(ère) de Vente',
      department: 'Ventes',
      location: 'Palmeraie, côte d ivoire',
      type: 'Temps plein',
      description: 'Rejoignez notre équipe de vente pour offrir une expérience client exceptionnelle dans notre boutique de Palmeraie.',
    },
    {
      id: 4,
      title: 'Responsable Logistique',
      department: 'Opérations',
      location: 'Plateau, côte d ivoire',
      type: 'Temps plein',
      description: 'Supervisez nos opérations logistiques pour assurer une distribution efficace de nos produits.',
    },
  ];

  return (
    <>
      <Navbar />
      <div className="pt-16 bg-white">
        {/* Hero Section */}
        <div className="relative h-96 bg-gray-900">
          <Image
            src="/images/carrier1.avif"
            alt="Carrières chez LUXE"
            fill
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Rejoignez l&apos;équipe LUXE</h1>
              <p className="text-xl max-w-2xl mx-auto">
                Découvrez les opportunités de carrière au sein de notre maison de luxe
              </p>

            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Why Join Us Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Pourquoi nous rejoindre ?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Innovation</h3>
                <p className="text-gray-600">
                  Nous encourageons la créativité et l'innovation dans tous les aspects de notre entreprise.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Développement</h3>
                <p className="text-gray-600">
                  Nous investissons dans le développement professionnel et personnel de nos employés.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Impact Global</h3>
                <p className="text-gray-600">
                  Rejoignez une entreprise avec une présence internationale et un impact global.
                </p>
              </div>
            </div>
          </div>

          {/* Current Openings */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Postes Ouverts</h2>
            <div className="space-y-6">
              {jobListings.map((job) => (
                <div key={job.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                    <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                      <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">{job.department}</span>
                      <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">{job.location}</span>
                      <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">{job.type}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{job.description}</p>
                  <button className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors">
                    Postuler maintenant
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 bg-gray-100 p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Vous ne trouvez pas le poste idéal ?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Nous sommes toujours à la recherche de talents exceptionnels. Envoyez-nous votre CV et nous vous contacterons si une opportunité correspondant à votre profil se présente.
            </p>
            <button className="bg-gray-900 text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors">
              Candidature spontanée
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CarrieresPage;