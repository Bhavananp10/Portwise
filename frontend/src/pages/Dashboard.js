import React, { useState } from "react";
import ClientCard from "../components/ClientCard";
import AddClientModal from "../components/AddClientModal";

export default function Dashboard() {
  const [clients, setClients] = useState([
    { id: "1", name: "Ravi Sharma", totalValue: 49200 },
    { id: "2", name: "Anjali Mehta", totalValue: 37250 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddClient = (newClient) => {
    const id = Date.now().toString(); // temporary unique ID
    const totalValue = 0;
    setClients([...clients, { ...newClient, id, totalValue }]);
  };

  // Filter clients based on search query
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
            <ClientCard key={client.id} client={client} />
          ))
        ) : (
          <p className="text-gray-500 italic">No matching clients found.</p>
        )}
      </div>

      {/* Add Modal */}
      {showModal && (
        <AddClientModal
          onClose={() => setShowModal(false)}
          onSave={handleAddClient}
        />
      )}
    </div>
  );
}
