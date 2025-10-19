const API_BASE = "https://fakestoreapi.com";

export const fetchAllProducts = async () => {
  try {
    const res = await fetch(`${API_BASE}/products`);
    if (!res.ok) throw new Error("Failed to fetch products");
    return await res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const fetchProductById = async (id) => {
  try {
    const res = await fetch(`${API_BASE}/products/${id}`);
    if (!res.ok) throw new Error("Failed to fetch product");
    return await res.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

export const fetchUsers = async () => {
  try {
    const res = await fetch(`${API_BASE}/users`);
    if (!res.ok) throw new Error("Failed to fetch users");
    return await res.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const loginUser = async (username, password) => {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.status === 401) {
      return { error: "Invalid username or password" };
    }

    if (!res.ok) {
      return { error: `Unexpected error: ${res.status}` };
    }

    const data = await res.json();

    if (!data?.token) {
      return { error: "Login succeeded but no token received" };
    }

    return { token: data.token };
  } catch (err) {
    console.error("Login failed:", err);
    return { error: "Network or server error" };
  }
};
