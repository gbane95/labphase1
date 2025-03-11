'use client'
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';

const Hommes = () => {
  return (
    <>
      <Navbar/>
      <div className="pt-16">
        <ProductGrid 
          category="hommes" 
          title="Collection Hommes" 
        />
      </div>
      <Footer />
    </>
  );
};

export default Hommes;