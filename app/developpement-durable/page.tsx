'use client';
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';

const DeveloppementDurablePage = () => {
  return (
    <>
      <Navbar />
      <div className="pt-16 bg-white">
        {/* Hero Section */}
        <div className="relative h-96 bg-gray-900">
          <Image
            src="/images/durable.avif"
            alt="Développement Durable"
            fill
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Notre Engagement Durable</h1>
              <p className="text-xl max-w-2xl mx-auto">
                Découvrez comment LUXE s&apos;engage pour un avenir plus responsable et durable
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Our Approach Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Notre Approche</h2>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/2">
                <p className="text-lg text-gray-600 mb-4">
                  Chez LUXE, nous croyons que le luxe et la durabilité peuvent et doivent coexister. Notre engagement envers le développement durable est au cœur de tout ce que nous faisons.
                </p>
                <p className="text-lg text-gray-600">
                  Nous nous efforçons de créer des produits qui non seulement répondent aux normes les plus élevées de qualité et de design, mais qui sont également fabriqués de manière responsable, en tenant compte de leur impact sur notre planète et ses habitants.
                </p>
              </div>
              <div className="w-full md:w-1/2">
                <Image
                  src="/images/durable1.avif"
                  alt="Approche durable"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>

          {/* Our Initiatives Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Nos Initiatives</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Matériaux Durables</h3>
                <p className="text-gray-600">
                  Nous utilisons des matériaux durables et éthiques, y compris des tissus biologiques, recyclés et innovants qui réduisent notre empreinte environnementale.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Production Responsable</h3>
                <p className="text-gray-600">
                  Nos ateliers respectent les normes les plus strictes en matière de conditions de travail, de sécurité et de rémunération équitable.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Empreinte Carbone</h3>
                <p className="text-gray-600">
                  Nous travaillons activement à réduire notre empreinte carbone à travers l&apos;optimisation de notre chaîne d&apos;approvisionnement et l&apos;utilisation d&apos;énergies renouvelables.
                </p>
              </div>
            </div>
          </div>

          {/* Our Goals Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Nos Objectifs 2030</h2>
            <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
              <div className="w-full md:w-1/2">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-600"><span className="font-bold">100% matériaux durables</span> - Utiliser uniquement des matériaux durables, recyclés ou biologiques dans toutes nos collections.</p>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-600"><span className="font-bold">Neutralité carbone</span> - Atteindre la neutralité carbone dans toutes nos opérations et notre chaîne d&apos;approvisionnement.</p>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-600"><span className="font-bold">Zéro déchet</span> - Éliminer tous les déchets de notre processus de production et adopter un modèle d&apos;économie circulaire.</p>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-600"><span className="font-bold">Impact social positif</span> - Améliorer les conditions de vie dans toutes les communautés où nous opérons.</p>
                  </li>
                </ul>
              </div>
              <div className="w-full md:w-1/2">
                <Image
                  src="/images/durable2.avif"
                  alt="Objectifs durables"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-green-50 p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Rejoignez-nous dans cette démarche</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              La durabilité est un voyage, pas une destination. Nous vous invitons à nous rejoindre dans notre engagement pour un avenir plus durable et responsable.
            </p>
            <button className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition-colors">
              En savoir plus sur nos initiatives
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DeveloppementDurablePage;
