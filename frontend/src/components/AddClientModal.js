import React, { useState } from "react";

export default function AddClientModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    risk_tolerance: "low",
    goals: [],
    time_horizon: "",
    income: "",
    liabilities: "",
    tax_status: "resident",
  });

  const toggleGoal = (goal) => {
    setForm((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter((g) => g !== goal)
        : [...prev.goals, goal],
    }));
  };

  const handleSave = () => {
    onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">➕ Add New Client</h2>

        <input
          placeholder="Name"
          className="w-full border p-2 mb-2 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Age"
          type="number"
          className="w-full border p-2 mb-2 rounded"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
        />

        <select
          className="w-full border p-2 mb-2 rounded"
          value={form.risk_tolerance}
          onChange={(e) => setForm({ ...form, risk_tolerance: e.target.value })}
        >
          <option value="low">Low Risk</option>
          <option value="moderate">Moderate Risk</option>
          <option value="high">High Risk</option>
        </select>

        <label className="block font-semibold mb-1">Goals:</label>
        <div className="flex gap-4 mb-2">
          {["Retirement", "Education", "Wealth"].map((goal) => (
            <label key={goal} className="text-sm">
              <input
                type="checkbox"
                checked={form.goals.includes(goal)}
                onChange={() => toggleGoal(goal)}
              />{" "}
              {goal}
            </label>
          ))}
        </div>

        <input
          placeholder="Time Horizon (years)"
          className="w-full border p-2 mb-2 rounded"
          value={form.time_horizon}
          onChange={(e) => setForm({ ...form, time_horizon: e.target.value })}
        />
        <input
          placeholder="Income (₹)"
          className="w-full border p-2 mb-2 rounded"
          value={form.income}
          onChange={(e) => setForm({ ...form, income: e.target.value })}
        />
        <input
          placeholder="Liabilities (₹)"
          className="w-full border p-2 mb-2 rounded"
          value={form.liabilities}
          onChange={(e) => setForm({ ...form, liabilities: e.target.value })}
        />

        <select
          className="w-full border p-2 mb-4 rounded"
          value={form.tax_status}
          onChange={(e) => setForm({ ...form, tax_status: e.target.value })}
        >
          <option value="resident">Resident</option>
          <option value="nri">NRI</option>
        </select>

        <div className="flex justify-between">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded">
            Save Client ✅
          </button>
        </div>
      </div>
    </div>
  );
}
