"use client"

import GoogleLogin from "@/components/googleLogin"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useRedirect } from "@/context/RedirectContext"

export default function Login() {
  const router = useRouter();
  const { redirectUrl, setRedirectUrl } = useRedirect();

  // États pour les entrées et les messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Ajout du chargement

  // Fonction pour la soumission du formulaire
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(""); 
    setLoading(true); // Activer le chargement

    setTimeout(async () => {
      try {
        const req = await fetch("/serveur/login", {
          headers: { "Content-type": "application/json" },
          method: "POST",
          body: JSON.stringify({ email, password })
        });

        const res = await req.json();
        
        if (res && res.data) {
          console.log(res.data);
          localStorage.setItem('usersInfos', JSON.stringify(res.data));
          setMessage("Connexion réussie !");
          
          // Rediriger vers l'URL stockée ou la page d'accueil par défaut
          if (redirectUrl) {
            const redirectTo = redirectUrl;
            setRedirectUrl(null); // Réinitialiser l'URL de redirection
            router.push(redirectTo);
          } else {
            router.push("/"); // Redirection vers la page d'accueil par défaut
          }
        } else {
          console.log(res);
          setMessage("Utilisateur non trouvé, veuillez vous inscrire.");
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Erreur lors de la connexion", error.message);
        } else {
          console.error("Erreur lors de la connexion");
        }
        setMessage("Erreur lors de la connexion. Vérifiez vos identifiants.");
      } finally {
        setLoading(false); // Désactiver le chargement
      }
    }, 2000); // Simule un délai de 2 secondes
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20 p-4" id="images">
      <div className="w-full max-w-md backdrop-blur-sm border-2 shadow-lg rounded-lg p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold">Connexion</h1>
          <p className="text-lg">Connectez-vous pour continuer</p>
          {redirectUrl && (
            <p className="text-sm text-blue-600">Vous serez redirigé vers la page demandée après connexion</p>
          )}
        </div>

        {/* Formulaire */}
        <form onSubmit={submitForm} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              onChange={(e) => setEmail(e.target.value)} 
              id="email" 
              type="email" 
              placeholder="exemple@gmail.com" 
              required 
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input 
              onChange={(e) => setPassword(e.target.value)} 
              id="password" 
              type="password" 
              required 
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed" 
            disabled={loading}
          >
            {loading ? "Connexion en cours..." : "Se connecter"}
          </button>
        </form>

        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Ou continuez avec</span>
        </div>

        <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-100 transition-all">
          <svg className="w-5 h-5" viewBox="0 0 48 48">
            <path fill="#4285F4" d="M24 22v6h10.7c-.5 2.8-2 5.2-4.1 6.7v5.5h6.6c3.8-3.5 6-8.7 6-14.8 0-1.4-.1-2.8-.4-4H24z" />
            <path fill="#34A853" d="M11.8 28.1c-.6-1.4-1-3-1-4.6s.3-3.2 1-4.6V13H5.2c-1.6 3.2-2.5 6.7-2.5 10.5s.9 7.3 2.5 10.5l6.6-5.9z" />
            <path fill="#FBBC05" d="M24 9.5c3.6 0 6.6 1.2 9.1 3.5l6.7-6.7C35.9 2.4 30.5 0 24 0 14.8 0 6.8 5.5 2.7 13.5l6.6 5.9c1.7-5 6.6-9.9 14.7-9.9z" />
            <path fill="#EA4335" d="M24 46c6.5 0 11.9-2.1 16-5.7l-6.6-5.5c-2.5 1.8-5.6 3-9.3 3-8 0-13-5-14.7-9.8l-6.6 5.8C6.8 40.5 14.8 46 24 46z" />
          </svg>
          <GoogleLogin />
        </button>

        <div className="text-center text-sm">
          <p>Pas encore de compte ? <Link href="/inscription" className="text-blue-600 hover:underline">S'inscrire</Link></p>       
        </div>

        {message && (
          <div className={`text-center text-sm mt-4 ${message.includes("succès") ? "text-green-500" : "text-red-500"}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  )
}
