import React from 'react';
import Image from 'next/image';

const categories = [
  {
    name: 'Femmes',
    image: '/images/catfemmes.avif', // Ajout de l'extension .avif
  },
  {
    name: 'Hommes',
    image: '/images/cathommes.avif',
  },
  {
    name: 'Enfants',
    image: '/images/catenfants.avif',
  },
];

const Categories = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Catégories</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.name} className="relative group overflow-hidden">
            <Image
              src={category.image}
              alt={category.name}
              width={1000} // Largeur personnalisée
              height={600} // Hauteur personnalisée
              className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h3 className="text-2xl font-bold text-white">{category.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
