import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProductItems, getProductItemById } from "./productsAPI";

const initialState = {
  items: [],
  item: [],
  loading: false,
  error: null,
};

export const getProductsAsync = createAsyncThunk("products/get/status", async () => {
  const res = await getProductItems();
  return res.data;
});

export const getProductByIdAsync = createAsyncThunk("product-by-id/get/status", async (id) => {
  const res = await getProductItemById(id);
  return res.data;
});

export const productsSlice = createSlice({
  name: "products",
  initialState,
  // reducers: {},
  extraReducers: (builder) => {
    builder
      // Products
      .addCase(getProductsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getProductsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      // Product by id
      .addCase(getProductByIdAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductByIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.item = action.payload;
      })
      .addCase(getProductByIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
  },
});

export default productsSlice.reducer;
