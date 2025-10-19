"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser, fetchUsers } from "@/utils/fetchUtils";
import styles from "@/styles/Profile.module.css";

const schema = Yup.object().shape({
  username: Yup.string().trim().required("Username is required"),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password must be at least 4 characters"),
});

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (data) => {
    setError("");
    const { token, error: loginError } = await loginUser(
      data.username,
      data.password
    );

    if (loginError) {
      setError(loginError);
      return;
    }

    if (data.stayLoggedIn) {
      localStorage.setItem("token", token);
    } else {
      sessionStorage.setItem("token", token);
    }

    const users = await fetchUsers();
    const currentUser = users.find((u) => u.username === data.username);

    if (currentUser) {
      const storage = data.stayLoggedIn ? localStorage : sessionStorage;
      storage.setItem("user", JSON.stringify(currentUser));
    }

    router.push("/profile");
  };

  return (
    <main className={styles.main}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input type="text" placeholder="Username" {...register("username")} />
        {errors.username && (
          <p className={styles.error}>{errors.username.message}</p>
        )}
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && (
          <p className={styles.error}>{errors.password.message}</p>
        )}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
        <div className={styles.checkboxContainer}>
          <span className={styles.checkboxLabel}>Stay logged in</span>
          <input type="checkbox" {...register("stayLoggedIn")} />
        </div>
        <p className={styles.registerPrompt}>
          Don't have an account?{" "}
          <span
            onClick={() => router.push("/profile/register")}
            className={styles.registerLink}
          >
            Register here
          </span>
        </p>
      </form>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.demoUsers}>
        <h4>Demo Users:</h4>
        <ul>
          <li>
            <strong>johnd</strong> / m38rmF$
          </li>
          <li>
            <strong>mor_2314</strong> / 83r5^_
          </li>
          <li>
            <strong>kevinryan</strong> / kev02937@
          </li>
          <li>
            <strong>donero</strong> / ewedon
          </li>
          <li>
            <strong>derek</strong> / jklg*_56
          </li>
        </ul>
      </div>
    </main>
  );
}

export default LoginForm;
