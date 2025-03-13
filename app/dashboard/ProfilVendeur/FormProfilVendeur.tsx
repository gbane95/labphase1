"use client";
import React, { useRef } from 'react';
import { Button, Group, Card } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone'; // Removed MIME_TYPES import since it's unused
import { IconBrandTelegram, IconPhoto, IconUpload } from '@tabler/icons-react';

// Liste des pays
const countries = [
    { code: 'FR', name: 'France' },
    { code: 'US', name: 'United States' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'CI', name: 'Côte d\'Ivoire' },
    { code: 'CM', name: 'Cameroon' },
    { code: 'SN', name: 'Senegal' },
    { code: 'MA', name: 'Morocco' },
    { code: 'TN', name: 'Tunisia' },
    { code: 'DZ', name: 'Algeria' },
    { code: 'BJ', name: 'Benin' },
    { code: 'DE', name: 'Germany' },
    { code: 'IT', name: 'Italy' },
    { code: 'ES', name: 'Spain' },
];

function FormProfilVendeur() {
    const openRef = useRef<() => void>(null);

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Empêche le rechargement de la page
        alert('Profil mis à jour avec succès !'); // Exemple de feedback
        // Vous pouvez ajouter ici la logique pour envoyer les données du formulaire
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <form className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
                    {/* Section Biographie */}
                    <div className="lg:col-span-4">
                        <Card shadow="sm" padding="lg" radius="md" withBorder className="bg-white">
                            <h3 className="text-xl font-semibold mb-6 text-gray-800">Biographie</h3>
                            <Card.Section className="p-4">
                                <div className="space-y-6">
                                    <div>
                                        <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                                        <input type="text" id="nom" placeholder="Entrer votre nom" className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                    </div>
                                    <div>
                                        <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                                        <input type="text" id="prenom" placeholder="Entrer votre prénom" className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input type="email" id="email" placeholder="Entrer votre email" className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="col-span-1">
                                            <label htmlFor="indicatif" className="block text-sm font-medium text-gray-700 mb-1">Indicatif</label>
                                            <select id="indicatif" className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                                <option value="">Sélectionner</option>
                                                <option value="+33">+33 (France)</option>
                                                <option value="+1">+1 (USA)</option>
                                                <option value="+44">+44 (Royaume-Uni)</option>
                                                <option value="+225">+225 (Côte d'Ivoire)</option> {/* Correctly escaped quote */}
                                                <option value="+237">+237 (Cameroun)</option>
                                                <option value="+221">+221 (Sénégal)</option>
                                                <option value="+212">+212 (Maroc)</option>
                                                <option value="+216">+216 (Tunisie)</option>
                                                <option value="+213">+213 (Algérie)</option>
                                                <option value="+229">+229 (Bénin)</option>
                                                <option value="+49">+49 (Allemagne)</option>
                                                <option value="+39">+39 (Italie)</option>
                                                <option value="+34">+34 (Espagne)</option>
                                            </select>
                                        </div>
                                        <div className="col-span-2">
                                            <label htmlFor="tel" className="block text-sm font-medium text-gray-700 mb-1">Numéro de téléphone</label>
                                            <input type="tel" id="tel" placeholder="Entrer votre numéro" className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                        </div>
                                    </div>
                                </div>
                            </Card.Section>
                        </Card>
                    </div>

                    {/* Section Image */}
                    <div className="lg:col-span-3">
                        <Card shadow="sm" padding="lg" radius="md" withBorder className="bg-white h-full flex flex-col justify-center">
                            <h4 className="text-xl font-semibold mb-6 text-gray-800">Image</h4>
                            <Card.Section className="p-4">
                                <Dropzone openRef={openRef} onDrop={() => { }} radius="md" maxSize={30 * 1024 ** 2} className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                                    <Group justify="center" mt="md" className="flex flex-col items-center">
                                        <IconPhoto size={60} className="text-gray-400" />
                                        <Button variant="light" onClick={() => openRef.current?.()} className="mt-4 bg-blue-500 text-white hover:bg-blue-600 px-6 py-2 rounded-lg">
                                            Importer une image <IconUpload size={20} className="ml-2" />
                                        </Button>
                                    </Group>
                                </Dropzone>
                            </Card.Section>
                        </Card>
                    </div>
                </div>

                {/* Section Adresse */}
                <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 mt-8">
                    <div className="lg:col-span-4">
                        <Card shadow="sm" padding="lg" radius="md" withBorder className="bg-white">
                            <h3 className="text-xl font-semibold mb-6 text-gray-800">Information sur votre adresse</h3>
                            <Card.Section className="p-4">
                                <div className="space-y-6">
                                    <div>
                                        <label htmlFor="pays" className="block text-sm font-medium text-gray-700 mb-1">Pays</label>
                                        <select id="pays" className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                            <option value="">Sélectionner un pays</option>
                                            {countries.map((country) => (
                                                <option key={country.code} value={country.code}>
                                                    {country.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="adresse" className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                                        <input type="text" id="adresse" placeholder="Entrer votre adresse" className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                    </div>
                                    <div>
                                        <label htmlFor="ville" className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                                        <input type="text" id="ville" placeholder="Entrer votre ville" className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                    </div>
                                </div>
                            </Card.Section>
                        </Card>
                    </div>

                    {/* Section Description */}
                    <div className="lg:col-span-3">
                        <Card shadow="sm" padding="lg" radius="md" withBorder className="bg-white h-full flex flex-col justify-center">
                            <Card.Section className="p-4">
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Ajouter une description de vous</label>
                                    <textarea id="description" rows={4} placeholder="Décrivez-vous en quelques mots..." className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></textarea>
                                </div>
                            </Card.Section>
                        </Card>
                    </div>
                </div>

                {/* Bouton de soumission */}
                <div className="mt-8 text-center">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center mx-auto"
                    >
                        Modifier mon profil
                        <IconBrandTelegram size={24} className="ml-2" />
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FormProfilVendeur;
