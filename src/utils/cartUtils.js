export const saveCartToSession = (cartItems) => {
  try {
    sessionStorage.setItem("cart", JSON.stringify(cartItems));
  } catch (error) {
    console.error("Failed to save cart:", error);
  }
};

export const loadCartFromSession = () => {
  try {
    const stored = sessionStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to load cart:", error);
    return [];
  }
};

export const calculateTotal = (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

export const clearCartSession = () => {
  try {
    sessionStorage.removeItem("cart");
  } catch (error) {
    console.error("Failed to clear cart:", error);
  }
};
