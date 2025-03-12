'use client';
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import Image from 'next/image';

const FAQPage = () => {
  // State for search functionality
  const [searchQuery, setSearchQuery] = useState('');
  
  // State to track which FAQ items are expanded
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    // Default to first item in each category being open
    'commandes-1': true,
    'produits-1': true,
    'livraison-1': true,
    'retours-1': true,
  });

  // Toggle expanded state of an FAQ item
  const toggleItem = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // FAQ data organized by categories
  const faqData = [
    {
      category: 'Commandes',
      items: [
        {
          id: 'commandes-1',
          question: 'Comment passer une commande sur votre site ?',
          answer: 'Pour passer une commande, parcourez notre catalogue, sélectionnez les articles souhaités et ajoutez-les à votre panier. Accédez ensuite à votre panier, vérifiez votre commande et procédez au paiement en suivant les instructions.'
        },
        {
          id: 'commandes-2',
          question: 'Puis-je modifier ma commande après l&apos;avoir passée ?',
          answer: 'Vous pouvez modifier votre commande dans l&apos;heure qui suit sa validation. Contactez notre service client dès que possible. Au-delà de ce délai, nous ne pourrons peut-être pas garantir les modifications car la préparation de votre commande aura déjà commencé.'
        },
        {
          id: 'commandes-3',
          question: 'Quels modes de paiement acceptez-vous ?',
          answer: 'Nous acceptons les cartes de crédit (Visa, Mastercard, American Express), PayPal, et les virements bancaires pour les commandes importantes. Tous les paiements sont sécurisés et cryptés.'
        },
        {
          id: 'commandes-4',
          question: 'Ma commande est-elle sécurisée ?',
          answer: 'Oui, toutes les transactions sur notre site sont sécurisées. Nous utilisons un cryptage SSL pour protéger vos informations personnelles et de paiement.'
        },
      ]
    },
    {
      category: 'Produits',
      items: [
        {
          id: 'produits-1',
          question: 'Comment connaître ma taille ?',
          answer: 'Vous trouverez un guide des tailles détaillé sur chaque page produit. Vous pouvez également consulter notre guide général des tailles dans la section &quot;Guide des tailles&quot;. Si vous avez encore des doutes, n&apos;hésitez pas à contacter notre service client.'
        },
        {
          id: 'produits-2',
          question: 'Les couleurs des produits sont-elles fidèles aux photos ?',
          answer: 'Nous nous efforçons de présenter les couleurs de nos produits de la manière la plus précise possible. Cependant, les couleurs peuvent varier légèrement en fonction des paramètres de votre écran.'
        },
        {
          id: 'produits-3',
          question: 'Comment entretenir mes vêtements LUXE ?',
          answer: 'Chaque article est accompagné d&apos;instructions d&apos;entretien spécifiques. En général, nous recommandons un lavage délicat à basse température et un séchage à l&apos;air libre pour préserver la qualité et la durabilité de nos vêtements.'
        },
      ]
    },
    {
      category: 'Livraison',
      items: [
        {
          id: 'livraison-1',
          question: 'Quels sont les délais de livraison ?',
          answer: 'Les délais de livraison varient selon votre localisation : 2-3 jours ouvrés pour la France métropolitaine, 3-5 jours pour l&apos;Europe, et 5-10 jours pour le reste du monde. Ces délais sont indicatifs et peuvent varier en période de forte affluence.'
        },
        {
          id: 'livraison-2',
          question: 'La livraison est-elle gratuite ?',
          answer: 'La livraison standard est gratuite pour toutes les commandes supérieures à 100€. Pour les commandes inférieures à ce montant, des frais de livraison s&apos;appliquent en fonction de votre localisation.'
        },
        {
          id: 'livraison-3',
          question: 'Comment suivre ma commande ?',
          answer: 'Une fois votre commande expédiée, vous recevrez un email contenant un numéro de suivi. Vous pourrez utiliser ce numéro pour suivre votre colis en temps réel via notre page &quot;Suivi de commande&quot; ou directement sur le site du transporteur.'
        },
      ]
    },
    {
      category: 'Retours et Remboursements',
      items: [
        {
          id: 'retours-1',
          question: 'Quelle est votre politique de retour ?',
          answer: 'Vous disposez de 30 jours à compter de la réception de votre commande pour effectuer un retour. Les articles doivent être dans leur état d&apos;origine, non portés et avec toutes les étiquettes attachées. Pour plus de détails, consultez notre page &quot;Retours&quot;.'
        },
        {
          id: 'retours-2',
          question: 'Comment effectuer un retour ?',
          answer: 'Pour effectuer un retour, connectez-vous à votre compte, accédez à la section &quot;Mes commandes&quot;, sélectionnez la commande concernée et suivez les instructions pour générer une étiquette de retour. Emballez soigneusement les articles et déposez le colis dans un point relais.'
        },
        {
          id: 'retours-3',
          question: 'Quand serai-je remboursé ?',
          answer: 'Une fois votre retour reçu et validé par notre équipe, le remboursement sera effectué sous 5-7 jours ouvrés. Le délai peut varier en fonction de votre banque ou de votre mode de paiement initial.'
        },
        {
          id: 'retours-4',
          question: 'Puis-je échanger un article plutôt que de le retourner ?',
          answer: 'Oui, vous pouvez échanger un article pour une taille ou une couleur différente. Lors de votre demande de retour, sélectionnez l&apos;option &quot;Échange&quot; et précisez l&apos;article souhaité en remplacement.'
        },
      ]
    },
  ];

  // Filter FAQ items based on search query
  const filteredFaqData = searchQuery.trim() === '' 
    ? faqData 
    : faqData.map(category => ({
        ...category,
        items: category.items.filter(item => 
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.items.length > 0);

  return (
    <>
      <Navbar />
      <div className="pt-16 bg-white">
        {/* Hero Section */}
        <div className="relative h-screem bg-gray-900">
          <Image
            src="/images/faq.avif"
            alt="Questions Fréquentes"
            width={600}
            height={400}
            className="w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-105 opacity-60"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Questions Fréquentes</h1>
              <p className="text-xl max-w-2xl mx-auto">
                Trouvez rapidement des réponses à vos questions
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Search Bar */}
          <div className="mb-12">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                placeholder="Rechercher une question..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* FAQ Content */}
          {filteredFaqData.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 text-lg">Aucun résultat trouvé pour votre recherche.</p>
              <button 
                className="mt-4 text-gray-900 font-medium hover:underline"
                onClick={() => setSearchQuery('')}
              >
                Effacer la recherche
              </button>
            </div>
          ) : (
            filteredFaqData.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{category.category}</h2>
                <div className="space-y-4">
                  {category.items.map((item) => (
                    <div 
                      key={item.id} 
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <button
                        className="w-full flex justify-between items-center p-4 text-left focus:outline-none"
                        onClick={() => toggleItem(item.id)}
                      >
                        <h3 className="text-lg font-medium text-gray-900">{item.question}</h3>
                        {expandedItems[item.id] ? (
                          <ChevronUp className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                      {expandedItems[item.id] && (
                        <div className="p-4 pt-0 border-t border-gray-200 bg-gray-50">
                          <p className="text-gray-600">{item.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}

          {/* Contact Section */}
          <div className="mt-16 text-center bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Vous n&apos;avez pas trouvé votre réponse ?</h2>
            <p className="text-gray-600 mb-6">Notre équipe de service client est là pour vous aider.</p>
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

export default FAQPage;
