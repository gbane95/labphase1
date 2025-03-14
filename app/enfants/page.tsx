'use client';
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';

const Enfants = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow pt-16">
        <ProductGrid 
          category="enfants" 
          title="Collection Enfants" 
        />
      </div>
      <Footer />
    </div>
  );
};

export default Enfants;
