"use client";
import { useState, useEffect } from "react";
import { loginUser, fetchUsers } from "@/utils/fetchUtils";
import {
  saveToken,
  getToken,
  clearToken,
  saveUser,
  getUser,
  clearUser,
} from "@/utils/userUtils";
import Loader from "@/components/Loader";
import styles from "@/styles/Profile.module.css";

function ProfilePage() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedToken = getToken();
    const savedUser = getUser();

    if (savedToken) setToken(savedToken);
    if (savedUser) setUser(savedUser);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const receivedToken = await loginUser(username, password);

      if (!receivedToken) {
        setError("Invalid username or password");
        setLoading(false);
        return;
      }

      saveToken(receivedToken);
      setToken(receivedToken);

      const users = await fetchUsers();
      const currentUser = users.find((u) => u.username === username);

      if (currentUser) {
        saveUser(currentUser);
        setUser(currentUser);
      } else {
        setError("User not found");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    clearToken();
    clearUser();
    setToken(null);
    setUser(null);
  };

  if (loading) return <Loader />;

  if (!token) {
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
          <button type="submit">Login</button>
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

  if (!user) {
    return (
      <main className={styles.main}>
        <h2>Loading user data...</h2>
        <Loader />
      </main>
    );
  }

  return (
    <main>
      <div className={styles.profileContainer}>
        <div className={styles.avatarBox}>
          <img
            src={`https://i.pravatar.cc/200?u=${
              user?.id || user?.username || "default"
            }`}
            alt={user?.username || "User avatar"}
            className={styles.avatar}
          />
        </div>

        <div className={styles.infoBox}>
          <h2>
            {user?.name?.firstname} {user?.name?.lastname}
          </h2>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Username:</strong> {user?.username}
          </p>
          <p>
            <strong>Phone:</strong> {user?.phone}
          </p>
          <p>
            <strong>City:</strong> {user?.address?.city}
          </p>
          <p>
            <strong>Street:</strong> {user?.address?.street}{" "}
            {user?.address?.number}
          </p>
          <p>
            <strong>Zipcode:</strong> {user?.address?.zipcode}
          </p>

          <button onClick={handleLogout} className={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </div>
    </main>
  );
}

export default ProfilePage;
