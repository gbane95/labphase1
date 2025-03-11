"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";

const Femmes = () => {
  return (
    <>
      <Navbar/>
      <div className="pt-16">
        <ProductGrid 
          category="femmes" 
          title="Collection Femmes" 
        />
      </div>
      <Footer />
    </>
  );
};

export default Femmes;
