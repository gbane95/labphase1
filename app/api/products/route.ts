import { database } from "@/db/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("Récupération des produits - Début");
    
    // Vérification de l'instance Firebase (si nécessaire)
    if (!database) {
      console.error("Firebase n'est pas correctement configuré.");
      return NextResponse.json({ error: "Problème de configuration de Firebase." }, { status: 500 });
    }

    console.log("Firebase database instance:", !!database);
    
    // Utiliser orderBy pour trier par date de création (du plus récent au plus ancien)
    const produitsQuery = query(collection(database, "produit"), orderBy("createdAt", "desc"));
    const snap = await getDocs(produitsQuery);

    console.log(`Nombre de produits trouvés: ${snap.size}`);

    if (!snap.empty) {
      // Mapping des documents récupérés pour créer un tableau de produits
      const products = snap.docs.map((doc) => {
        const docData = doc.data();
        
        // Vérification et formatage des données avant de les retourner
        const product = {
          id: doc.id,
          nomProduit: docData.nomProduit || "Sans nom",
          prix: docData.prix || 0,
          devise: docData.devise || "FCFA",
          qte: docData.qte || 0,
          lieu: docData.lieu || "",
          namestore: docData.namestore || "",
          descriptionProduit: docData.descriptionProduit || "",
          codeProduit: docData.codeProduit || "",  
          typeVente: docData.typeVente || "",
          date: docData.date || "",
          category: docData.category || "",
          collection: docData.collection || "",
          imageUrl: docData.photo || docData.imageUrl || "",
          tailles: docData.tailles || [],
          couleurs: docData.couleurs || [],
          // Si 'createdAt' est une instance Timestamp, on la convertit en Date ISO
          createdAt: docData.createdAt ? docData.createdAt.toDate().toISOString() : new Date().toISOString()
        };

        // Logs utiles pendant le développement
        if (process.env.NODE_ENV === "development") {
          console.log(`Produit récupéré - ID: ${doc.id}, Nom: ${product.nomProduit}, Image: ${product.imageUrl}`);
        }

        return product;
      });

      console.log("Récupération des produits - Succès");
      return NextResponse.json({ products });
    } else {
      console.log("Aucun produit trouvé dans la base de données");
      return NextResponse.json({ products: [] });
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    return NextResponse.json({ error: "Erreur lors de la récupération des produits" }, { status: 500 });
  }
};
