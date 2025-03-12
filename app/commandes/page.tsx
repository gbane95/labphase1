'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Package, Calendar, CreditCard, Clock, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { signOut } from 'firebase/auth'; // Import Firebase signOut
import { auth } from '@/db/firebase'; // Assurez-vous que vous avez configuré Firebase

interface OrderItem {
  id: string | number;
  name: string;
  price: string | number;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'En traitement' | 'Expédiée' | 'Livrée';
  items: OrderItem[];
  products?: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

export default function CommandesUtilisateur() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Récupérer les informations utilisateur du localStorage
    const storedUserInfo = localStorage.getItem('usersInfos');
    
    if (storedUserInfo) {
      try {
        const parsedUserInfo = JSON.parse(storedUserInfo);
        setUserInfo(parsedUserInfo);
        
        // Simuler la récupération des commandes depuis une API
        // Dans un cas réel, vous feriez un appel API avec l'ID de l'utilisateur
        setTimeout(() => {
          // Exemple de données de commandes
          const mockOrders: Order[] = [
            {
              id: 'CMD-001',
              date: '2023-10-15',
              status: 'Livrée',
              total: 85900,
              items: [
                {
                  id: 1,
                  name: "Robe d'été fleurie",
                  price: "58 986 FCFA",
                  image: "/images/featured1.avif",
                  quantity: 1,
                  size: 'M',
                  color: 'Bleu'
                }
              ]
            },
            {
              id: 'CMD-002',
              date: '2023-11-20',
              status: 'En traitement',
              total: 131192,
              items: [
                {
                  id: 2,
                  name: "Ensemble tailleur",
                  price: "131 192 FCFA",
                  image: "/images/featured2.avif",
                  quantity: 1,
                  size: 'L',
                  color: 'Noir'
                }
              ]
            }
          ];
          
          setOrders(mockOrders);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Erreur lors de la récupération des informations utilisateur:', error);
        setLoading(false);
      }
    } else {
      // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
      router.push('/connexion');
    }
  }, [router]);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'En traitement': return 'bg-blue-100 text-blue-800';
      case 'Expédiée': return 'bg-yellow-100 text-yellow-800';
      case 'Livrée': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusStyle = getStatusColor;

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const handleLogout = async () => {
    try {
      // Déconnexion avec Firebase
      await signOut(auth);

      // Rediriger vers la page d'accueil après la déconnexion
      router.push('/');
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Vous n'êtes pas connecté</h1>
          <button 
            onClick={() => router.push('/connexion')}
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800"
          >
            Se connecter
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Mes commandes</h1>
            <Link href="/compte" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
              Retour à mon compte
            </Link>
          </div>

          {orders.length === 0 ? (
            <div className="bg-white shadow rounded-lg p-8 text-center">
              <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h2 className="text-xl font-medium text-gray-900 mb-2">Aucune commande</h2>
              <p className="text-gray-500 mb-6">Vous n'avez pas encore passé de commande.</p>
              <Link href="/" className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700">
                Découvrir nos produits
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h3 className="text-lg font-semibold">Commande #{order.id}</h3>
                      <p className="text-gray-600">{new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="px-6 py-4">
                    {order.items.map((item) => (
                      <div key={`${order.id}-${item.id}`} className="flex items-center py-4 border-b border-gray-100 last:border-0">
                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="text-base font-medium text-gray-900">{item.name}</h3>
                          <div className="flex items-center mt-1 text-sm text-gray-500">
                            <span>Qté: {item.quantity}</span>
                            {item.size && <span className="mx-2">|</span>}
                            {item.size && <span>Taille: {item.size}</span>}
                            {item.color && <span className="mx-2">|</span>}
                            {item.color && <span>Couleur: {item.color}</span>}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{typeof item.price === 'string' ? item.price : `${item.price.toLocaleString()} FCFA`}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="px-6 py-4 bg-gray-50 flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {order.status === 'Livrée' ? 'Livrée le' : 'Estimée pour le'} {formatDate(order.date)}
                    </div>
                    <Link 
                      href={`/commandes/${order.id}`}
                      className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800"
                    >
                      Détails <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
