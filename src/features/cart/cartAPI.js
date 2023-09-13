import { api } from "../../api/axios";

export const getCartItems = () => api.get("/cart");
export const addCartItem = (item) => api.post("/cart", item);
export const deleteCartItem = (id) => api.delete(`/cart/${id}`);
export const updateIncrementCartItem = (id,quantity) =>
  api.patch(`/cart/${id}`, { quantity });
export const updateDecrementCartItem = (id, quantity) =>
  api.patch(`/cart/${id}`, { quantity });
