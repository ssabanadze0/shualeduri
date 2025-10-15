"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/slices/cartSlice";
import Loader from "@/components/Loader";
import { isValidProductId } from "@/utils/validationUtils";
import { fetchProductById } from "@/utils/fetchUtils";
import styles from "@/styles/Details.module.css";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [invalid, setInvalid] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isValidProductId(id)) {
      setInvalid(true);
      setLoading(false);
      return;
    }

    async function loadProduct() {
      const data = await fetchProductById(id);

      if (!data || !data.id) setInvalid(true);
      else setProduct(data);
      setLoading(false);
    }

    loadProduct();
  }, [id]);

  if (loading) return <Loader />;

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

          {message && <div className={styles.notification}>{message}</div>}

          <button
            className={styles.button}
            onClick={() => {
              dispatch(addToCart(product));
              setMessage(`${product.title} added to cart!`);
              setTimeout(() => setMessage(""), 2000);
            }}
          >
            Add to Cart
          </button>

          <Link href="/products" className={styles.back}>
            ← Back to Products
          </Link>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
