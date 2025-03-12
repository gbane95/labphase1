import { database } from "@/db/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const data = await req.json();
    console.log("Données reçues pour l'ajout du produit:", data);

    // Validation de données (exemple, selon ce que tu attends)
    if (!data.nomProduit || !data.prix) {
      return NextResponse.json(
        { success: false, message: "Le nom du produit et le prix sont requis." },
        { status: 400 }
      );
    }

    // Ajouter un timestamp pour le champ createdAt avec Firestore serverTimestamp()
    const productData = {
      ...data,
      createdAt: serverTimestamp(), // Utilisation de serverTimestamp() pour une meilleure gestion côté serveur
    };

    console.log("Données formatées pour l'ajout du produit:", productData);

    // Ajouter le produit à la collection Firestore "produit"
    const productCollection = await addDoc(collection(database, "produit"), productData);
    console.log("Produit ajouté avec succès, ID:", productCollection.id);

    // Retourner une réponse avec l'ID du produit ajouté
    return NextResponse.json(
      { success: true, data: productData, id: productCollection.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de la création d'un produit:", error);
    return NextResponse.json(
      { success: false, error: "Erreur lors de la création d'un produit" },
      { status: 500 }
    );
  }
};
