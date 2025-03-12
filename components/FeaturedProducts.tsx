'use client'
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import ProductModal from './ProductModal';
import Image from 'next/image';

type Product = {
  id: number;
  nomProduit: string;
  prix: number;
  devise: string;
  imageUrl: string;
  descriptionProduit?: string;
  category?: string;
  collection?: string;
  tailles?: string[];
  couleurs?: string[];
};

const products: Product[] = [
  {
    id: 1,
    nomProduit: 'Robe d\'été fleurie',
    prix: 10500,
    devise: 'FCFA',
    imageUrl: '/images/featured1.avif',
    tailles: ['S', 'M', 'L']
  },
  {
    id: 2,
    nomProduit: 'Blazer classique',
    prix: 13300,
    devise: 'FCFA',
    imageUrl: '/images/featured2.avif',
    tailles: ['M', 'L', 'XL']
  },
  {
    id: 3,
    nomProduit: 'Jean slim',
    prix: 8000,
    devise: 'FCFA',
    imageUrl: '/images/featured3.avif',
    tailles: ['S', 'M', 'L', 'XL']
  },
  {
    id: 4,
    nomProduit: 'Chemise en soie',
    prix: 15700,
    devise: 'FCFA',
    imageUrl: '/images/featured4.avif',
    tailles: ['S', 'M', 'L',]
  },
];

const FeaturedProducts = () => {
  useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);


  const handleAddToCart = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Produits Populaires</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="group">
            <div className="relative">
              <Image
                src={product.imageUrl}
                alt={product.nomProduit}
                width={500}
                height={600}
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300">
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-gray-900 px-6 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  Ajouter au panier
                </button>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900">{product.nomProduit}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">{product.prix} {product.devise}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <ProductModal
          product={{
            id: selectedProduct.id,
            name: selectedProduct.nomProduit,
            price: `${selectedProduct.prix} ${selectedProduct.devise}`,
            image: selectedProduct.imageUrl,
            description: selectedProduct.descriptionProduit,
            sizes: selectedProduct.tailles
          }}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default FeaturedProducts;
