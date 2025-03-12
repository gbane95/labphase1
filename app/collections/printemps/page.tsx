'use client';
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import ProductGrid from '@/components/ProductGrid';
import ProductModal from '@/components/ProductModal';

// Define the Product type to match our product structure
type Product = {
  id: string | number;
  name: string;
  price: string;
  image: string;
};

const PrintempsPage = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  return (
    <>
      <Navbar />
      <div className="pt-16 bg-white">
        {/* Hero Section */}
        <div className="relative h-96 bg-gray-900">
          <Image
            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            alt="Collection Printemps"
            fill
            className="object-cover opacity-70"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Collection Printemps</h1>
              <p className="text-xl max-w-2xl mx-auto">
                Des pièces légères et colorées pour célébrer le renouveau de la saison
              </p>
            </div>
          </div>
        </div>

        {/* Collection Description */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Le Renouveau Printanier</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Notre collection printemps célèbre les couleurs vives, les motifs floraux et les tissus légers. Découvrez des pièces élégantes qui capturent l&apos;essence du renouveau saisonnier.</p>
          </div>

          {/* Products Grid - Now using Firestore data */}
          <ProductGrid collection="printemps" />

          {/* Season Features */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Couleurs Vibrantes</h3>
              <p className="text-gray-600">Des teintes pastel aux couleurs éclatantes pour illuminer votre garde-robe.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Motifs Floraux</h3>
              <p className="text-gray-600">Des imprimés inspirés de la nature en pleine floraison.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Tissus Légers</h3>
              <p className="text-gray-600">Des matières respirantes et confortables pour les journées ensoleillées.</p>
            </div>
          </div>

          {/* Back to Collections */}
          <div className="mt-16 text-center">
            <Link href="/collections" className="inline-block bg-gray-900 text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors duration-300">
              Retour aux collections
            </Link>
          </div>
        </div>
      </div>

      {/* Modal pour afficher les détails du produit */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
      
      <Footer />
    </>
  );
};

export default PrintempsPage;