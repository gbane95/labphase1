'use client';
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';

const NotreHistoirePage = () => {
  return (
    <>
      <Navbar />
      <div className="pt-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Notre Histoire</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Depuis notre création, nous nous efforçons de redéfinir l'excellence dans la mode de luxe.
            </p>
          </div>

          {/* Timeline Section */}
          <div className="space-y-24">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2">
                <Image
                  src="/images/histoire1.avif"
                  alt="Fondation"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <h2 className="text-3xl font-bold text-gray-900">2010 - La Fondation</h2>
                <p className="text-gray-600">
                  LUXE a été fondée avec une vision claire : créer une marque de mode qui allie l'élégance intemporelle
                  à l'innovation contemporaine. Notre voyage a commencé dans un petit atelier à Paris.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="w-full md:w-1/2">
                <Image
                  src="/images/histoire2.avif"
                  alt="Expansion"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <h2 className="text-3xl font-bold text-gray-900">2015 - L'Expansion</h2>
                <p className="text-gray-600">
                  Après des années de croissance constante, nous avons étendu notre présence à l'international,
                  ouvrant des boutiques dans les principales capitales de la mode.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2">
                <Image
                  src="/images/histoire.avif"
                  alt="Innovation"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <h2 className="text-3xl font-bold text-gray-900">2020 - L'Innovation</h2>
                <p className="text-gray-600">
                  Aujourd'hui, LUXE est à l'avant-garde de l'innovation durable dans la mode de luxe,
                  combinant artisanat traditionnel et technologies modernes.
                </p>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mt-24">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Nos Valeurs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Excellence</h3>
                <p className="text-gray-600">Nous nous efforçons d'atteindre l'excellence dans chaque détail.</p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Innovation</h3>
                <p className="text-gray-600">Nous repoussons constamment les limites de la créativité.</p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Durabilité</h3>
                <p className="text-gray-600">Nous nous engageons pour un avenir plus durable.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotreHistoirePage;