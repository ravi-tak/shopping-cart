import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProductItems } from "./productsAPI";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export const getProductsAsync = createAsyncThunk("products/get/status", async () => {
  const res = await getProductItems();
  return res.data;
});

export const productsSlice = createSlice({
  name: "products",
  initialState,
  // reducers: {},
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export default productsSlice.reducer;
