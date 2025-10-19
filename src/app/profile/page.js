"use client";
import { useEffect, useState } from "react";
import { getToken, getUser, clearToken, clearUser } from "@/utils/userUtils";
import Loader from "@/components/Loader";
import styles from "@/styles/Profile.module.css";
import { useRouter } from "next/navigation";

function ProfilePage() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    let savedToken = getToken();
    let savedUser = getUser();

    if (!savedToken || !savedUser) {
      const sessionToken = sessionStorage.getItem("token");
      const sessionUser = sessionStorage.getItem("user");
      if (sessionToken && sessionUser) {
        savedToken = sessionToken;
        savedUser = JSON.parse(sessionUser);
      }
    }

    if (!savedToken || !savedUser) {
      router.push("/profile/login");
    } else {
      setToken(savedToken);
      setUser(savedUser);
    }
  }, [router]);

  if (!user) return <Loader />;

  return (
    <main>
      <div className={styles.profileContainer}>
        <div className={styles.avatarBox}>
          <img
            src={`https://i.pravatar.cc/200?u=${
              user?.id || user?.username || "default"
            }`}
            alt={user?.username}
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
          <button
            onClick={() => {
              clearToken();
              clearUser();
              sessionStorage.removeItem("token");
              sessionStorage.removeItem("user");
              setToken(null);
              setUser(null);
              router.push("/profile/login");
            }}
            className={styles.logoutBtn}
          >
            Logout
          </button>
        </div>
      </div>
    </main>
  );
}

export default ProfilePage;
