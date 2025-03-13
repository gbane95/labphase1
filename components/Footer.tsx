import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">À propos</h3>
            <ul className="space-y-2">
              <li><a href="/notre-histoire" className="text-gray-400 hover:text-white">Notre histoire</a></li>
              <li><a href="/carrieres" className="text-gray-400 hover:text-white">Carrières</a></li>
              <li><a href="/developpement-durable" className="text-gray-400 hover:text-white">Développement durable</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Service client</h3>
            <ul className="space-y-2">
              <li><a href="/contact" className="text-gray-400 hover:text-white">Contact</a></li>
              <li><a href="/livraison" className="text-gray-400 hover:text-white">Livraison</a></li>
              <li><a href="/retours" className="text-gray-400 hover:text-white">Retours</a></li>
              <li><a href="/faq" className="text-gray-400 hover:text-white">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Légal</h3>
            <ul className="space-y-2">
              <li><a href="/mentions-legales" className="text-gray-400 hover:text-white">Mentions légales</a></li>
              <li><a href="/confidentialite" className="text-gray-400 hover:text-white">Confidentialité</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Suivez-nous</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
            <div className="mt-4">
              <h4 className="text-white text-sm font-medium mb-2">Newsletter</h4>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 px-4 py-2 text-gray-900"
                />
                <button
                  type="submit"
                  className="bg-white text-gray-900 px-4 py-2 ml-2 hover:bg-gray-100"
                >
                  S'inscrire
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-center">
            © 2025 LUXE. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
