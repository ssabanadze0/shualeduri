"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styles from "@/styles/NavBar.module.css";
import { FaHome, FaTags, FaUserCircle, FaShoppingCart } from "react-icons/fa";

function NavBar() {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const cartCount = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

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

                {isClient && link.label === "Cart" && cartCount > 0 && (
                  <div className={styles.badge}>{cartCount}</div>
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
