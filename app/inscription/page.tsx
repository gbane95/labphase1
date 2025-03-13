'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useRouter } from "next/navigation";

type Gender = 'homme' | 'femme' | 'autre';
type AccountType = 'client' | 'vendeur';

// Définir un type pour les erreurs
interface Errors {
    firstName?: string;
    lastName?: string;
    email?: string;
    country?: string;
    city?: string;
    address?: string;
    accountType?: string;
    password?: string;
}

export default function Home() {
    const [step, setStep] = useState(1);
    const redirecte = useRouter();

    // Variables d'état pour chaque champ
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState<Gender>('autre');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [accountType, setAccountType] = useState<AccountType>('client');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState("");

    // Variable d'état pour les erreurs
    const [errors, setErrors] = useState<Errors>({
        firstName: '',
        lastName: '',
        email: '',
        country: '',
        city: '',
        address: '',
        accountType: '',
        password: '',
    });

    const submitForm = async () => {
        setMessage(""); // Réinitialisation du message

        const req = await fetch("/serveur/sign-up", {
            headers: { "Content-type": "application/json" },
            method: "POST",
            body: JSON.stringify({ firstName, lastName, email, gender, country, city, address, accountType, password })
        });

        const res = await req.json();
        console.log(res.data);
        if (res && res.data) {
            console.log(res.data);
            setMessage("Utilisateur crée avec succès !");
            localStorage.setItem("user", JSON.stringify(res.data));
            if (res.data.accountType === "client") {
                setTimeout(() => {
                    redirecte.push("/");
                }, 2000);
            } else {
                setTimeout(() => {
                    redirecte.push("/dashboard");
                }, 2000);
            }
            return;
        } else {
            setMessage(res);
        }
    };

    const totalSteps = 4;

    const validateStep = () => {
        const newErrors: Errors = {}; // Remplacez `any` par `Errors`

        switch (step) {
            case 1:
                if (!firstName) newErrors.firstName = "Le prénom est obligatoire";
                if (!lastName) newErrors.lastName = "Le nom de famille est obligatoire";
                if (!email) newErrors.email = "L'email est obligatoire";
                else if (!/\S+@\S+\.\S+/.test(email))
                    newErrors.email = "Format d'email invalide";
                break;
            case 2:
                if (!country) newErrors.country = "Le pays est obligatoire";
                if (!city) newErrors.city = "La ville est obligatoire";
                if (!address) newErrors.address = "L'adresse est obligatoire";
                break;
            case 3:
                if (!accountType) newErrors.accountType = "Le type de compte est obligatoire";
                break;
            case 4:
                if (!password) newErrors.password = "Le mot de passe est obligatoire";
                else if (password.length < 8)
                    newErrors.password = "Le mot de passe doit contenir au moins 8 caractères";
                break;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep()) {
            if (step < totalSteps) {
                setStep(step + 1);
            } else {
                submitForm();
            }
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const inputClassName = (error?: string) =>
        `w-full px-4 py-2 rounded-lg border ${error ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`;

    const renderStep1 = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Prénom
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className={inputClassName(errors.firstName)}
                        placeholder="Votre prénom"
                        aria-label="Prénom"
                    />
                    {errors.firstName && <p className="text-sm text-red-500" role="alert">{errors.firstName}</p>}
                </div>

                <div className="space-y-2">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Nom de famille
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className={inputClassName(errors.lastName)}
                        placeholder="Votre nom de famille"
                        aria-label="Nom de famille"
                    />
                    {errors.lastName && <p className="text-sm text-red-500" role="alert">{errors.lastName}</p>}
                </div>
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Genre</label>
                <div className="flex space-x-4">
                    {(['homme', 'femme'] as const).map((genderOption) => (
                        <label key={genderOption} className="flex items-center space-x-2">
                            <input
                                type="radio"
                                id={`gender-${genderOption}`}
                                name="gender"
                                value={genderOption}
                                checked={gender === genderOption}
                                onChange={() => setGender(genderOption)}
                                className="text-blue-500 focus:ring-blue-500"
                                aria-label={`Genre ${genderOption}`}
                            />
                            <span className="text-sm text-gray-700 capitalize">{genderOption}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClassName(errors.email)}
                    placeholder="votre@email.com"
                    aria-label="Adresse email"
                />
                {errors.email && <p className="text-sm text-red-500" role="alert">{errors.email}</p>}
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-6">
            <div className="space-y-2">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Pays</label>
                <input
                    type="text"
                    id="country"
                    name="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className={inputClassName(errors.country)}
                    placeholder="Votre pays"
                    aria-label="Pays"
                />
                {errors.country && <p className="text-sm text-red-500" role="alert">{errors.country}</p>}
            </div>

            <div className="space-y-2">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">Ville</label>
                <input
                    type="text"
                    id="city"
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={inputClassName(errors.city)}
                    placeholder="Votre ville"
                    aria-label="Ville"
                />
                {errors.city && <p className="text-sm text-red-500" role="alert">{errors.city}</p>}
            </div>

            <div className="space-y-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Adresse</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className={inputClassName(errors.address)}
                    placeholder="Votre adresse"
                    aria-label="Adresse"
                />
                {errors.address && <p className="text-sm text-red-500" role="alert">{errors.address}</p>}
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="space-y-6">
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    Type de compte
                </label>
                <div className="space-y-4">
                    {(['client', 'vendeur'] as const).map((type) => (
                        <label key={type} className="flex items-center space-x-2">
                            <input
                                type="radio"
                                id={`accountType-${type}`}
                                name="accountType"
                                value={type}
                                checked={accountType === type}
                                onChange={(e) => setAccountType(e.target.value as AccountType)}
                                className="text-blue-500 focus:ring-blue-500"
                                aria-label={`Compte ${type}`}
                            />
                            <span className="text-sm text-gray-700 capitalize">
                                Compte {type}
                            </span>
                        </label>
                    ))}
                </div>
                {errors.accountType && <p className="text-sm text-red-500" role="alert">{errors.accountType}</p>}
            </div>
        </div>
    );
    
    const renderStep4 = () => (
        <div className="space-y-6">
            <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputClassName(errors.password)}
                    placeholder="Mot de passe"
                    aria-label="Mot de passe"
                />
                {errors.password && <p className="text-sm text-red-500" role="alert">{errors.password}</p>}
            </div>
        </div>
    );

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
            <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Créez votre compte
                    </h1>
                    <p className="text-gray-600 mb-4">
                        Étape {step} sur {totalSteps}
                    </p>

                    {/* Progress bar */}
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-500 transition-all duration-300"
                            style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
                        />
                    </div>
                </div>

                <div className="mb-8">
                    {step === 1 && renderStep1()}
                    {step === 2 && renderStep2()}
                    {step === 3 && renderStep3()}
                    {step === 4 && renderStep4()}
                </div>

                <div className="flex justify-between">
                    <button
                        onClick={handleBack}
                        className={`flex items-center px-4 py-2 rounded-lg transition-colors ${step === 1
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        disabled={step === 1}
                    >
                        <ChevronLeft className="w-5 h-5 mr-2" />
                        Retour
                    </button>

                    <button onClick={handleNext} className="flex items-center px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                        {(step === totalSteps ? (<>Soumettre <Check className="w-5 h-5 ml-2" />
                        </>
                        ) : (
                            <>Suivant
                                <ChevronRight className="w-5 h-5 ml-2" />
                            </>
                        ))}
                    </button>
                </div>
                <p className={`text-center text-xl font-semibold  p-4 mt-12  w-4/5 mx-auto
                 ${message.includes("succès") ? 'text-green-500' : 'text-red-500'}`}
                >
                    {message}
                </p>
            </div>
        </main>
    );
}
