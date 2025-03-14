'use client';

import { useEffect, useState } from 'react';
import { useCart, CartItem } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';

// Liste des pays
const countries = [
  "Côte d'Ivoire",
  "France",
  "Sénégal",
  "Mali",
  "Burkina Faso",
  "Ghana",
  "Togo",
  "Bénin",
  "Nigeria",
  "Cameroun",
];

export default function CheckoutPage() {
  const { cart } = useCart();
  const [sellerInfo, setSellerInfo] = useState({ whatsapp: '' });

  useEffect(() => {
    const fetchSellerInfo = async () => {
      try {
        const response = await fetch('/api/seller');
        if (!response.ok) throw new Error('Failed to fetch');
        setSellerInfo(await response.json());
      } catch (error) {
        console.error('Erreur récupération infos vendeur:', error);
        setSellerInfo({ whatsapp: '+22507070707' });
      }
    };

    fetchSellerInfo();
  }, []);

  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    city: '',
    postalCode: '',
    country: "Côte d'Ivoire",
  });

  const [billingInfo, setBillingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const shippingCost = 1200; // Frais de livraison fixes

  useEffect(() => {
    const newSubtotal = cart.reduce((acc, item) => acc + (Number(String(item.price).replace(/[^0-9.,]/g, '').replace(',', '.')) * item.quantity), 0);
    setSubtotal(newSubtotal);
    setTotal(newSubtotal + shippingCost);
  }, [cart]);

  const handleConfirmation = () => {
    const message = `Nouvelle commande!%0A%0AArticles:%0A${cart
      .map((item: CartItem) => `- ${item.quantity}x ${item.name}: ${Number(item.price).toLocaleString()} CFA`)
      .join('%0A')}%0A%0AInformations client:%0A${billingInfo.firstName} ${billingInfo.lastName}%0A${billingInfo.email}%0A${billingInfo.phone}%0A%0AAdresse de livraison:%0A${deliveryAddress.street}, ${deliveryAddress.postalCode} ${deliveryAddress.city}, ${deliveryAddress.country}%0A%0ATotal: ${total.toLocaleString()} CFA`;

    window.location.href = `https://wa.me/${sellerInfo.whatsapp}?text=${message}`;
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-10 md:py-20 lg:py-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow p-6 md:p-8">
            <Link href="/shopp" className="flex items-center text-gray-600 mb-6 md:mb-8">
              <ChevronLeft className="w-5 h-5 mr-2" />
              Retour au panier
            </Link>

            <h1 className="text-xl md:text-2xl font-bold mb-6 md:mb-8">Validation de commande</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Colonne de gauche */}
              <div className="col-span-1 lg:col-span-2 space-y-6 md:space-y-8">
                {/* Informations de facturation */}
                <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
                  <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">Informations de facturation</h2>
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                      <input
                        type="text"
                        value={billingInfo.firstName}
                        onChange={(e) => setBillingInfo({ ...billingInfo, firstName: e.target.value })}
                        className="w-full px-4 py-2 border rounded-button focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                        required
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                      <input
                        type="text"
                        value={billingInfo.lastName}
                        onChange={(e) => setBillingInfo({ ...billingInfo, lastName: e.target.value })}
                        className="w-full px-4 py-2 border rounded-button focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Adresse e-mail</label>
                      <input
                        type="email"
                        value={billingInfo.email}
                        onChange={(e) => setBillingInfo({ ...billingInfo, email: e.target.value })}
                        className="w-full px-4 py-2 border rounded-button focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de téléphone</label>
                      <input
                        type="tel"
                        value={billingInfo.phone}
                        onChange={(e) => setBillingInfo({ ...billingInfo, phone: e.target.value })}
                        className="w-full px-4 py-2 border rounded-button focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                        required
                      />
                    </div>
                  </form>
                </div>

                {/* Adresse de livraison */}
                <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
                  <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">Adresse de livraison</h2>
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Rue</label>
                      <input
                        type="text"
                        value={deliveryAddress.street}
                        onChange={(e) => setDeliveryAddress({ ...deliveryAddress, street: e.target.value })}
                        className="w-full px-4 py-2 border rounded-button focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                        required
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                      <input
                        type="text"
                        value={deliveryAddress.city}
                        onChange={(e) => setDeliveryAddress({ ...deliveryAddress, city: e.target.value })}
                        className="w-full px-4 py-2 border rounded-button focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                        required
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Code postal</label>
                      <input
                        type="text"
                        value={deliveryAddress.postalCode}
                        onChange={(e) => setDeliveryAddress({ ...deliveryAddress, postalCode: e.target.value })}
                        className="w-full px-4 py-2 border rounded-button focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pays</label>
                      <select
                        value={deliveryAddress.country}
                        onChange={(e) => setDeliveryAddress({ ...deliveryAddress, country: e.target.value })}
                        className="w-full px-4 py-2 border rounded-button focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                        required
                      >
                        {countries.map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                    </div>
                  </form>
                </div>
              </div>

              {/* Colonne de droite - Récapitulatif de la commande */}
              <div className="col-span-1">
                <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm lg:sticky lg:top-4">
                  <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">Récapitulatif de la commande</h2>
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between py-4 border-b">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg relative">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="object-cover rounded-lg"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-gray-500">Quantité: {item.quantity}</p>
                          </div>
                        </div>
                        <span className="font-medium">{item.price} CFA</span>
                      </div>
                    ))}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sous-total</span>
                        <span className="font-medium">{subtotal} CFA</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Frais de livraison</span>
                        <span className="font-medium">{shippingCost} CFA</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Taxe</span>
                        <span className="font-medium">0 CFA</span>
                      </div>
                    </div>
                    <div className="flex justify-between pt-4 border-t">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-lg font-semibold">{total} CFA</span>
                    </div>
                    <button
                      onClick={handleConfirmation}
                      className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                    >
                      Confirmer la commande
                    </button>
                  </div>
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