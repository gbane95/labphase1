'use client';
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Package, RefreshCw, Clock, CheckCircle } from 'lucide-react';
import Image from 'next/image';

const RetoursPage = () => {
  return (
    <>
      <Navbar />
      <div className="pt-16 bg-white">
        {/* Hero Section */}
        <div className="relative h-96 bg-gray-900">
          <Image
            src="/images/retour.avif"
            alt="Politique de Retours"
            fill
            className="object-cover opacity-70"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Politique de Retours</h1>
              <p className="text-xl max-w-2xl mx-auto">
                Simple, rapide et sans tracas – Notre engagement pour votre satisfaction
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Return Policy Overview */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Notre Politique de Retours</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm text-center">
                <Package className="w-12 h-12 text-gray-900 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Retours Gratuits</h3>
                <p className="text-gray-600">Retours gratuits sous 30 jours</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm text-center">
                <RefreshCw className="w-12 h-12 text-gray-900 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Échange Simple</h3>
                <p className="text-gray-600">Échangez facilement pour une autre taille ou couleur</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm text-center">
                <Clock className="w-12 h-12 text-gray-900 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Remboursement Rapide</h3>
                <p className="text-gray-600">Remboursement sous 5-7 jours ouvrés</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm text-center">
                <CheckCircle className="w-12 h-12 text-gray-900 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Qualité Garantie</h3>
                <p className="text-gray-600">Satisfaction garantie sur tous nos produits</p>
              </div>
            </div>
          </div>

          {/* Return Process Steps */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Processus de Retour</h2>
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-gray-900 rounded-full p-2 mr-4">
                  <span className="text-white font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Initiez votre retour</h3>
                  <p className="text-gray-600">Connectez-vous à votre compte et sélectionnez les articles que vous souhaitez retourner dans la section "Mes commandes".</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-gray-900 rounded-full p-2 mr-4">
                  <span className="text-white font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Emballez vos articles</h3>
                  <p className="text-gray-600">Placez les articles dans leur emballage d'origine avec toutes les étiquettes attachées.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-gray-900 rounded-full p-2 mr-4">
                  <span className="text-white font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Expédiez le colis</h3>
                  <p className="text-gray-600">Utilisez l'étiquette de retour prépayée et déposez votre colis dans un point relais.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-gray-900 rounded-full p-2 mr-4">
                  <span className="text-white font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Suivez votre remboursement</h3>
                  <p className="text-gray-600">Une fois le retour reçu et validé, vous serez remboursé sous 5-7 jours ouvrés.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Return Conditions */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Conditions de Retour</h2>
            <div className="bg-gray-50 p-8 rounded-lg">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-2 flex-shrink-0" />
                  <p className="text-gray-600">Les articles doivent être retournés dans leur état d'origine, non portés et avec toutes les étiquettes attachées.</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-2 flex-shrink-0" />
                  <p className="text-gray-600">Les articles personnalisés ou sur mesure ne peuvent pas être retournés sauf en cas de défaut.</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-2 flex-shrink-0" />
                  <p className="text-gray-600">Les articles en solde peuvent être retournés dans les mêmes conditions que les articles à prix plein.</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-2 flex-shrink-0" />
                  <p className="text-gray-600">Pour des raisons d'hygiène, les sous-vêtements et maillots de bain ne peuvent pas être retournés.</p>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Besoin d'aide ?</h2>
            <p className="text-gray-600 mb-6">Notre service client est là pour vous aider avec vos retours.</p>
            <a href="/contact" className="bg-gray-900 text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors inline-block">
              Contactez-nous
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RetoursPage;
