import React, { useEffect, useState } from "react";
import ClientCard from "../components/ClientCard";
import AddClientModal from "../components/AddClientModal";
import { fetchClients, addClient } from "../services/api";

export default function Dashboard() {
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Load from MongoDB
  useEffect(() => {
    const loadClients = async () => {
      try {
        const data = await fetchClients();
        setClients(data);
      } catch (err) {
        console.error("Failed to load clients", err);
      }
    };
    loadClients();
  }, []);

  // Save new client to backend
  const handleAddClient = async (newClient) => {
    try {
      const saved = await addClient(newClient);
      setClients([...clients, saved]); // update local state
    } catch (err) {
      alert("Failed to add client");
    }
  };

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          🧑‍💼 Client Portfolio Dashboard
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
        >
          + Add New Client
        </button>
      </div>

      {/* Search Box */}
      <input
        type="text"
        placeholder="🔍 Search Clients by Name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 p-2 w-full border rounded shadow-sm"
      />

      {/* Client Cards */}
      <div className="space-y-4">
        {filteredClients.length > 0 ? (
          filteredClients.map((client) => (
            <ClientCard key={client._id} client={client} />
          ))
        ) : (
          <p className="text-gray-500 italic">No matching clients found.</p>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <AddClientModal
          onClose={() => setShowModal(false)}
          onSave={handleAddClient}
        />
      )}
    </div>
  );
}
