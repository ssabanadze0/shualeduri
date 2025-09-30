"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Featured from "@/components/Featured";
import styles from "./page.module.css";

function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => setLoading(false);
    const isLoaded = document.readyState === "complete";

    isLoaded ? setLoading(false) : window.addEventListener("load", handleLoad);
    return () => !isLoaded && window.removeEventListener("loaded", handleLoad);
  }, []);

  if (loading) {
    return (
      <main className={styles.main}>
        <div className="loader"></div>
      </main>
    );
  }
  return (
    <main>
      <section className={styles.hero}>
        <h1>Welcome to FakeStore</h1>
        <p>Your one-stop shop for stylish and affordable products.</p>
        <Link href="/products" className={styles.button}>
          Explore Products
        </Link>
      </section>

      <section className={styles.highlights}>
        <Link href="/cart" className={styles.card}>
          <span>🚚</span>
          <h3>Fast Shipping</h3>
          <p>We deliver in 2–3 days nationwide.</p>
        </Link>

        <Link href="/cart" className={styles.card}>
          <span>💳</span>
          <h3>Secure Payments</h3>
          <p>All major cards and crypto supported.</p>
        </Link>

        <Link href="/cart" className={styles.card}>
          <span>🔄</span>
          <h3>Easy Returns</h3>
          <p>30-day money-back guarantee.</p>
        </Link>
      </section>

      <section className={styles.featured}>
        <h2>Featured Products</h2>
        <Featured />
      </section>
    </main>
  );
}

export default HomePage;
