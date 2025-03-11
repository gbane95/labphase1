"use client";

import { useState } from "react";
import { FaCheckCircle, FaEye, FaTrashAlt, FaBell } from "react-icons/fa";

// Modèle de message
interface Message {
  id: number;
  sender: string;
  subject: string;
  body: string;
  date: string;
  read: boolean;
}

const messagesData: Message[] = [
  {
    id: 1,
    sender: "Kwame Nkrumah",
    subject: "Demande de renseignement sur votre plateforme",
    body: "Bonjour, je souhaite obtenir plus d'informations concernant vos services.",
    date: "25/02/2025",
    read: false,
  },
  {
    id: 2,
    sender: "Amina Boubacar",
    subject: "Problème de paiement",
    body: "J'ai rencontré un problème avec ma dernière transaction, pourriez-vous vérifier cela ?",
    date: "24/02/2025",
    read: true,
  },
  {
    id: 3,
    sender: "Niazi Kouadio",
    subject: "Demande de remboursement",
    body: "J'aimerais savoir comment procéder pour un remboursement suite à une erreur dans la commande.",
    date: "23/02/2025",
    read: false,
  },
  {
    id: 4,
    sender: "Mariam Diallo",
    subject: "Retour d'expérience positif",
    body: "Je suis ravie de la qualité de votre service, je vous recommande vivement !",
    date: "22/02/2025",
    read: true,
  },
];

const notificationsData = [
  { id: 1, content: "Votre paiement a été traité avec succès.", date: "25/02/2025", read: false },
  { id: 2, content: "Une nouvelle mise à jour est disponible.", date: "24/02/2025", read: true },
  { id: 3, content: "Vous avez un nouveau message non lu.", date: "23/02/2025", read: false },
  { id: 4, content: "Votre abonnement est sur le point d'expirer.", date: "22/02/2025", read: true },
];

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>(messagesData);
  const [notifications, setNotifications] = useState(notificationsData);

  // Fonction pour marquer un message comme lu
  const handleMarkAsRead = (id: number) => {
    const updatedMessages = messages.map((message) =>
      message.id === id ? { ...message, read: true } : message
    );
    setMessages(updatedMessages);
  };

  // Fonction pour supprimer un message
  const handleDeleteMessage = (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce message ?")) {
      const updatedMessages = messages.filter((message) => message.id !== id);
      setMessages(updatedMessages);
    }
  };

  // Fonction pour supprimer une notification
  const handleDeleteNotification = (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette notification ?")) {
      const updatedNotifications = notifications.filter(
        (notification) => notification.id !== id
      );
      setNotifications(updatedNotifications);
    }
  };

  return (
    <div className="grid grid-cols-1 max-w-7xl mx-auto px-6 py-4">
      {/* Section des Messages */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 sm:text-4xl">📩 Messages</h2>
        <div className="overflow-x-auto bg-white shadow-xl rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider">Expéditeur</th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider">Sujet</th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {messages.map((message) => (
                <tr
                  key={message.id}
                  className={`${
                    message.read ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-50 transition-all duration-300`}
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{message.sender}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{message.subject}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{message.date}</td>
                  <td className="px-6 py-4 text-sm font-medium flex space-x-4">
                    {/* Bouton pour marquer comme lu */}
                    <button
                      onClick={() => handleMarkAsRead(message.id)}
                      className={`${
                        message.read ? "text-gray-400" : "text-indigo-600 hover:text-indigo-900"
                      } transition-colors hover:scale-105`}
                      disabled={message.read}
                    >
                      <FaCheckCircle className="inline mr-1" />
                      Marquer comme lu
                    </button>
                    {/* Bouton pour supprimer le message */}
                    <button
                      onClick={() => handleDeleteMessage(message.id)}
                      className="text-red-600 hover:text-red-900 transition-colors hover:scale-105"
                    >
                      <FaTrashAlt className="inline mr-1" />
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section des Notifications */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6 sm:text-4xl">🔔 Notifications</h2>
        <div className="overflow-x-auto bg-white shadow-xl rounded-lg">
          <ul className="divide-y divide-gray-200">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className={`${
                  notification.read ? "bg-gray-100" : "bg-white"
                } p-4 flex justify-between items-center transition-all duration-300 hover:bg-gray-50`}
              >
                <span
                  className={`text-sm ${
                    notification.read ? "text-gray-500" : "text-gray-900"
                  }`}
                >
                  <FaBell className="inline mr-2" />
                  {notification.content}
                </span>
                {/* Bouton pour supprimer la notification */}
                <button
                  onClick={() => handleDeleteNotification(notification.id)}
                  className="text-red-600 hover:text-red-900 transition-colors hover:scale-105"
                >
                  <FaTrashAlt className="inline mr-1" />
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
