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

const AutomnePage = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  return (
    <>
      <Navbar />
      <div className="pt-16 bg-white">
        {/* Hero Section */}
        <div className="relative h-96 bg-gray-900">
          <Image
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            alt="Collection Automne"
            fill
            className="object-cover opacity-70"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Collection Automne</h1>
              <p className="text-xl max-w-2xl mx-auto">
                Des pièces élégantes et confortables pour la mi-saison
              </p>
            </div>
          </div>
        </div>

        {/* Collection Description */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">L'Élégance Automnale</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Notre collection automne propose des pièces confortables aux couleurs chaudes et aux matières douces.
              Découvrez des tenues élégantes parfaitement adaptées aux températures changeantes.
            </p>
          </div>

          {/* Products Grid - Now using Firestore data */}
          <ProductGrid collection="automne" />

          {/* Season Features */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Matières Nobles</h3>
              <p className="text-gray-600">Des tissus de qualité pour un confort optimal.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Tons Chaleureux</h3>
              <p className="text-gray-600">Une palette de couleurs inspirée de la nature automnale.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Style Versatile</h3>
              <p className="text-gray-600">Des pièces adaptables pour toutes les occasions.</p>
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

export default AutomnePage;