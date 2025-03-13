import { database } from "@/db/firebase";
import { addDoc, collection } from "firebase/firestore";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    //Valider les champs obligatoires
    if (!body.nomProduit || !body.prix) {
      return NextResponse.json(
        { error: 'Nom du produit et prix requis' },
        { status: 400 }
      );
    }
    
    // Optionnel : Validation des données (tu peux ajouter plus de vérifications ici)
    if (!body || Object.keys(body).length === 0) {
        return NextResponse.json({ error: "Données manquantes ou invalides" }, { status: 400 });
    }

    try {
        await addDoc(collection(database, "produit"), body);
        return NextResponse.json({ message: "Produit ajouté avec succès" }, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof Error) {
            return NextResponse.json({ 
                error: "Une erreur est survenue lors de l'ajout du produit", 
                details: error.message 
            }, { status: 500 });
        }
        return NextResponse.json({ 
            error: "Une erreur est survenue lors de l'ajout du produit"
        }, { status: 500 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ 
        error: "Une erreur est survenue lors du traitement de la requête",
        details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
};
