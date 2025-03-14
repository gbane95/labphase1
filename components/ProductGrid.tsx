'use client'; // Indique que ce code doit être exécuté dans le contexte client (pour Next.js)

import React, { useState, useEffect } from 'react'; // Importation des hooks de React pour gérer l'état et les effets
import Image from 'next/image'; // Importation du composant Image de Next.js pour un affichage optimisé des images
import ProductModal from './ProductModal'; // Importation du composant pour afficher les détails du produit dans une modal
import { useCart } from '../context/CartContext'; // Importation du hook personnalisé pour gérer le panier
import {
  QuerySnapshot,
  DocumentSnapshot,
  DocumentData,
  FirestoreError,
  collection as firestoreCollection,
  query,
  where,
  onSnapshot
} from 'firebase/firestore'; // Importation des fonctions Firestore nécessaires
import { database } from '@/db/firebase'; // Importation de la référence à la base de données Firebase

// Définition du type Product, représentant les données d'un produit
type Product = {
  id: string | number;
  nomProduit: string;
  prix: number;
  devise: string;
  imageUrl: string;
  descriptionProduit?: string;
  category?: string;
  collection?: string;
  tailles?: string[];
  couleurs?: string[];
};

// Définition des propriétés du composant ProductGrid
type ProductGridProps = {
  category?: string; // Filtre optionnel pour la catégorie des produits
  collection?: string; // Filtre optionnel pour la collection des produits
  title?: string; // Titre optionnel à afficher en haut de la grille
};

