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
  status: 'en cours' | 'expédiée' | 'livrée' | 'annulée';
  total: number;
  items: OrderItem[];
}

interface UserInfo {
  id: string;
  name: string;
  email: string;
}

export default function CommandesUtilisateur() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Récupérer les informations utilisateur du localStorage
    const storedUserInfo = localStorage.getItem('usersInfos');
    
    if (storedUserInfo) {
      try {
        const parsedUserInfo = JSON.parse(storedUserInfo);
        setUserInfo(parsedUserInfo);
        
        setTimeout(() => {
          const mockOrders: Order[] = [
            {
              id: 'CMD-001',
              date: '2023-10-15',
              status: 'livrée',
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
              status: 'en cours',
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
      router.push('/connexion');
    }
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  return (
    <div>
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
              <p className="text-gray-500 mb-6">Vous n&apos;avez pas encore passé de commande.</p>
              <Link href="/" className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700">
                Découvrir nos produits
              </Link>
            </div>
          ) : (
            <div>
              {/* Le reste du code pour afficher les commandes */}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
