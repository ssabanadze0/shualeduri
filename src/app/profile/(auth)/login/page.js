"use client";
import { useState } from "react";
import { loginUser, fetchUsers } from "@/utils/fetchUtils";
import { saveToken, saveUser } from "@/utils/userUtils";
import { useRouter } from "next/navigation";
import styles from "@/styles/Profile.module.css";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = await loginUser(username, password);

      if (!token) {
        setError("Invalid username or password");
        setLoading(false);
        return;
      }

      saveToken(token);

      const users = await fetchUsers();
      const currentUser = users.find((u) => u.username === username);

      if (currentUser) {
        saveUser(currentUser);
        router.push("/profile");
      } else {
        setError("User not found");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} className={styles.form}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className={styles.registerPrompt}>
          "Don't have an account?"{" "}
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
