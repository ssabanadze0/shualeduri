"use client";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import styles from "@/styles/Featured.module.css";

function Featured() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();

        const sorted = data.sort((a, b) => b.rating.rate - a.rating.rate);

        const topProducts = sorted.slice(0, 3);

        setProducts(topProducts);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
    }

    fetchFeatured();
  }, []);

  return (
    <div className={styles.grid}>
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <p style={{ color: "#ccc" }}>No featured products found.</p>
      )}
    </div>
  );
}

export default Featured;
