import { createSlice } from "@reduxjs/toolkit";
import {
  saveCartToSession,
  loadCartFromSession,
  clearCartSession,
} from "@/utils/cartUtils";

const initialState = {
  items: loadCartFromSession(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existing = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      saveCartToSession(state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCartToSession(state.items);
    },
    updateQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity = Math.max(1, item.quantity + action.payload.delta);
      }
      saveCartToSession(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      clearCartSession();
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
