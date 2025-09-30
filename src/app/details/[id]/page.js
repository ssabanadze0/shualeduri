"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Details.module.css";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    const productId = Number(id);

    if (!Number.isInteger(productId) || productId < 1 || productId > 20) {
      setInvalid(true);
      setLoading(false);
      return;
    }

    async function fetchProduct() {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();

        if (!data || !data.id) {
          setInvalid(true);
          return;
        }

        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setInvalid(true);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <main className={styles.main}>
        <div className="loader"></div>
      </main>
    );

  if (invalid)
    return (
      <main className={styles.main}>
        <h2 className={styles.error}>404 — Product not found</h2>
        <Link href="/products" className={styles.back}>
          ← Back to Products
        </Link>
      </main>
    );

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <Image
            src={product.image}
            alt={product.title}
            width={400}
            height={400}
            className={styles.image}
          />
        </div>

        <div className={styles.info}>
          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.category}>
            Category: <span>{product.category}</span>
          </p>
          <p className={styles.price}>${product.price}</p>
          <p className={styles.description}>{product.description}</p>
          <div className={styles.rating}>
            ⭐ {product.rating.rate} / 5 ({product.rating.count} reviews)
          </div>
          <button className={styles.button}>Add to Cart</button>
          <Link href="/products" className={styles.back}>
            ← Back to Products
          </Link>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
