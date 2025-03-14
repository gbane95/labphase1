'use client';
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";

const Femmes = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow pt-16">
        <ProductGrid 
          category="femmes" 
          title="Collection Femmes" 
        />
      </div>
      <Footer />
    </div>
  );
};

export default Femmes;
