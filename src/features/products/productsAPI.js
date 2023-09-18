import { api } from "../../api/axios";

export const getProductItems = () => api.get("/products");
export const getProductItemById = (id) => api.get(`/products/${id}`);
