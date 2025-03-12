import { database } from "@/db/firebase";
import { addDoc, collection } from "firebase/firestore";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    const data = await req.json();
    
    // Optionnel : Validation des données (tu peux ajouter plus de vérifications ici)
    if (!data || Object.keys(data).length === 0) {
        return NextResponse.json({ error: "Données manquantes ou invalides" }, { status: 400 });
    }

    try {
        await addDoc(collection(database, "produit"), data);
        return NextResponse.json({ message: "Produit ajouté avec succès" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Une erreur est survenue lors de l'ajout du produit", details: (error as any).message }, { status: 500 });
    }
};
