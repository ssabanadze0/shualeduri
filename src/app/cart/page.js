"use client";
import { useState, useEffect } from "react";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Cart.module.css";
import {
  getCartItems,
  updateCartItemQuantity,
  removeCartItem,
  calculateTotal,
} from "@/utils/cartUtils";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(getCartItems());

    const handleStorage = () => setCartItems(getCartItems());
    window.addEventListener("storage", handleStorage);
    window.addEventListener("cartUpdated", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("cartUpdated", handleStorage);
    };
  }, []);

  const updateQuantity = (id, delta) => {
    const updated = updateCartItemQuantity(id, delta);
    setCartItems(updated);
  };

  const removeItem = (id) => {
    const updated = removeCartItem(id);
    setCartItems(updated);
  };

  const total = calculateTotal(cartItems);

  if (cartItems.length === 0)
    return (
      <main className={styles.main}>
        <h2>Your cart is empty 🛒</h2>
        <Link href="/products" className={styles.back}>
          ← Continue Shopping
        </Link>
      </main>
    );

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Shopping Cart</h1>
      <div className={styles.cart}>
        <div className={styles.header}>
          <span>Product</span>
          <span>Quantity</span>
          <span>Price</span>
        </div>

        {cartItems.map((item) => (
          <div key={item.id} className={styles.row}>
            <div className={styles.product}>
              <Image
                src={item.image}
                alt={item.title}
                width={80}
                height={80}
                className={styles.image}
              />
              <div className={styles.info}>
                <h3>{item.title}</h3>
                <p className={styles.category}>{item.category}</p>
              </div>
            </div>

            <div className={styles.quantity}>
              <button onClick={() => updateQuantity(item.id, -1)}>
                <FaMinus />
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, +1)}>
                <FaPlus />
              </button>
            </div>

            <div className={styles.price}>
              ${(item.price * item.quantity).toFixed(2)}
            </div>

            <button
              className={styles.remove}
              onClick={() => removeItem(item.id)}
            >
              <FaTrash />
            </button>
          </div>
        ))}

        <div className={styles.total}>
          <h3>Total:</h3>
          <p>${total}</p>
        </div>

        <button className={styles.checkout}>Proceed to Checkout</button>
      </div>
    </main>
  );
}

export default CartPage;
