export const addToCart = (product) => {
  try {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = storedCart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      storedCart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(storedCart));
    window.dispatchEvent(new Event("cartUpdated"));
    return `${product.title} added to cart!`;
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};

export const getCartCount = () => {
  try {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    return stored.reduce((sum, item) => sum + item.quantity, 0);
  } catch (err) {
    console.error("Error reading cart count:", err);
    return 0;
  }
};

export const getCartItems = () => {
  try {
    return JSON.parse(localStorage.getItem("cart")) || [];
  } catch {
    return [];
  }
};

export const saveCartItems = (items) => {
  localStorage.setItem("cart", JSON.stringify(items));
  window.dispatchEvent(new Event("cartUpdated"));
};

export const updateCartItemQuantity = (id, delta) => {
  const stored = getCartItems();
  const updated = stored.map((item) =>
    item.id === id
      ? { ...item, quantity: Math.max(1, item.quantity + delta) }
      : item
  );
  saveCartItems(updated);
  return updated;
};

export const removeCartItem = (id) => {
  const stored = getCartItems();
  const updated = stored.filter((item) => item.id !== id);
  saveCartItems(updated);
  return updated;
};

export const calculateTotal = (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
