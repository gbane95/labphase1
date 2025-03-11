'use client';

import '../css/Styles.css';
import { useState } from 'react';
import { ChevronLeft, Plus, Minus, Trash2 } from 'lucide-react';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

// Interface locale pour les types supplémentaires
interface ExtendedCartItem {
  brand?: string;
}

export default function Shopp() {
  const router = useRouter();
  const { cart, updateQuantity: updateCartQuantity, removeFromCart } = useCart();
  const [message, setMessage] = useState(""); // Message pour la soumission
  const [shippingCost] = useState(2); // Coût d'expédition en USD
  const [promoCode, setPromoCode] = useState(''); // Promo code

  // Taux de conversion USD -> CFA
  const USD_TO_CFA = 600;

  const isCFA = (price: string | number) => {
    return typeof price === 'string' && price.toUpperCase().includes('CFA');
  };

  const parsePrice = (price: string | number) => {
    if (typeof price === 'string') {
      // Remove all non-numeric characters except decimal point
      const numericPrice = price.replace(/[^0-9.]+/g, '');
      return parseFloat(numericPrice);
    }
    return typeof price === 'number' ? price : 0;
  };

  const convertToCFA = (amount: number, originalPrice: string | number) => {
    // If the original price is already in CFA, return the amount directly
    if (isCFA(originalPrice)) {
      return amount;
    }
    // Convert USD to CFA
    return Math.round(amount * USD_TO_CFA);
  };

  const subtotal = cart.reduce((sum, item) => {
    const price = parsePrice(item.price);
    return sum + (isCFA(item.price) ? price * item.quantity : convertToCFA(price * item.quantity, item.price));
  }, 0);

  const total = subtotal + convertToCFA(shippingCost, '');

  // Cette fonction est maintenant définie plus haut

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(""); // Réinitialisation du message

    const req = await fetch("/serveur/login", {
      headers: { "Content-type": "application/json" },
      method: "POST",
      body: JSON.stringify({ promoCode })
    });

    if (req.ok) {
      console.log("Commande envoyée !");
    } else {
      console.error("Erreur lors de la soumission");
    }

    const res = await req.json();
    // Vérification des champs requis
    if (res && res.data) {
      console.log(res.data);
      setMessage("Commande envoyée avec succès!");
      router.push("/dashboard"); // Redirection vers le dashboard
      return;
    } else {
      setMessage(res);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="md:flex">
              {/* Cart Items Section */}
              <div className="md:w-2/3 p-8">
                <div className="flex justify-between items-center mb-8">
                  <h1 className="text-2xl font-bold text-gray-900">Votre Panier</h1>
                  <span className="text-lg text-gray-600">{cart.length} Articles</span>
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">Votre panier est vide</p>
                    <Link href="/" className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-500">
                      <ChevronLeft className="w-5 h-5 mr-2" />
                      Continuez vos achats
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center p-6 bg-gray-50 rounded-lg">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <Image
                            width={96}
                            height={96}
                            className="h-full w-full object-cover"
                            src={item.image || '/images/featured1.avif'}
                            alt={item.name || 'Product image'}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.onerror = null;
                              target.src = '/images/featured1.avif';
                            }}
                          />
                        </div>

                        <div className="ml-6 flex-1">
                          <div className="flex justify-between">
                            <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                            <p className="text-lg font-medium text-gray-900">
                              {isCFA(item.price) ? 
                                `${(parsePrice(item.price) * item.quantity).toLocaleString()} CFA` : 
                                `${convertToCFA(parsePrice(item.price) * item.quantity, item.price).toLocaleString()} CFA`}
                            </p>
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center border rounded-md">
                              <button 
                                onClick={() => updateCartQuantity(item.id, Math.max(0, item.quantity - 1))}
                                className="p-2 hover:bg-gray-100"
                              >
                                <Minus className="w-4 h-4 text-gray-600" />
                              </button>
                              <span className="px-4 py-2 text-gray-900">{item.quantity}</span>
                              <button 
                                onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                className="p-2 hover:bg-gray-100"
                              >
                                <Plus className="w-4 h-4 text-gray-600" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-600 flex items-center"
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Supprimer
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    <Link href="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-500">
                      <ChevronLeft className="w-5 h-5 mr-2" />
                      Continuez vos achats
                    </Link>
                  </div>
                )}
              </div>

              {/* Order Summary Section */}
              <div className="md:w-1/3 bg-gray-50 p-8 border-l">
                <h2 className="text-lg font-medium text-gray-900 mb-6">Récapitulatif de la commande</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sous-total</span>
                    <span className="font-medium">{subtotal.toLocaleString()} CFA</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Frais de livraison</span>
                    <span className="font-medium">{convertToCFA(shippingCost, '').toLocaleString()} CFA</span>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex justify-between">
                      <span className="text-lg font-medium text-gray-900">Total</span>
                      <span className="text-lg font-bold text-gray-900">{total.toLocaleString()} CFA</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label htmlFor="promo" className="block text-sm font-medium text-gray-700 mb-2">Code promo</label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        id="promo"
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Entrez votre code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">
                        Appliquer
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="mt-6">
                    <button
                      type="submit"
                      className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                    >
                      Procéder au paiement
                    </button>
                  </form>

                  {message && (
                    <div className="mt-4 p-4 bg-green-50 rounded-md">
                      <p className="text-green-700 text-sm text-center">{message}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
