import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/lib/slices/cartSlice";
import themeReducer from "@/lib/slices/themeSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      theme: themeReducer,
    },
  });
};
