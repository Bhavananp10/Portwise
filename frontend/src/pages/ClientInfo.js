import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import AddAssetModal from "../components/AddAssetModal";

export default function ClientInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);

  const [assets, setAssets] = useState([
    { name: "Infosys Ltd", type: "Stock", value: 24000, gain: 3000 },
    { name: "HDFC MF", type: "Mutual Fund", value: 10200, gain: 1700 },
    { name: "Savings", type: "Cash", value: 15000, gain: 0 },
  ]);

  const dummyClient = {
    name: "Ravi Sharma",
    age: 42,
    risk: "Moderate",
    goals: ["Retirement", "Education"],
    income: 1500000,
    liabilities: 300000,
    taxStatus: "Resident",
    totalValue: 49200,
    gain: 4700,
    allocation: {
      equity: 65,
      debt: 20,
      cash: 15,
    },
  };

  const COLORS = ["#4f46e5", "#16a34a", "#facc15"];
  const pieData = [
    { name: "Equity", value: dummyClient.allocation.equity },
    { name: "Debt", value: dummyClient.allocation.debt },
    { name: "Cash", value: dummyClient.allocation.cash },
  ];

  const filteredAssets =
    activeTab === "All"
      ? assets
      : assets.filter((a) => a.type.toLowerCase() === activeTab.toLowerCase());

  const handleAddAsset = (newAsset) => {
    const value = parseFloat(
      newAsset.amount || newAsset.buyPrice * newAsset.quantity || 0
    );
    const gain = Math.floor(Math.random() * 3000); // Temporary random gain
    setAssets([...assets, { ...newAsset, value, gain }]);
  };

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
        <h1 className="text-xl font-semibold">{dummyClient.name}'s Portfolio</h1>
        <button className="text-gray-500">📝</button>
      </div>

      {/* Client Summary */}
      <div className="bg-gray-100 p-4 rounded mb-4 text-sm">
        <p>
          👤 Age: {dummyClient.age} | Risk: {dummyClient.risk} | Goals:{" "}
          {dummyClient.goals.join(", ")}
        </p>
        <p>
          💰 Income: ₹{dummyClient.income.toLocaleString()} | Liabilities: ₹
          {dummyClient.liabilities.toLocaleString()} | Tax:{" "}
          {dummyClient.taxStatus}
        </p>
      </div>

      {/* Portfolio Value + Pie */}
      <div className="bg-blue-50 p-4 rounded mb-6">
        <div className="flex justify-between mb-4">
          <p>💸 Total Value: ₹{dummyClient.totalValue.toLocaleString()}</p>
          <p>📈 Gain: ₹{dummyClient.gain.toLocaleString()} (+10.6%)</p>
          <p>✅ Risk match: YES</p>
        </div>
        <PieChart width={320} height={240}>
          <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80} label>
            {pieData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {["All", "Stock", "Mutual Fund", "Insurance", "Cash"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1 rounded text-sm ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search + Actions */}
      <div className="flex justify-between mb-2">
        <input
          type="text"
          placeholder="🔍 Filter by name or type"
          className="p-2 border rounded w-1/2"
        />
        <div className="flex gap-2">
          <button
            className="px-3 py-1 bg-green-600 text-white rounded"
            onClick={() => setShowAddModal(true)}
          >
            + Add Asset
          </button>
          <button
            className="px-3 py-1 bg-gray-600 text-white rounded"
            onClick={() => window.location.reload()}
          >
            🔁 Refresh
          </button>
        </div>
      </div>

      {/* Asset Table */}
      <div className="border rounded p-3 bg-white shadow-sm">
        <div className="grid grid-cols-4 font-bold border-b pb-2">
          <span>Name</span>
          <span>Type</span>
          <span>Current Value</span>
          <span>Gain/Loss</span>
        </div>
        {filteredAssets.map((asset, idx) => (
          <div key={idx} className="grid grid-cols-4 py-2 border-b text-sm">
            <span>{asset.name || asset.policy || asset.source}</span>
            <span>{asset.type}</span>
            <span>₹{asset.value?.toLocaleString()}</span>
            <span className="text-green-600">
              {asset.gain > 0 ? `+₹${asset.gain}` : "—"}
            </span>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showAddModal && (
        <AddAssetModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddAsset}
        />
      )}
    </div>
  );
}
