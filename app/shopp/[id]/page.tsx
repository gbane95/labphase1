'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import { Heart, ShoppingBag, Minus, Plus } from 'lucide-react';

interface Product {
  id: string;
  nomProduit: string;
  codeProduit: string;
  prix: number;
  devise: string;
  qte: number;
  typeVente: string;
  date: string;
  descriptionProduit: string;
  imageUrl: string;
  category: string;
  collection: string;
  createdAt: string;
  tailles: string[];
  couleurs: string[];
}

export default function ProductDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { addToCart, cart, updateQuantity } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`);
        if (!response.ok) {
          throw new Error('Produit non trouvé');
        }
        const data = await response.json();
        setProduct(data.product);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">{error || 'Produit non trouvé'}</h1>
        <button
          onClick={() => router.back()}
          className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-800"
        >
          Retour
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Veuillez sélectionner une taille');
      return;
    }
    addToCart({
      id: product.id,
      name: product.nomProduit,
      price: `${product.prix} ${product.devise}`,
      image: product.imageUrl,
      quantity,
      size: selectedSize
    });
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative">
            <Image
              src={product.imageUrl}
              alt={product.nomProduit}
              width={600}
              height={600}
              className="w-full h-auto object-cover rounded-lg"
            />
            <button
              onClick={() => toggleFavorite(product.id)}
              className={`absolute top-4 right-4 p-2 rounded-full ${isFavorite(product.id) ? 'bg-red-500 text-white' : 'bg-white text-gray-900'}`}
            >
              <Heart className="h-6 w-6" fill={isFavorite(product.id) ? "currentColor" : "none"} />
            </button>
          </div>

          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.nomProduit}</h1>
            <p className="text-2xl font-semibold">{product.prix} {product.devise}</p>
            <p className="text-gray-600">{product.descriptionProduit}</p>

            <div>
              <h3 className="text-lg font-medium mb-2">Taille</h3>
              <div className="grid grid-cols-4 gap-2">
                {product.tailles.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-4 text-sm font-medium rounded-md border ${selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-300 text-gray-900 hover:bg-gray-50'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="p-2 border rounded-full hover:bg-gray-100"
                disabled={quantity === 1}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="text-xl font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(prev => prev + 1)}
                className="p-2 border rounded-full hover:bg-gray-100"
                disabled={quantity >= product.qte}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-black text-white py-3 px-6 rounded-md hover:bg-gray-900 flex items-center justify-center space-x-2"
              disabled={product.qte === 0}
            >
              <ShoppingBag className="h-5 w-5" />
              <span>{product.qte === 0 ? 'Rupture de stock' : 'Ajouter au panier'}</span>
            </button>

            <div className="border-t pt-6 mt-6">
              <h3 className="text-lg font-medium mb-2">Détails du produit</h3>
              <dl className="space-y-2">
                <div className="flex">
                  <dt className="w-1/3 text-gray-500">Catégorie</dt>
                  <dd className="w-2/3">{product.category}</dd>
                </div>
                <div className="flex">
                  <dt className="w-1/3 text-gray-500">Collection</dt>
                  <dd className="w-2/3">{product.collection || 'Non spécifiée'}</dd>
                </div>
                <div className="flex">
                  <dt className="w-1/3 text-gray-500">Code produit</dt>
                  <dd className="w-2/3">{product.codeProduit}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}