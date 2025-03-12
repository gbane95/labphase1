'use client';
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Truck, Clock, Globe, CreditCard } from 'lucide-react';
import Image from 'next/image';

const LivraisonPage = () => {
  return (
    <>
      <Navbar />
      <div className="pt-16 bg-white">
        {/* Hero Section */}
        <div className="relative h-screem bg-gray-900">
          <Image
            src="/images/livraison.avif"
            alt="Livraison"
            width={600}
            height={400}
            className="w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-105 opacity-60"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Livraison</h1>
              <p className="text-xl max-w-2xl mx-auto">
                Découvrez nos options de livraison rapides et fiables
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Delivery Options */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Nos Options de Livraison</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm text-center">
                <Truck className="w-12 h-12 text-gray-900 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Livraison Standard</h3>
                <p className="text-gray-600">Livraison en 3-5 jours ouvrés</p>
                <p className="font-bold mt-2">Gratuit</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm text-center">
                <Clock className="w-12 h-12 text-gray-900 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Livraison Express</h3>
                <p className="text-gray-600">Livraison en 1-2 jours ouvrés</p>
                <p className="font-bold mt-2">1.200 Fcfa</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm text-center">
                <Globe className="w-12 h-12 text-gray-900 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Livraison Internationale</h3>
                <p className="text-gray-600">Livraison en 5-10 jours ouvrés</p>
                <p className="font-bold mt-2">À partir de 12.500 Fcfa</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm text-center">
                <CreditCard className="w-12 h-12 text-gray-900 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Click & Collect</h3>
                <p className="text-gray-600">Retrait en boutique sous 2h</p>
                <p className="font-bold mt-2">Gratuit</p>
              </div>
            </div>
          </div>

          {/* Delivery Process */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Notre Processus de Livraison</h2>
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-gray-900 rounded-full p-2 mr-4">
                  <span className="text-white font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Préparation de la commande</h3>
                  <p className="text-gray-600">Votre commande est soigneusement préparée et emballée dans notre entrepôt.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-gray-900 rounded-full p-2 mr-4">
                  <span className="text-white font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Expédition</h3>
                  <p className="text-gray-600">Votre colis est confié à notre partenaire de livraison pour l&apos;acheminement.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-gray-900 rounded-full p-2 mr-4">
                  <span className="text-white font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Suivi</h3>
                  <p className="text-gray-600">Vous recevez un email avec un numéro de suivi pour suivre votre colis en temps réel.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-gray-900 rounded-full p-2 mr-4">
                  <span className="text-white font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Livraison</h3>
                  <p className="text-gray-600">Votre colis est livré à l&apos;adresse indiquée ou disponible en boutique pour le retrait.</p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Questions Fréquentes sur la Livraison</h2>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Quels sont les délais de livraison ?</h3>
                <p className="text-gray-600">Les délais varient selon l&apos;option choisie : 3-5 jours pour la livraison standard, 1-2 jours pour l&apos;express, et 5-10 jours pour l&apos;international.</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Comment puis-je suivre ma commande ?</h3>
                <p className="text-gray-600">Vous recevrez un email avec un numéro de suivi dès que votre commande sera expédiée. Vous pourrez suivre votre colis en temps réel via notre page &quot;Suivi de commande&quot;.</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Que faire si je ne suis pas là pour réceptionner mon colis ?</h3>
                <p className="text-gray-600">Notre transporteur fera une seconde tentative de livraison. Si vous êtes à nouveau absent, le colis sera déposé dans un point relais proche de chez vous.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LivraisonPage;
