import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export const fetchClients = async () => {
  const res = await axios.get(`${API_BASE}/clients`);
  return res.data;
};

export const addClient = async (data) => {
  const res = await axios.post(`${API_BASE}/clients`, data);
  return res.data;
};

export const fetchClientById = async (id) => {
  const res = await axios.get(`${API_BASE}/clients/${id}`);
  return res.data;
};
