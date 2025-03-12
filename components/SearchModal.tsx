"use client";
import React, { useState, useEffect } from 'react';
import { X, Search, ShoppingBag, Minus, Plus } from 'lucide-react';
import Image from 'next/image';
// Supprimer l'importation inutilisée de Link
// import Link from 'next/link'; 
// Si vous n'utilisez pas le router, supprimez cette ligne
// import { useRouter } from 'next/navigation'; 
import { useCart } from '../context/CartContext';

// Définition du type Product
type Product = {
  id: number;
  name: string;
  price: string;
  image: string;
  category?: string;
  description?: string;
};

// Données de produits pour la recherche (combinaison de tous les produits disponibles)
const allProducts: Product[] = [
  // Produits femmes
  {
    id: 1,
    name: "Robe d'été fleurie",
    price: "58 986 FCFA",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
    category: "femmes",
    description: "Une robe légère et élégante parfaite pour l'été."
  },
  {
    id: 2,
    name: "Ensemble tailleur",
    price: "131 192 FCFA",
    image: "https://images.unsplash.com/photo-1548624149-f9b1859aa7d0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
    category: "femmes",
    description: "Un ensemble tailleur chic et moderne."
  },
  {
    id: 3,
    name: "Blouse en soie",
    price: "52 436 FCFA",
    image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
    category: "femmes",
    description: "Une blouse élégante en soie."
  },
  // Produits hommes
  {
    id: 4,
    name: "Blazer classique",
    price: "85 300 FCFA",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80",
    category: "hommes",
    description: "Un blazer élégant pour toutes les occasions."
  },
  {
    id: 5,
    name: "Jean slim",
    price: "45 900 FCFA",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    category: "hommes",
    description: "Un jean slim confortable et tendance."
  },
  {
    id: 6,
    name: "Chemise en soie",
    price: "65 700 FCFA",
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=725&q=80",
    category: "hommes",
    description: "Une chemise élégante en soie pour les occasions spéciales."
  },
  // Produits enfants
  {
    id: 7,
    name: "Ensemble enfant",
    price: "35 000 FCFA",
    image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
    category: "enfants",
    description: "Un ensemble confortable pour les enfants."
  },
  {
    id: 8,
    name: "Robe enfant",
    price: "28 500 FCFA",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    category: "enfants",
    description: "Une jolie robe pour les occasions spéciales."
  }
];

type SearchModalProps = {
  onClose: () => void;
};

const SearchModal: React.FC<SearchModalProps> = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  // Supprimer l'utilisation du router si non utilisée
  // const router = useRouter();
  const { addToCart } = useCart();

  // Effectuer la recherche lorsque la requête change
  useEffect(() => {
    const performSearch = () => {
      setIsLoading(true);
      
      // Simuler un délai de recherche pour une meilleure UX
      setTimeout(() => {
        if (searchQuery.trim() === '') {
          setSearchResults(allProducts); // Afficher tous les produits quand la recherche est vide
        } else {
          const query = searchQuery.toLowerCase();
          // Amélioration de la recherche pour être plus flexible
          const queryWords = query.split(/\s+/).filter(word => word.length > 0);
          
          const results = allProducts.filter(product => {
            // Vérifier si au moins un mot de la recherche correspond à une partie du produit
            return queryWords.some(word => 
              product.name.toLowerCase().includes(word) || 
              (product.category && product.category.toLowerCase().includes(word)) ||
              (product.description && product.description.toLowerCase().includes(word))
            );
          });
          
          setSearchResults(results);
        }
        setIsLoading(false);
      }, 300);
    };

    performSearch();
  }, [searchQuery]);

  // État pour gérer le produit sélectionné pour le modal
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Gérer le clic sur un produit
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  // Ajouter au panier
  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation(); // Empêcher la propagation pour éviter la redirection
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
        <div className="bg-white rounded-lg w-full max-w-2xl mx-4 max-h-[80vh] flex flex-col">
          <div className="p-4 border-b flex items-center">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un produit..."
              className="flex-1 ml-3 outline-none text-lg"
              autoFocus
            />
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="p-4 overflow-y-auto flex-grow">
            {isLoading ? (
              <p className="text-gray-500 text-center">Recherche en cours...</p>
            ) : searchQuery.trim() === '' ? (
              <p className="text-gray-500 text-center">
                Commencez à taper pour rechercher des produits
              </p>
            ) : searchResults.length === 0 ? (
              <p className="text-gray-500 text-center">
                Aucun produit trouvé pour &quot;{searchQuery}&quot;
              </p>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-gray-500">{searchResults.length} produit(s) trouvé(s)</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {searchResults.map((product) => (
                    <div 
                      key={product.id} 
                      className="flex border rounded-lg overflow-hidden hover:shadow-md cursor-pointer transition-shadow"
                      onClick={() => handleProductClick(product)}
                    >
                      <div className="w-24 h-24 relative flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-3 flex-grow flex flex-col justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900 line-clamp-1">{product.name}</h3>
                          <p className="text-sm text-gray-500 capitalize">{product.category}</p>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm font-medium">{product.price}</span>
                          <button 
                            onClick={(e) => handleAddToCart(e, product)}
                            className="p-1.5 bg-black text-white rounded-full hover:bg-gray-800"
                          >
                            <ShoppingBag className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de détails du produit */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden relative">
            <button
              onClick={() => {
                setSelectedProduct(null);
                onClose();
              }}
              className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  width={500}
                  height={400}
                  className="w-full h-[500px] object-cover"
                />
              </div>
              
              <div className="p-6 flex flex-col">
                <h2 className="text-2xl font-bold mb-2">{selectedProduct.name}</h2>
                <p className="text-xl font-semibold mb-4">{selectedProduct.price}</p>
                <p className="text-gray-600 mb-6">
                  {selectedProduct.description || "Description du produit non disponible"}
                </p>
                
                <div className="flex items-center space-x-4 mb-6">
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
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                
                <button
                  onClick={() => {
                    addToCart({ ...selectedProduct, quantity });
                    setSelectedProduct(null);
                    onClose();
                  }}
                  className="flex items-center justify-center space-x-2 bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <ShoppingBag className="h-5 w-5" />
                  <span>Ajouter au panier</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchModal;
