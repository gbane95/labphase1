"use client"
import React from 'react';
import { X, Heart, ShoppingBag, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import Image from 'next/image';

type Product = {
  id: string | number;
  name: string;
  price: string;
  image: string;
  description?: string;
  sizes?: string[];
  colors?: string[];
};

type ProductModalProps = {
  product: Product;
  onClose: () => void;
};

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addToCart, cart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  
  const cartItem = cart.find(item => item.id === product.id);
  const [quantity, setQuantity] = React.useState(cartItem?.quantity || 1);
  const [selectedSize, setSelectedSize] = React.useState<string>('');
  const [selectedColor, setSelectedColor] = React.useState<string>('');

  // Default sizes if not provided
  const availableSizes = product.sizes || ['S', 'M', 'L', 'XL'];
  
  // Default colors if not provided
  const availableColors = product.colors || ['Noir', 'Blanc', 'Bleu', 'Rouge'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-[95%] md:max-w-4xl w-full max-h-[95vh] md:max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="h-6 w-6" />
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative">
            <Image
              src={product.image}
              alt={product.name}
              width={500}
              height={400}
              className="w-full h-[40vh] md:h-[500px] object-cover"
            />
            <button
              onClick={() => toggleFavorite(product.id)}
              className={`absolute top-4 left-4 p-2 rounded-full ${
                isFavorite(product.id)
                  ? 'bg-red-500 text-white'
                  : 'bg-white text-gray-900'
              }`}
            >
              <Heart className="h-6 w-6" fill={isFavorite(product.id) ? "currentColor" : "none"} />
            </button>
          </div>
          
          <div className="p-4 md:p-6 flex flex-col">
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
            <p className="text-xl font-semibold mb-4">{product.price}</p>
            <p className="text-gray-600 mb-6">
              {product.description || "Description du produit non disponible"}
            </p>
            
            {/* Size Selector */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Sélectionnez une taille</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-4 text-sm font-medium rounded-md border ${selectedSize === size
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p className="text-sm text-red-500 mt-2">Veuillez sélectionner une taille</p>
              )}
            </div>
            {/* Color Selector */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Sélectionnez une couleur</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                {availableColors.map((color) => {
                  const colorMap: { [key: string]: string } = {
                    'Noir': '#000000',
                    'Blanc': '#FFFFFF',
                    'Bleu': '#2563EB',
                    'Rouge': '#DC2626',
                    'Vert': '#16A34A',
                    'Jaune': '#EAB308',
                    'Rose': '#EC4899',
                    'Gris': '#6B7280',
                    'Orange': '#F97316',
                    'Violet': '#8B5CF6',
                    'Marron': '#92400E',
                    'Beige': '#E5E5C3'
                  };
                  return (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className="flex flex-col items-center space-y-2 group"
                      aria-label={`Sélectionner la couleur ${color}`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full transition-transform group-hover:scale-110 ${color === 'Blanc' ? 'border border-gray-200' : ''} ${selectedColor === color ? 'ring-2 ring-offset-2 ring-black' : ''}`}
                        style={{ backgroundColor: colorMap[color] || '#CCCCCC' }}
                      />
                      <span className="text-sm text-gray-700">{color}</span>
                    </button>
                  );
                })}
              </div>
              {!selectedColor && (
                <p className="text-sm text-red-500 mt-2">Veuillez sélectionner une couleur</p>
              )}
            </div>
            
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
                if (selectedSize && selectedColor) {
                  addToCart({ ...product, quantity, size: selectedSize, color: selectedColor });
                  setTimeout(() => onClose(), 300);
                }
              }}
              className={`flex items-center justify-center space-x-2 py-2 md:py-3 px-4 md:px-6 rounded-lg transition-colors text-sm md:text-base ${(selectedSize && selectedColor)
                ? 'bg-black text-white hover:bg-gray-800'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!selectedSize || !selectedColor}
            >
              <ShoppingBag className="h-5 w-5" />
              <span>Ajouter au panier</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;