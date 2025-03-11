'use client';
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';

const Enfants = () => {
  return (
    <>
      <Navbar />
      <div className="pt-16">
        <ProductGrid 
          category="enfants" 
          title="Collection Enfants" 
        />
      </div>
      <Footer />
    </>
  );
};

export default Enfants;
