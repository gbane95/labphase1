import { database } from "@/db/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Récupérer les paramètres d'URL
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const collectionName = searchParams.get('collection');

    // Initialiser la requête de base
    let produitsQuery = query(collection(database, "produit"));

    // Application des filtres si les paramètres existent
    if (category) {
      produitsQuery = query(produitsQuery, where("category", "==", category));
    }
    if (collectionName) {
      produitsQuery = query(produitsQuery, where("collection", "==", collectionName));
    }

    // Exécution de la requête pour récupérer les produits
    const snap = await getDocs(produitsQuery);

    // Si des produits sont trouvés
    if (!snap.empty) {
      const products = snap.docs.map((doc) => {
        const docData = doc.data();
        return {
          id: doc.id,
          nomProduit: docData.nomProduit,
          prix: docData.prix,
          devise: docData.devise,
          qte: docData.qte,
          lieu: docData.lieu,
          namestore: docData.namestore,
          descriptionProduit: docData.descriptionProduit,
          codeProduit: docData.codeProduit,  
          typeVente: docData.typeVente,
          date: docData.date,
          category: docData.category,
          collection: docData.collection,
          imageUrl: docData.photo || docData.imageUrl,
          tailles: docData.tailles || [],
          couleurs: docData.couleurs || [],
          createdAt: docData.createdAt ? docData.createdAt.toDate().toISOString() : new Date().toISOString(),
        };
      });

      return NextResponse.json({ products });
    } else {
      // Aucun produit trouvé
      return NextResponse.json({ products: [] });
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des produits" },
      { status: 500 }
    );
  }
};
