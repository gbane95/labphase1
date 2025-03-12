import { database } from "@/db/firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const productDoc = doc(database, "produit", params.id);
    const productSnap = await getDoc(productDoc);

    if (productSnap.exists()) {
      const docData = productSnap.data();
      const product = {
        id: productSnap.id,
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

      return NextResponse.json({ product });
    } else {
      return NextResponse.json({ error: "Produit non trouvé" }, { status: 404 });
    }
  } catch (error) {
    console.error("Erreur lors de la récupération du produit :", error);
    return NextResponse.json({ error: "Erreur lors de la récupération du produit" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  try {
    const productDoc = doc(database, "produit", params.id);
    await deleteDoc(productDoc);
    
    return NextResponse.json({ success: true, message: "Produit supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du produit :", error);
    return NextResponse.json({ error: "Erreur lors de la suppression du produit" }, { status: 500 });
  }
}