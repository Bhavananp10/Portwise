import { useNavigate } from "react-router-dom";

export default function ClientCard({ client }) {
  const navigate = useNavigate();

  return (
    <div className="border p-4 rounded shadow flex justify-between items-center">
      <div>
        <h2 className="text-lg font-semibold">👤 {client.name}</h2>
        <p className="text-gray-600">Portfolio Value: ₹{client.totalValue.toLocaleString()}</p>
      </div>
      <button
        onClick={() => navigate(`/client/${client.id}`)}
        className="text-blue-600 hover:underline text-sm"
      >
        View Portfolio 🔍
      </button>
    </div>
  );
}
