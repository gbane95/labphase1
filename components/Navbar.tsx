"use client"
import React, { useState, useRef, useEffect } from 'react';
import { ShoppingBag, Search, User, Menu, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import SearchModal from './SearchModal';
import Link from 'next/link';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { useRedirect } from '../context/RedirectContext';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { uniqueItemsCount } = useCart();
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { setRedirectUrl } = useRedirect();
  const router = useRouter();

  // Fermer le menu utilisateur en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // État des informations utilisateur
  const [userName, setUserName] = useState('');

  // Vérifiez si l'utilisateur est connecté et obtenez les informations sur l'utilisateur
  useEffect(() => {
    // Vérifiez si les informations utilisateur existent dans le stockage local
    const userInfo = localStorage.getItem('usersInfos');
    if (userInfo) {
      setIsLoggedIn(true);
      try {
        const userData = JSON.parse(userInfo);
        // Définir le nom d'utilisateur à partir de firstName si disponible, sinon utilisez l'e-mail
        setUserName(userData.firstName || userData.email || 'Utilisateur');
      } catch (error) {
        console.error('Error parsing user info:', error);
        setUserName('Utilisateur');
      }
    } else {
      setIsLoggedIn(false);
      setUserName('');
    }
  }, []);

  // Gérer le clic sur le lien des commandes
  const handleOrdersClick = () => {
    if (!isLoggedIn) {
      // Si l'utilisateur n'est pas connecté, définir l'URL de redirection et aller à la page de connexion
      setRedirectUrl('/commandes');
      setIsUserMenuOpen(false);
    }
  };

  return (
    <>
      <nav className="bg-white shadow-sm fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Mobile menu button */}
            <div className="flex items-center">
              <button
                className="sm:hidden p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="h-6 w-6" />
              </button>
              <Link href="/" className="text-2xl font-bold">LUXE</Link>
            </div>

            <div className="hidden sm:flex items-center space-x-8">
              <Link href="/femmes" className="text-gray-700 hover:text-gray-900">Femmes</Link>
              <Link href="/hommes" className="text-gray-700 hover:text-gray-900">Hommes</Link>
              <Link href="/enfants" className="text-gray-700 hover:text-gray-900">Enfants</Link>
              <Link href="/collections" className="text-gray-700 hover:text-gray-900">Collections</Link>
            </div>

            <div className="flex items-center space-x-4">
              <button
                className="p-2"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </button>
              <div className="relative" ref={userMenuRef}>
                <button
                  className="p-2 flex items-center"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <User className="h-5 w-5 mr-2" /> {/* Icône utilisateur */}
                  <span className="hidden sm:inline">{isLoggedIn ? userName : 'Se connecter'}</span>
                  {isUserMenuOpen ? (
                    <FaCaretUp className="ml-2 h-4 w-4" /> // Flèche vers le haut
                  ) : (
                    <FaCaretDown className="ml-2 h-4 w-4" /> // Flèche vers le bas
                  )}
                </button>

                {/* Menu déroulant de l'utilisateur */}
                {isUserMenuOpen && (
                  <div className="absolute left-0 mt-2 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200 overflow-hidden">
                  {isLoggedIn ? (
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        localStorage.removeItem('usersInfos');
                        setIsLoggedIn(false);
                        setIsUserMenuOpen(false);
                        router.push('/');
                      }}
                    >
                      Se déconnecter
                    </button>
                  ) : (
                    <Link
                      href="/connexion"
                      className="block p-2 mt-2 bg-gray-700 text-white rounded-lg hover:bg-gray-900 transition-colors duration-300 max-w-max ml-6"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Se connecter
                    </Link>
                  )}
                
                  {/* Barre de séparation après le lien Se connecter */}
                  <div className="px-4 py-1 border-b border-gray-200 mt-2"></div>
                
                  <Link 
                    href={isLoggedIn ? "/compte" : "/connexion"} 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      if (!isLoggedIn) {
                        setRedirectUrl('/compte');
                      }
                    }}
                  >
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Compte
                    </div>
                  </Link>
                
                  <Link
                    href={isLoggedIn ? "/commandes" : "/connexion"}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      handleOrdersClick();
                      setIsUserMenuOpen(false);
                    }}
                  >
                    <div className="flex items-center">
                      <Package className="h-4 w-4 mr-2" />
                      Vos commandes
                    </div>
                  </Link>
                </div>
                
                )}
              </div>
              <button className="p-2 relative">
                <Link href="/shopp" className="flex items-center space-x-1">
                  <ShoppingBag className="h-5 w-5" />
                  <span className="hidden sm:inline">Panier</span>
                </Link>
                {uniqueItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-black text-white rounded-full text-xs flex items-center justify-center">
                    {uniqueItemsCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`sm:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/femmes" className="block px-3 py-2 text-gray-700 hover:text-gray-900">Femmes</Link>
            <Link href="/hommes" className="block px-3 py-2 text-gray-700 hover:text-gray-900">Hommes</Link>
            <Link href="/enfants" className="block px-3 py-2 text-gray-700 hover:text-gray-900">Enfants</Link>
            <Link href="/collections" className="block px-3 py-2 text-gray-700 hover:text-gray-900">Collections</Link>
          </div>
        </div>
      </nav>

      {/* Search Modal */}
      {isSearchOpen && <SearchModal onClose={() => setIsSearchOpen(false)} />}
    </>
  );
};

export default Navbar;
