import { api } from "../../api/axios";

export const getProductItems = () => api.get("/products");