const ProductGrid: React.FC<ProductGridProps> = ({ category, collection, title }) => {
  const [products, setProducts] = useState<Product[]>([]); // État pour stocker les produits
  const [loading, setLoading] = useState(true); // État pour gérer le chargement des produits
  const [error, setError] = useState<string | null>(null); // État pour gérer les erreurs
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // État pour gérer le produit sélectionné (pour la modal)
  useCart(); // Récupération de la fonction pour ajouter au panier depuis le contexte

  useEffect(() => {
    setLoading(true); // On commence par afficher le chargement
    console.log('ProductGrid - Chargement des produits...');
    console.log('Filtres appliqués:', { category, collection });

    try {
      console.log('Connexion à la base de données Firebase:', database ? 'Réussie' : 'Échouée');

      // Création de la requête de base avec un tri par "createdAt"
      let productsQuery;

      try {
        // Tentative sans utiliser "orderBy" pour simplifier la requête
        const productsRef = firestoreCollection(database, "produit"); // Référence à la collection Firestore
        console.log('Référence de la collection créée avec succès');

        productsQuery = query(productsRef); // Initialisation de la requête pour obtenir les produits

        // Ajout des filtres si des paramètres sont fournis
        const filters = [];
        if (category) {
          console.log(`Ajout du filtre catégorie : ${category}`);
          // Ignorer la casse pour la catégorie (mettre en minuscules pour la comparaison)
          filters.push(where("category", "==", category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()));
        }
        if (collection) {
          console.log(`Ajout du filtre collection : ${collection}`);
          // Normalize collection name to handle accents and case sensitivity
          // Convert 'ete' to 'Été', 'printemps' to 'Printemps', etc.
          let normalizedCollection = collection.toLowerCase();

          // Handle special case for 'ete' -> 'Été'
          if (normalizedCollection === 'ete') {
            normalizedCollection = 'Été';
          } else {
            // For other collections, capitalize first letter
            normalizedCollection = collection.charAt(0).toUpperCase() + collection.slice(1).toLowerCase();
          }

          console.log(`Collection normalisée : ${normalizedCollection}`);
          filters.push(where("collection", "==", normalizedCollection));
        }

        // Appliquer les filtres si présents
        if (filters.length > 0) {
          console.log('Application des filtres à la requête');
          productsQuery = query(productsRef, ...filters);
        }
      } catch (err) {
        console.error('Erreur lors de la création de la requête :', err);
        setError('Erreur lors de la création de la requête dans la base de données');
        setLoading(false);
        return;
      }

      // Mise en place d'un écouteur en temps réel
      const unsubscribe = onSnapshot(productsQuery,
        (snapshot: QuerySnapshot<DocumentData>) => {
          console.log(`ProductGrid - ${snapshot.size} produits trouvés`);
          const productsList = snapshot.docs.map((doc: DocumentSnapshot<DocumentData>) => {
            const docData = doc.data() || {}; // Récupération des données du document
            const product = {
              id: doc.id,
              nomProduit: docData.nomProduit || '',
              prix: docData.prix || 0,
              devise: docData.devise || '',
              qte: docData.qte || 0,
              lieu: docData.lieu || '',
              namestore: docData.namestore || '',
              descriptionProduit: docData.descriptionProduit || '',
              codeProduit: docData.codeProduit || '',
              typeVente: docData.typeVente || '',
              date: docData.date || '',
              category: docData.category || '',
              collection: docData.collection || '',
              imageUrl: docData.photo || docData.imageUrl || '',
              tailles: docData.tailles || [],
              couleurs: docData.couleurs || [],
              createdAt: docData.createdAt || new Date().toISOString()
            };
            console.log(`Produit chargé - ID: ${doc.id}, Nom: ${product.nomProduit}, Image: ${product.imageUrl}`);
            return product;
          });

          setProducts(productsList); // Mise à jour de l'état avec la liste des produits
          setLoading(false); // Fin du chargement
        },
        (error: FirestoreError) => {
          console.error('Erreur lors de la récupération des produits :', error);
          setError('Impossible de charger les produits. Veuillez réessayer plus tard.');
          setLoading(false);
        }
      );

      // Nettoyage de l'écouteur lors du démontage du composant
      return () => unsubscribe();
    } catch (err) {
      console.error('Erreur de connexion à Firebase :', err);
      setError('Erreur de connexion à la base de données. Veuillez réessayer plus tard.');
      setLoading(false);
      return () => { };
    }
  }, [category, collection]); // Dépendances pour recharger les produits quand les filtres changent

  const handleProductClick = (product: Product) => {
    // Formatage du produit pour qu'il corresponde au format attendu par le modal de produit

    setSelectedProduct({
      id: product.id,
      nomProduit: product.nomProduit,
      prix: product.prix,
      devise: product.devise,
      imageUrl: product.imageUrl,
      descriptionProduit: product.descriptionProduit,
      tailles: product.tailles,
      couleurs: product.couleurs
    }); // Set the selected product maintaining the Product type structure
  };

  const handleAddToCart = (product: Product) => {
    // Au lieu d'ajouter directement au panier, on affiche d'abord le modal
    // pour permettre à l'utilisateur de sélectionner une taille

    setSelectedProduct({
      id: product.id,
      nomProduit: product.nomProduit,
      prix: product.prix,
      devise: product.devise,
      imageUrl: product.imageUrl,
      descriptionProduit: product.descriptionProduit,
      tailles: product.tailles,
      couleurs: product.couleurs
    }); // Set the selected product maintaining the Product type structure
  };

  // Gestion de l'affichage en fonction de l'état du chargement
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Affichage d'un message d'erreur si une erreur s'est produite
  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // Affichage si aucun produit n'a été trouvé
  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Aucun produit trouvé.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {title && <h1 className="text-4xl font-bold text-gray-900 mb-8">{title}</h1>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="group">
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src={product.imageUrl}
                alt={product.nomProduit}
                width={500}
                height={400}
                className="w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                onClick={() => handleProductClick(product)}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/placeholder.png';
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-white text-gray-900 px-6 py-2 rounded-md hover:bg-gray-100 transition-colors duration-300"
                >
                  Ajouter au panier
                </button>
              </div>
            </div>
            <div className="mt-4 p-4">
              <h3 className="text-lg font-medium text-gray-900">{product.nomProduit}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">{product.prix} {product.devise}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <ProductModal
          product={{
            id: selectedProduct.id,
            name: selectedProduct.nomProduit,
            price: `${selectedProduct.prix} ${selectedProduct.devise}`,
            image: selectedProduct.imageUrl,
            description: selectedProduct.descriptionProduit,
            sizes: selectedProduct.tailles,
            colors: selectedProduct.couleurs
          }} // Transform Product type to match expected props
          onClose={() => setSelectedProduct(null)} // Fermer la modal lorsqu'on clique sur le bouton de fermeture
        />
      )}
    </div>
  );
};

export default ProductGrid; // Exportation du composant ProductGrid
