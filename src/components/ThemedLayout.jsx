"use client";
import { useSelector } from "react-redux";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import styles from "@/styles/ThemedLayout.module.css";

function ThemedLayout({ children }) {
  const theme = useSelector((state) => state.theme.mode);
  console.log("Redux theme state:", theme);

  return (
    <div className={`${styles.layout} ${styles[theme]}`}>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default ThemedLayout;
