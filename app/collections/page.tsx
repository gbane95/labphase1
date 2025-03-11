import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

const collections = [
  {
    id: 1,
    name: 'Collection Printemps',
    description: 'Des pièces légères et colorées pour le printemps',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: 2,
    name: 'Collection Été',
    description: 'Des tenues estivales pour les beaux jours',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: 3,
    name: 'Collection Automne',
    description: 'Des pièces confortables pour la mi-saison',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: 4,
    name: 'Collection Hiver',
    description: 'Des vêtements chauds et élégants',
    image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
];

const Collections = () => {
  return (
    <><Navbar /><div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Nos Collections</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((collection) => (
            <div key={collection.id} className="relative group overflow-hidden">
              <Image
                src={collection.image}
                alt={collection.name}
                width={500}
                height={400}
                className="w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h2 className="text-3xl font-bold mb-2">{collection.name}</h2>
                  <p className="text-lg mb-4">{collection.description}</p>
                  <Link href={`/collections/${collection.name.split(' ')[1].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`} className="bg-white text-gray-900 px-6 py-2 hover:bg-gray-100 transition-colors duration-300">
                    Découvrir
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div><Footer/></>
  );
};

export default Collections;