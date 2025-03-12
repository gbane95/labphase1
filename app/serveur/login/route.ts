import { auth, database } from "@/db/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { NextResponse } from "next/server"

export const POST = async (req: Request) => {
    const {email, password} = await req.json()
   try {
    const info = await signInWithEmailAndPassword(auth, email, password)
    const id = info.user.uid
    
    // Get the ID token for the user
    const idToken = await info.user.getIdToken()
    
    //Pour recupérer un seul document d'une collection
    const snap = await getDoc(doc(database, "users", id))
    if (snap.exists()) {
        const data = snap.data()
        
        // Create the response with the user data
        const response = NextResponse.json({data})
        
        // Set the session cookie with the ID token
        response.cookies.set({
            name: 'session',
            value: idToken,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600, // 1 hour
            path: '/'
        })
        
        return response
    } else {
        return NextResponse.json("Email ou mot passe non valide")
    }
   } catch (error) {
    console.log(error)
    return NextResponse.json("Une ereur s'est produite")
   }
}