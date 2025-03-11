"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, ShoppingBag, MessageSquare, CreditCard, BarChart2, Settings, ChevronLeft, ChevronRight, Package, UserCircle, LogOut } from 'lucide-react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  
  // Gestion de l'affichage sur mobile
  const [isMobileView, setIsMobileView] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Liste des liens de navigation
  const navLinks = [
    { href: '/dashboard/Home', label: 'Accueil', icon: Home },
    { href: '/dashboard/Clients', label: 'Clients', icon: Users },
    { href: '/dashboard/Commandes', label: 'Commandes', icon: ShoppingBag },
    { href: '/dashboard/Produits', label: 'Produits', icon: Package },
    { href: '/dashboard/Messages', label: 'Messages', icon: MessageSquare },
    { href: '/dashboard/Paiements', label: 'Paiements', icon: CreditCard },
    { href: '/dashboard/Statistiques', label: 'Statistiques', icon: BarChart2 },
    { href: '/dashboard/ProfilVendeur', label: 'Profil', icon: UserCircle },
    { href: '/dashboard/Parametre', label: 'Paramètres', icon: Settings },
  ];

  // Vérifier si un lien est actif
  const isLinkActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      {/* Bouton de menu mobile */}
      {isMobileView && (
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-lg shadow-lg md:hidden"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      )}
      
      {/* Overlay pour mobile */}
      {isMobileView && isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      <div 
        className={`fixed left-0 top-0 h-screen bg-gradient-to-t from-blue-900 to-purple-700 text-white transition-all duration-300 z-40
          ${isCollapsed ? 'w-20' : 'w-64'}
          ${isMobileView ? (isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
        `}
      >
        <div className="p-4 flex justify-between items-center border-b border-indigo-800">
          <h2 className={`font-bold text-xl text-yellow-400 ${isCollapsed ? 'hidden' : 'block'}`}>LUXE Admin</h2>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-indigo-700 hover:bg-opacity-50 transition-colors"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <nav className="mt-6 h-[calc(100vh-80px)] overflow-y-auto flex flex-col justify-between">
          <ul className="space-y-2 px-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href} 
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors
                    ${isLinkActive(link.href) 
                      ? 'bg-indigo-700 bg-opacity-70 text-white' 
                      : 'hover:bg-indigo-800 hover:bg-opacity-50 text-gray-200 hover:text-white'}
                  `}
                  onClick={() => isMobileView && setIsMobileMenuOpen(false)}
                >
                  <link.icon size={20} />
                  <span className={isCollapsed ? 'hidden' : 'block'}>{link.label}</span>
                  {isLinkActive(link.href) && isCollapsed && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-400 rounded-r-md"></span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
          <div className="px-4 mb-6">
            <Link
              href="/connexion"
              className="flex items-center space-x-3 p-3 rounded-lg transition-colors hover:bg-red-800 hover:bg-opacity-50 text-gray-200 hover:text-white"
              onClick={() => {
                if (isMobileView) setIsMobileMenuOpen(false);
                // Add any additional logout logic here
              }}
            >
              <LogOut size={20} />
              <span className={isCollapsed ? 'hidden' : 'block'}>Se déconnecter</span>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;