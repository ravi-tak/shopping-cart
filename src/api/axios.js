import axios from "axios";

const baseURL = "https://mock-api-sjbe.onrender.com";

export const api = axios.create({
  baseURL,
});
