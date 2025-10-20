"use client";
import { useSelector, useDispatch } from "react-redux";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Cart.module.css";
import { updateQuantity, removeFromCart } from "@/lib/slices/cartSlice";

function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleUpdate = (id, delta) => {
    dispatch(updateQuantity({ id, delta }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const total = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  if (cartItems.length === 0) {
    return (
      <main className={styles.main}>
        <h2>Your cart is empty 🛒</h2>
        <Link href="/products" className={styles.back}>
          ← Continue Shopping
        </Link>
      </main>
    );
  }

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
              <button onClick={() => handleUpdate(item.id, -1)}>
                <FaMinus />
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => handleUpdate(item.id, +1)}>
                <FaPlus />
              </button>
            </div>

            <div className={styles.price}>
              ${(item.price * item.quantity).toFixed(2)}
            </div>

            <button
              className={styles.remove}
              onClick={() => handleRemove(item.id)}
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
