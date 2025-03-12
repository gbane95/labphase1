'use client';
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const MentionsLegalesPage = () => {
  return (
    <>
      <Navbar />
      <div className="pt-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Mentions Légales</h1>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Informations légales</h2>
              <div className="prose prose-lg text-gray-600">
                <p>
                  LUXE est une société par actions simplifiée au capital de 1 000 000 Fcfa,
                  immatriculée au Registre du Commerce et des Sociétés de Paris sous le numéro 123 456 789.
                </p>
                <p className="mt-4">
                  Siège social : 123 Avenue de la Mode, 75008 Paris, France<br />
                  Numéro de TVA intracommunautaire : FR 12 345 678 901<br />
                  Numéro de téléphone : +33 1 23 45 67 89<br />
                  Email : contact@luxe.com
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Directeur de la publication</h2>
              <p className="text-gray-600">
                M. Jean Dupont, Président Directeur Général
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Hébergement</h2>
              <p className="text-gray-600">
                Le site www.luxe.com est hébergé par Amazon Web Services (AWS)<br />
                Amazon Web Services LLC<br />
                P.O. Box 81226<br />
                Seattle, WA 98108-1226<br />
                États-Unis
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Propriété intellectuelle</h2>
              <div className="prose prose-lg text-gray-600">
                <p>
                  L'ensemble des éléments figurant sur le site www.luxe.com (textes, logos, photos, vidéos) sont protégés
                  par les lois françaises et internationales relatives à la propriété intellectuelle. Ces éléments restent
                  la propriété exclusive de LUXE.
                </p>
                <p className="mt-4">
                  Toute reproduction totale ou partielle de ces éléments est strictement interdite sans autorisation
                  préalable écrite de LUXE.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Protection des données personnelles</h2>
              <div className="prose prose-lg text-gray-600">
                <p>
                  Conformément à la loi Informatique et Libertés du 6 janvier 1978 modifiée et au Règlement Général sur
                  la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, de suppression et
                  d'opposition aux données personnelles vous concernant.
                </p>
                <p className="mt-4">
                  Pour exercer ces droits, vous pouvez nous contacter à l'adresse suivante : privacy@luxe.com
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies</h2>
              <div className="prose prose-lg text-gray-600">
                <p>
                  Le site www.luxe.com utilise des cookies pour améliorer l'expérience utilisateur. En naviguant sur
                  notre site, vous acceptez l'utilisation de cookies conformément à notre politique de confidentialité.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Loi applicable et juridiction</h2>
              <div className="prose prose-lg text-gray-600">
                <p>
                  Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux
                  français seront seuls compétents.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Modification des mentions légales</h2>
              <div className="prose prose-lg text-gray-600">
                <p>
                  LUXE se réserve le droit de modifier les présentes mentions légales à tout moment. Les utilisateurs
                  du site sont donc invités à les consulter régulièrement.
                </p>
                <p className="mt-4">
                  Dernière mise à jour : 1er janvier 2024
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

export default MentionsLegalesPage;

// Les données collectées sont conservées pendant la durée nécessaire à l&apos;exécution des services souscrits
