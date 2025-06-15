import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchClientById } from "../services/api";

export default function ClientInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadClient = async () => {
      try {
        const data = await fetchClientById(id);
        setClient(data);
      } catch (err) {
        alert("Failed to fetch client");
      } finally {
        setLoading(false);
      }
    };
    loadClient();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!client) return <p className="p-6">Client not found.</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-blue-600 hover:underline"
        >
          🔙 Back to Dashboard
        </button>
        <h1 className="text-xl font-semibold">{client.name}'s Portfolio</h1>
        <button className="text-gray-500">📝</button>
      </div>

      {/* Summary */}
      <div className="bg-gray-100 p-4 rounded mb-4">
        <p>👤 Age: {client.age} | Risk: {client.risk} | Goals: {client.goals?.join(", ")}</p>
        <p>💰 Income: ₹{client.income?.toLocaleString()} | Liabilities: ₹{client.liabilities?.toLocaleString()} | Tax: {client.taxStatus}</p>
      </div>

      {/* Dummy Portfolio (can be fetched later from another route) */}
      <div className="flex items-center justify-between bg-blue-100 p-4 rounded mb-4">
        <p>💸 Total Value: ₹{client.totalValue?.toLocaleString() || 0}</p>
        <p>📈 Gain: ₹{client.gain?.toLocaleString() || 0}</p>
        <p>✅ Risk match: YES</p>
      </div>

      {/* Tabs, Filters, etc. (can be kept static for now) */}
      <div className="flex gap-2 mb-4">
        {["All", "Stocks", "Mutual Funds", "Insurance", "Cash"].map((tab) => (
          <button key={tab} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm">
            {tab}
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="🔍 Filter by name or type"
        className="p-2 border rounded w-1/2 mb-3"
      />

      {/* Placeholder Assets Table */}
      <div className="border rounded p-3 bg-white shadow-sm">
        <div className="grid grid-cols-4 font-bold border-b pb-2">
          <span>Name</span>
          <span>Type</span>
          <span>Current Value</span>
          <span>Gain/Loss</span>
        </div>
        {/* You can loop through client's assets here later */}
        <div className="grid grid-cols-4 py-2 border-b">
          <span>Infosys Ltd</span>
          <span>Stock</span>
          <span>₹24,000</span>
          <span className="text-green-600">+₹3,000</span>
        </div>
      </div>
    </div>
  );
}
