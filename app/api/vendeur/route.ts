import { auth, database } from "@/db/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { NextResponse } from "next/server"


export const POST = async ( req: Request) =>{
    const { firstName, lastName, email, gender, country, city, address, accountType, password} = await req.json()
    try {

        const userinfo = await createUserWithEmailAndPassword(auth, email, password)
        const uid = userinfo.user.uid
        console.log(uid)
        const data = { firstName, lastName, email, gender, country, city, address, accountType, password, createDate: new Date(), uid}
    await setDoc(doc(database,"users", uid ),data)
    console.log(data)
    return NextResponse.json({data})
    
    } catch (error) {
        console.log(error)
        return NextResponse.json("une erreur s'est produite")
    }
}