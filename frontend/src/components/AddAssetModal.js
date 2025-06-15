import React, { useState } from "react";

export default function AddAssetModal({ onClose, onSave }) {
  const [assetType, setAssetType] = useState("Mutual Fund");
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Saving asset:", assetType, formData);
    onSave({ type: assetType, ...formData });
    onClose();
  };

  const renderFields = () => {
    switch (assetType) {
      case "Mutual Fund":
        return (
          <>
            <label>Search Name:</label>
            <input
              name="name"
              placeholder="e.g., HDFC Flexi Cap Fund"
              className="p-2 border rounded w-full mb-2"
              onChange={handleChange}
            />

            <label>Investment Type:</label>
            <select
              name="investmentType"
              className="p-2 border rounded w-full mb-2"
              onChange={handleChange}
            >
              <option value="Lump Sum">Lump Sum</option>
              <option value="SIP">SIP</option>
            </select>

            {formData.investmentType === "SIP" ? (
              <>
                <label>SIP Amount:</label>
                <input
                  name="sipAmount"
                  type="number"
                  className="p-2 border rounded w-full mb-2"
                  onChange={handleChange}
                />
                <label>Start Date:</label>
                <input
                  name="startDate"
                  type="date"
                  className="p-2 border rounded w-full mb-2"
                  onChange={handleChange}
                />
                <label>Frequency:</label>
                <select
                  name="sipFrequency"
                  className="p-2 border rounded w-full mb-2"
                  onChange={handleChange}
                >
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </>
            ) : (
              <>
                <label>Units / Qty:</label>
                <input
                  name="quantity"
                  type="number"
                  className="p-2 border rounded w-full mb-2"
                  onChange={handleChange}
                />
                <label>Buy Price / NAV:</label>
                <input
                  name="buyPrice"
                  type="number"
                  className="p-2 border rounded w-full mb-2"
                  onChange={handleChange}
                />
              </>
            )}

            <label>
              <input type="checkbox" className="mr-2" /> Auto Price: ✅ Fetch Live Price
            </label>
          </>
        );

      case "Stock":
        return (
          <>
            <label>Search Name:</label>
            <input
              name="name"
              placeholder="e.g., Infosys Ltd"
              className="p-2 border rounded w-full mb-2"
              onChange={handleChange}
            />
            <label>Quantity:</label>
            <input
              name="quantity"
              type="number"
              className="p-2 border rounded w-full mb-2"
              onChange={handleChange}
            />
            <label>Buy Price:</label>
            <input
              name="buyPrice"
              type="number"
              className="p-2 border rounded w-full mb-2"
              onChange={handleChange}
            />
            <label>
              <input type="checkbox" className="mr-2" /> Auto Price: ✅ Fetch Live Price
            </label>
          </>
        );

      case "Insurance":
        return (
          <>
            <label>Policy Name:</label>
            <input
              name="name"
              className="p-2 border rounded w-full mb-2"
              onChange={handleChange}
            />
            <label>Insurer:</label>
            <input
              name="insurer"
              className="p-2 border rounded w-full mb-2"
              onChange={handleChange}
            />
            <label>Sum Assured:</label>
            <input
              name="sumAssured"
              type="number"
              className="p-2 border rounded w-full mb-2"
              onChange={handleChange}
            />
            <label>Premium:</label>
            <input
              name="premium"
              type="number"
              className="p-2 border rounded w-full mb-2"
              onChange={handleChange}
            />
            <label>Term (Years):</label>
            <input
              name="term"
              type="number"
              className="p-2 border rounded w-full mb-2"
              onChange={handleChange}
            />
          </>
        );

      case "Debt":
        return (
          <>
            <label>Instrument Name:</label>
            <input
              name="name"
              className="p-2 border rounded w-full mb-2"
              onChange={handleChange}
            />
            <label>Principal:</label>
            <input
              name="principal"
              type="number"
              className="p-2 border rounded w-full mb-2"
              onChange={handleChange}
            />
            <label>Interest Rate (%):</label>
            <input
              name="interestRate"
              type="number"
              className="p-2 border rounded w-full mb-2"
              onChange={handleChange}
            />
            <label>Start Date:</label>
            <input
              name="startDate"
              type="date"
              className="p-2 border rounded w-full mb-2"
              onChange={handleChange}
            />
            <label>Maturity Date:</label>
            <input
              name="maturityDate"
              type="date"
              className="p-2 border rounded w-full mb-2"
              onChange={handleChange}
            />
          </>
        );

      case "Cash":
        return (
          <>
            <label>Source:</label>
            <input
              name="source"
              placeholder="e.g., Savings Bank"
              className="p-2 border rounded w-full mb-2"
              onChange={handleChange}
            />
            <label>Amount:</label>
            <input
              name="amount"
              type="number"
              className="p-2 border rounded w-full mb-2"
              onChange={handleChange}
            />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">➕ Add {assetType}</h2>

        <label className="block mb-2">Asset Type:</label>
        <select
          value={assetType}
          onChange={(e) => setAssetType(e.target.value)}
          className="p-2 border rounded w-full mb-4"
        >
          <option>Mutual Fund</option>
          <option>Stock</option>
          <option>Insurance</option>
          <option>Debt</option>
          <option>Cash</option>
        </select>

        {renderFields()}

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add to Portfolio ✅
          </button>
        </div>
      </div>
    </div>
  );
}
