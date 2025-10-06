"use client";
import { useEffect } from "react";
import Link from "next/link";
import styles from "@/styles/NotFound.module.css";

export default function NotFoundPage() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/";
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>404 — Page Not Found</h1>
      <p className={styles.text}>
        You'll be redirected to the homepage shortly.
      </p>
      <Link href="/" className={styles.link}>
        Go Home Now
      </Link>
    </main>
  );
}
