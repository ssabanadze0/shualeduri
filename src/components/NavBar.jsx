"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "@/styles/NavBar.module.css";
import { FaHome, FaTags, FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { getCartCount } from "@/utils/cartUtils";

function NavBar() {
  const pathname = usePathname();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(getCartCount());

    const handleStorage = () => setCartCount(getCartCount());
    window.addEventListener("storage", handleStorage); ///sxva tabebi ro gaxsnas
    const handleCartUpdate = () => setCartCount(getCartCount());
    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);
  const links = [
    { href: "/", label: "Home", icon: <FaHome /> },
    { href: "/products", label: "Products", icon: <FaTags /> },
    { href: "/profile", label: "Profile", icon: <FaUserCircle /> },
    { href: "/cart", label: "Cart", icon: <FaShoppingCart /> },
  ];

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <Link href="/" className={styles.logo}>
          <Image src="/logo.png" alt="FakeStore Logo" width={40} height={40} />
          <span className={styles.brand}>FakeStore</span>
        </Link>
      </div>

      <ul className={styles.menu}>
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`${styles.link} ${
                pathname === link.href || pathname.startsWith(link.href + "/")
                  ? styles.active
                  : ""
              }`}
            >
              <span className={styles.icon}>
                {link.icon}
                {link.label === "Cart" && cartCount > 0 && (
                  <span className={styles.badge}>{cartCount}</span>
                )}
              </span>
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar;
