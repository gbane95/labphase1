"use client";
import React, { useState, useEffect } from "react";

// Interface pour une commande
interface Commande {
  id: number;
  client: string;
  produit: string;
  montant: number;
  statut: string;
  date: string;
}

// Pagination & Filtrage
const Commandes = () => {
  const [commandes, setCommandes] = useState<Commande[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [filter, setFilter] = useState<string>("");

  // Simulation de récupération des commandes
  useEffect(() => {
    setTimeout(() => {
      const data = [
        { id: 1, client: "Jean Dupont", produit: "T-shirt Bleu", montant: 1200, statut: "En attente", date: "2025-02-26" },
        { id: 2, client: "Alice Martin", produit: "Jeans Noir", montant: 850, statut: "Livrée", date: "2025-02-25" },
        { id: 3, client: "Paul Lemoine", produit: "Sweat-shirt Gris", montant: 500, statut: "Expédiée", date: "2025-02-24" },
        { id: 4, client: "Emma Dubois", produit: "Veste en Cuir", montant: 2000, statut: "Livrée", date: "2025-02-23" },
        { id: 5, client: "Sophie Leclerc", produit: "Chaussures Blanc", montant: 950, statut: "En attente", date: "2025-02-22" },
        { id: 6, client: "Marc Lopez", produit: "T-shirt Blanc", montant: 600, statut: "Expédiée", date: "2025-02-21" },
      ];
      setCommandes(data);
      setLoading(false);
    }, 1500);
  }, []);

  // Fonction de filtrage des commandes
  const filteredCommandes = commandes.filter(cmd =>
    cmd.client.toLowerCase().includes(filter.toLowerCase()) ||
    cmd.produit.toLowerCase().includes(filter.toLowerCase())
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCommandes = filteredCommandes.slice(indexOfFirstItem, indexOfLastItem);

  // Changer la page de pagination
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Calcul du nombre de pages
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredCommandes.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container grid grid-cols-1 mx-auto p-6">
      {/* Filtrage des commandes */}
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <input
          type="text"
          className="border border-gray-300 rounded-lg p-3 w-full sm:w-1/2 lg:w-1/3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
          placeholder="Filtrer par client ou produit"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {/* Tableau des commandes */}
      <div className="bg-white shadow-lg rounded-lg p-6 overflow-x-auto">
        <h4 className="text-2xl font-semibold text-gray-800 mb-4">Commandes Passées</h4>

        {loading ? (
          <div className="flex justify-center items-center">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-solid border-gray-900 rounded-full"></div>
          </div>
        ) : (
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-2 py-3 text-left text-gray-700">ID</th>
                <th className="px-2 py-3 text-left text-gray-700">Client</th>
                <th className="px-2 py-3 text-left text-gray-700">Produit</th>
                <th className="px-2 py-3 text-left text-gray-700">Montant</th>
                <th className="px-2 py-3 text-left text-gray-700">Statut</th>
                <th className="px-2 py-3 text-left text-gray-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {currentCommandes.map((cmd) => (
                <tr key={cmd.id} className="border-b hover:bg-gray-100 transition duration-200 ease-in-out">
                  <td className="px-2 py-3 text-gray-800">{cmd.id}</td>
                  <td className="px-2 py-3 text-gray-800">{cmd.client}</td>
                  <td className="px-2 py-3 text-gray-800">{cmd.produit}</td>
                  <td className="px-2 py-3 text-gray-800">{cmd.montant} FCFA</td>
                  <td className="px-2 py-3 text-gray-800">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-sm font-semibold ${
                        cmd.statut === "En attente"
                          ? "bg-yellow-200 text-yellow-800"
                          : cmd.statut === "Expédiée"
                          ? "bg-blue-200 text-blue-800"
                          : "bg-green-200 text-green-800"
                      }`}
                    >
                      {cmd.statut}
                    </span>
                  </td>
                  <td className="px-2 py-3 text-gray-800">{cmd.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <ul className="flex gap-4 flex-wrap justify-center">
          {pageNumbers.map(number => (
            <li key={number}>
              <button
                onClick={() => paginate(number)}
                className={`px-4 py-2 border rounded-lg text-sm font-semibold ${currentPage === number ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-700'} transition duration-300 ease-in-out hover:bg-indigo-500 hover:text-white`}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Commandes;
