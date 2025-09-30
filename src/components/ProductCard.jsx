import Image from "next/image";
import Link from "next/link";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import styles from "@/styles/ProductCard.module.css";

function ProductCard({ product }) {
  const rating = product.rating?.rate || 0;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  return (
    <Link href={`/details/${product.id}`} className={styles.card}>
      <Image
        src={product.image}
        alt={product.title}
        width={200}
        height={200}
        className={styles.image}
      />

      <h3 className={styles.name}>{product.title}</h3>

      <div className={styles.stars}>
        <div className={styles.stars}>
          {[...Array(fullStars)].map((_, i) => (
            <FaStar key={`full-${i}`} className={styles.starFull} />
          ))}
          {hasHalfStar && <FaStarHalfAlt className={styles.starHalf} />}
          {[...Array(emptyStars)].map((_, i) => (
            <FaRegStar key={`empty-${i}`} className={styles.starEmpty} />
          ))}
          <span className={styles.ratingCount}>({product.rating.count})</span>
        </div>
      </div>
      <p className={styles.price}>${product.price}</p>
    </Link>
  );
}

export default ProductCard;
