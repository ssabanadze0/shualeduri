"use client";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import cardStyles from "@/styles/ProductCard.module.css";
import pageStyles from "./products.module.css";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading)
    return (
      <main className={pageStyles.main}>
        <div className="loader"></div>
      </main>
    );

  return (
    <main className={pageStyles.main}>
      <h1 className={pageStyles.title}>Products</h1>
      <div className={pageStyles.grid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            className={cardStyles.card}
          />
        ))}
      </div>
    </main>
  );
}

export default ProductsPage;
