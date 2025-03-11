import { database } from "@/db/firebase";
import { collection, getDocs, query, where, WhereFilterOp } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Get URL parameters
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const collectionName = searchParams.get('collection');

    // Base query
    let produitsQuery = query(collection(database, "produit"));
    
    // Add filters if parameters are provided
    const filters = [];
    if (category) {
      filters.push(where("category", "==", category));
    }
    if (collectionName) {
      filters.push(where("collection", "==", collectionName));
    }

    // Apply filters if any
    if (filters.length > 0) {
      produitsQuery = query(collection(database, "produit"), ...filters);
    }

    const snap = await getDocs(produitsQuery);

    if (!snap.empty) {
      // Mapping des documents récupérés pour créer un tableau de produits
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
          createdAt: docData.createdAt || new Date().toISOString()
        };
      });

      return NextResponse.json({ products });
    } else {
      return NextResponse.json({ products: [] });
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    return NextResponse.json({ error: "Erreur lors de la récupération des produits" }, { status: 500 });
  }
};