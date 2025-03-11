
import { database } from "@/db/firebase"
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore"
import { NextResponse } from "next/server"

export const POST = async (req: Request) => {
    try {
        const data = await req.json()
        console.log("Données reçues pour l'ajout du produit:", data)
        
        // Ajouter un timestamp pour le champ createdAt s'il n'existe pas
        const productData = {
            ...data,
            createdAt: data.createdAt || new Date().toISOString()
        }
        
        console.log("Données formatées pour l'ajout du produit:", productData)
        
        const productCollection = await addDoc(collection(database, "produit"), productData)
        console.log("Produit ajouté avec succès, ID:", productCollection.id)
        
        if (productCollection) {
            return NextResponse.json({ success: true, data: productData, id: productCollection.id })
        } else {
            console.error("Échec de l'ajout du produit: aucun ID retourné")
            return NextResponse.json({ success: false, message: "Échec de l'ajout du produit" })
        }
    } catch (error) {
        console.error("Erreur lors de la création d'un produit:", error)
        return NextResponse.json({ success: false, error: "Erreur lors de la création d'un produit" }, { status: 500 })
    }
}