import axios from "axios";
const backend = axios.create({ baseURL: "https://parodypress.onrender.com" });

export const getNews = async (search, intensity) => {
  const resp = await backend.post("/api/getnews", { search, intensity });
  return resp.data;
};
