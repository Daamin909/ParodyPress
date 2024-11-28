import axios from "axios";
const backend = axios.create({ baseURL: "http://localhost:5000" });

export const getNews = async (search, intensity) => {
  const resp = await backend.post("/api/getnews", { search, intensity });
  return resp.data;
};
