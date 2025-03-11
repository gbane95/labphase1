"use client";

import { useState } from "react";
import { FaFilter, FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: "actif" | "inactif";
}

const clientsData: Client[] = [
  { id: 1, name: "Mamadou Diouf", email: "mamadou.diouf@example.com", phone: "+225 07 123 4567", status: "actif" },
  { id: 2, name: "Fatou Ndiaye", email: "fatou.ndiaye@example.com", phone: "+225 07 234 5678", status: "inactif" },
  { id: 3, name: "Ibrahime Sow", email: "ibrahime.sow@example.com", phone: "+225 07 345 6789", status: "actif" },
  { id: 4, name: "Aminata Cissé", email: "aminata.cisse@example.com", phone: "+225 07 456 7890", status: "inactif" },
  { id: 5, name: "Cheikh Fall", email: "cheikh.fall@example.com", phone: "+225 07 567 8901", status: "actif" },
];

const statusOptions = ["tout", "actif", "inactif"];

export default function Clients() {
  const [clients, setClients] = useState<Client[]>(clientsData);
  const [filterStatus, setFilterStatus] = useState<string>("tout");

  const handleStatusFilter = (status: string) => {
    setFilterStatus(status);
    if (status === "tout") {
      setClients(clientsData);
    } else {
      setClients(clientsData.filter((client) => client.status === status));
    }
  };

  const handleViewClient = (client: Client) => {
    alert(`Détails du client: ${client.name}\nEmail: ${client.email}\nTéléphone: ${client.phone}\nStatut: ${client.status}`);
  };

  const handleEditClient = (client: Client) => {
    const updatedName = prompt("Modifier le nom du client", client.name);
    if (updatedName) {
      const updatedClients = clients.map((c) =>
        c.id === client.id ? { ...c, name: updatedName } : c
      );
      setClients(updatedClients);
      alert(`Nom modifié en: ${updatedName}`);
    }
  };

  const handleDeleteClient = (client: Client) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le client ${client.name}?`)) {
      const filteredClients = clients.filter((c) => c.id !== client.id);
      setClients(filteredClients);
      alert(`Client ${client.name} supprimé.`);
    }
  };

  return (
    <div className="grid grid-cols-1 max-w-7xl mx-auto px-6 py-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-4 sm:mb-0">Gestion des Clients</h1>
        <div className="flex items-center space-x-3">
          <FaFilter className="text-gray-500" />
          <select
            value={filterStatus}
            onChange={(e) => handleStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 ease-in-out text-gray-600"
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option === "tout" ? "Tous les statuts" : option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Téléphone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {clients.map((client) => (
              <tr key={client.id} className="hover:bg-gray-50 transition-colors duration-200 ease-in-out">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{client.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                      client.status === "actif" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {client.status === "actif" ? "Actif" : "Inactif"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleViewClient(client)}
                    className="text-blue-600 hover:text-blue-900 mr-4 transition-all duration-300 ease-in-out transform hover:scale-105"
                  >
                    <FaEye className="inline mr-1" />
                    Voir
                  </button>
                  <button
                    onClick={() => handleEditClient(client)}
                    className="text-yellow-600 hover:text-yellow-900 mr-4 transition-all duration-300 ease-in-out transform hover:scale-105"
                  >
                    <FaEdit className="inline mr-1" />
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDeleteClient(client)}
                    className="text-red-600 hover:text-red-900 transition-all duration-300 ease-in-out transform hover:scale-105"
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
  );
}
