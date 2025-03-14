'use client';
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import Image from 'next/image';

const ContactPage = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<{ message: string; isError: boolean } | null>(null);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setFormStatus({ message: 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.', isError: false });
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    // In a real application, you would send the form data to your backend here
  };

  return (
    <>
      <Navbar />
      <div className="pt-16 bg-white">
        {/* Hero Section */}
        <div className="relative h-96 bg-gray-900">
          <Image
            src="/images/contact.avif"
            alt="Contactez-nous"
            fill
            className="object-cover opacity-70"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Contactez-nous</h1>
              <p className="text-xl max-w-2xl mx-auto">
                Nous sommes à votre écoute pour répondre à toutes vos questions
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Téléphone</h3>
              <p className="text-gray-600 mb-2">Du lundi au vendredi, 9h-18h</p>
              <a href="tel:+33123456789" className="text-blue-600 hover:underline">+225 07 87 19 42 96</a>
              <a href="tel:+33123456789" className="text-blue-600 hover:underline">+225 05 02 18 97 82</a>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600 mb-2">Nous répondons sous 24h</p>
              <a href="mailto:contact@luxe.com" className="text-blue-600 hover:underline">luxe@gmail.com</a>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Adresse</h3>
              <p className="text-gray-600 mb-2">Siège social</p>
              <address className="not-italic text-gray-600">
              rond point palmeraie
              <br />
                à coté de la BICICI, Abidjan
              </address>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Envoyez-nous un message</h2>
              
              {formStatus && (
                <div className={`p-4 mb-6 rounded-lg ${formStatus.isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                  {formStatus.message}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    aria-label="Nom complet"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    aria-label="Adresse email"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Sujet</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    aria-label="Sujet du message"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="question">Question générale</option>
                    <option value="commande">Question sur une commande</option>
                    <option value="retour">Retour produit</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    aria-label="Votre message"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="bg-gray-900 text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors"
                >
                  Envoyer le message
                </button>
              </form>
            </div>
            
            {/* Store Hours & Map */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Nos boutiques</h2>
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8">
                <div className="flex items-start mb-4">
                  <Clock className="w-5 h-5 text-gray-900 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Horaires d&lsquo;ouverture</h3>
                    <ul className="space-y-1 text-gray-600">
                      <li className="flex justify-between">
                        <span>Lundi - Vendredi:</span>
                        <span>10h00 - 19h30</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Samedi:</span>
                        <span>10h00 - 20h00</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Dimanche:</span>
                        <span>11h00 - 18h00</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg overflow-hidden shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7272.692343042345!2d-3.955470693101628!3d5.364701453277562!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1ed9845da8497%3A0xbc07e45f1baa4169!2sGOMYCODE%20Riviera!5e0!3m2!1sfr!2sci!4v1741001528169!5m2!1sfr!2sci"
                  width="100%"
                  height="320"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                  title="Nos boutiques"
                />
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Questions fréquentes</h2>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Quel est le délai de livraison ?</h3>
                <p className="text-gray-600">Nos délais de livraison varient entre 2 et 5 jours ouvrés pour la France métropolitaine. Pour les livraisons internationales, comptez entre 5 et 10 jours ouvrés.</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Comment puis-je suivre ma commande ?</h3>
                <p className="text-gray-600">
  Vous recevrez un email avec un numéro de suivi dès que votre commande sera expédiée. Vous pourrez suivre votre colis en temps réel via notre page &quot;Suivi de commande&quot;.
</p>

              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Quelle est votre politique de retour ?</h3>
                <p className="text-gray-600">Vous disposez de 30 jours à compter de la réception de votre commande pour effectuer un retour. Les articles doivent être dans leur état d&ldquo;origine, non portés et avec toutes les étiquettes.</p>
              </div>
            </div>
            <div className="text-center mt-8">
              <a href="/faq" className="text-blue-600 hover:underline">Voir toutes les questions fréquentes</a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;