import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getCartItems,
  addCartItem,
  deleteCartItem,
  updateIncrementCartItem,
  updateDecrementCartItem,
} from "./cartAPI";

const initialState = {
  cartItems: [],
  total: 0,
  loading: false,
  error: null,
  isOpen: false,
};

export const getCartAsync = createAsyncThunk("cart/get/status", async () => {
  const res = await getCartItems();
  return res.data;
});

export const addCartAsync = createAsyncThunk(
  "cart/add/status",
  async (item) => {
    const res = await addCartItem(item);
    return res.data;
  }
);

export const deleteCartAsync = createAsyncThunk(
  "cart/delete/status",
  async (id) => {
    await deleteCartItem(id);
    return id;
  }
);

export const incrementCartAsync = createAsyncThunk(
  "cart/increment/status",
  async ({ id, quantity }) => {
    const res = await updateIncrementCartItem(id, quantity);
    return res.data;
  }
);

export const decrementCartAsync = createAsyncThunk(
  "cart/decrement/status",
  async ({ id, quantity }) => {
    return !(quantity < 1)
      ? (await updateDecrementCartItem(id, quantity)).data
      : id;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    open: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
  extraReducers: (builder) => {
    builder
      // get
      .addCase(getCartAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
        let total = 0;
        action.payload.forEach((item) => (total += item.price * item.quantity));
        localStorage.setItem("total", total);
        state.total = total;
      })
      .addCase(getCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // add
      .addCase(addCartAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        const item = action.payload;
        state.cartItems.push(item);
        const total = localStorage.getItem("total")
          ? parseInt(localStorage.getItem("total")) + item.price * item.quantity
          : item.price * item.quantity;
        localStorage.setItem("total", total);
        state.total = total;
      })
      .addCase(addCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // delete
      .addCase(deleteCartAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.cartItems.findIndex(
          (item) => item.id === action.payload
        );
        const item = state.cartItems[index];
        const total =
          localStorage.getItem("total") - item.price * item.quantity;
        total === 0
          ? localStorage.removeItem("total")
          : localStorage.setItem("total", total);
        state.total = total;
        state.cartItems.splice(index, 1);
      })
      .addCase(deleteCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // increment
      .addCase(incrementCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.cartItems.findIndex(
          (item) => item.id === action.payload.id
        );
        const item = action.payload;
        const total = parseInt(localStorage.getItem("total")) + item.price;
        localStorage.setItem("total", total);
        state.cartItems.splice(index, 1, action.payload);
        state.total = total;
      })
      // dcrement
      .addCase(decrementCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        if (isNaN(action.payload)) {
          const index = state.cartItems.findIndex(
            (item) => item.id === action.payload.id
          );
          const item = state.cartItems[index];
          const total = localStorage.getItem("total") - item.price;
          localStorage.setItem("total", total);
          state.total = total;
          state.cartItems.splice(index, 1, action.payload);
        }
      });
  },
});

export const { open } = cartSlice.actions;
export default cartSlice.reducer;
