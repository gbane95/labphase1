"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const collections = [
  {
    name: 'Collection Femme',
    description: 'Nouvelle collection printemps-été 2025',
    image: '/images/hero1.avif',
    link: '/femmes'
  },
  {
    name: 'Collection Homme',
    description: 'Découvrez les tendances masculines',
    image: '/images/hero2.avif',
    link: '/hommes'
  },
  {
    name: 'Collection Enfants',
    description: 'Les dernières tendances de la saison',
    image: '/images/enfants.avif',
    link: '/enfants'
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Fonction pour passer à la slide suivante
  const nextSlide = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev === collections.length - 1 ? 0 : prev + 1));
      setTimeout(() => setIsAnimating(false), 500);
    }
  }, [isAnimating]);

  // Fonction pour revenir à la slide précédente
  const prevSlide = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev === 0 ? collections.length - 1 : prev - 1));
      setTimeout(() => setIsAnimating(false), 500);
    }
  }, [isAnimating]);

  // Changement automatique de slide toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative pt-16 h-screen max-h-[800px] overflow-hidden">
      <div 
        className="relative w-full h-full flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {collections.map((collection, _index) => (
          <div
            key={collection.name}
            className="w-full h-full flex-shrink-0"
            style={{ position: 'relative' }}
          >
            {/* Utilisation de Image de Next.js */}
            <Image
              src={collection.image}
              alt={collection.name}
              fill // Remplir l'élément parent
              sizes="100vw"
              style={{ objectFit: 'cover' }} // Couvrir toute la zone sans déformation
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h2 className="text-5xl font-bold mb-4 transform transition-all duration-700 translate-y-0 opacity-100">
                  {collection.name}
                </h2>
                <p className="text-xl mb-8 transform transition-all duration-700 delay-100 translate-y-0 opacity-100">
                  {collection.description}
                </p>
                <Link
                  href={collection.link}
                  className="inline-block bg-white text-gray-900 px-8 py-3 text-lg font-medium hover:bg-gray-100 transition-colors duration-300 transform transition-all duration-700 delay-200 translate-y-0 opacity-100"
                >
                  Découvrir
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Flèches de navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-900 p-2 rounded-full transition-all duration-200 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-900 p-2 rounded-full transition-all duration-200 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicateurs de slide */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
        {collections.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
