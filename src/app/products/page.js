"use client";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { cache } from "@/utils/dataCache";
import { fetchAllProducts } from "@/utils/fetchUtils";
import cardStyles from "@/styles/ProductCard.module.css";
import pageStyles from "./products.module.css";
import Loader from "@/components/Loader";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      if (cache.products) {
        setProducts(cache.products);
        setLoading(false);
        return;
      }

      const data = await fetchAllProducts();
      cache.products = data;
      setProducts(data);
      setLoading(false);
    }
    loadProducts();
  }, []);

  if (loading) return <Loader />;

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
