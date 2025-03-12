import { database } from "@/db/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const produitsQuery = query(collection(database, "produit"));
    const snap = await getDocs(produitsQuery);

    if (!snap.empty) {
      // Mapping des documents récupérés pour créer un tableau de produits
      const data = snap.docs.map((doc) => {
        const docData = doc.data();
        
        // Vérification de la présence des champs nécessaires
        if (!docData.nomProduit || !docData.prix) {
          // Si des données manquent, ignorer ce document
          return null;
        }

        return {
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
          imageUrl: docData.imageUrl,
          tailles: docData.tailles,
          couleurs: docData.couleurs,
          userId: docData.userId,
          userName: docData.userName,
          createdAt: docData.createdAt
        };
      }).filter((product) => product !== null); // Filtrer les produits invalides

      if (data.length > 0) {
        return NextResponse.json(data, { status: 200 });
      } else {
        return NextResponse.json({ message: "Pas de produit disponible." }, { status: 204 });
      }
    } else {
      return NextResponse.json({ message: "Aucun produit trouvé." }, { status: 404 });
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    return NextResponse.json({ error: "Erreur lors de la récupération des produits" }, { status: 500 });
  }
};
