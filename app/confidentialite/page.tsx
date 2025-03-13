'use client';
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ConfidentialitePage = () => {
  return (
    <>
      <Navbar />
      <div className="pt-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Politique de Confidentialité</h1>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
              <div className="prose prose-lg text-gray-600">
                <p>
                  Chez LUXE, nous accordons une grande importance à la protection de vos données personnelles. 
                  Cette politique de confidentialité vous explique comment nous collectons, utilisons, partageons 
                  et protégeons vos informations lorsque vous utilisez notre site web et nos services.
                </p>
                <p className="mt-4">
                  En utilisant notre site, vous acceptez les pratiques décrites dans la présente politique de confidentialité.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Données collectées</h2>
              <div className="prose prose-lg text-gray-600">
                <p>Nous pouvons collecter les types d'informations suivants :</p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>
                    <span className="font-medium">Informations personnelles</span> : nom, prénom, adresse email, 
                    numéro de téléphone, adresse postale, informations de paiement.
                  </li>
                  <li>
                    <span className="font-medium">Informations de compte</span> : identifiants de connexion, 
                    historique d'achats, préférences.
                  </li>
                  <li>
                    <span className="font-medium">Données de navigation</span> : adresse IP, type de navigateur, 
                    pages visitées, temps passé sur le site, cookies.
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Utilisation des données</h2>
              <div className="prose prose-lg text-gray-600">
                <p>Nous utilisons vos données personnelles pour :</p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Traiter vos commandes et gérer votre compte client</li>
                  <li>Vous fournir une assistance client personnalisée</li>
                  <li>Améliorer nos produits et services</li>
                  <li>Vous envoyer des communications marketing (avec votre consentement)</li>
                  <li>Prévenir la fraude et assurer la sécurité de notre site</li>
                  <li>Respecter nos obligations légales</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Partage des données</h2>
              <div className="prose prose-lg text-gray-600">
                <p>
                  Nous ne vendons pas vos données personnelles à des tiers. Nous pouvons partager vos informations avec :
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Nos prestataires de services (paiement, livraison, hébergement)</li>
                  <li>Nos partenaires commerciaux (avec votre consentement)</li>
                  <li>Les autorités légales si la loi l'exige</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies et technologies similaires</h2>
              <div className="prose prose-lg text-gray-600">
                <p>
                  Nous utilisons des cookies et technologies similaires pour améliorer votre expérience sur notre site, 
                  analyser le trafic et personnaliser le contenu. Vous pouvez gérer vos préférences concernant les cookies 
                  via les paramètres de votre navigateur.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Sécurité des données</h2>
              <div className="prose prose-lg text-gray-600">
                <p>
                  Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger 
                  vos données personnelles contre la perte, l'accès non autorisé, la divulgation ou la destruction.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Vos droits</h2>
              <div className="prose prose-lg text-gray-600">
                <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Droit d'accès à vos données personnelles</li>
                  <li>Droit de rectification des données inexactes</li>
                  <li>Droit à l'effacement, droit à l'oubli</li>
                  <li>Droit à la limitation du traitement</li>
                  <li>Droit à la portabilité des données</li>
                  <li>Droit d'opposition au traitement</li>
                  <li>Droit de retirer votre consentement à tout moment</li>
                </ul>
                <p className="mt-4">
                  Pour exercer ces droits, contactez-nous à l'adresse : privacy@luxe.com
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Conservation des données</h2>
              <div className="prose prose-lg text-gray-600">
                <p>
                  Nous conservons vos données personnelles aussi longtemps que nécessaire pour atteindre les finalités 
                  pour lesquelles elles ont été collectées, sauf si la loi exige ou permet une période de conservation plus longue.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Modifications de la politique</h2>
              <div className="prose prose-lg text-gray-600">
                <p>
                  Nous pouvons mettre à jour cette politique de confidentialité périodiquement. La version la plus récente 
                  sera toujours disponible sur notre site web avec la date de dernière mise à jour.
                </p>
                <p className="mt-4">
                  Dernière mise à jour : 1er janvier 2024
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
              <div className="prose prose-lg text-gray-600">
                <p>
                  Si vous avez des questions concernant cette politique de confidentialité ou nos pratiques en matière de 
                  protection des données, veuillez nous contacter :
                </p>
                <p className="mt-4">
                  Email : privacy@luxe.com<br />
                  Adresse : 123 Avenue de la Mode, 75008 Paris, France<br />
                  Téléphone : +33 1 23 45 67 89
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ConfidentialitePage;
