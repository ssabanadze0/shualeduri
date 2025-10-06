import { fetchUsers } from "./fetchUtils";

export const isValidProductId = (id) => {
  const num = Number(id);
  return Number.isInteger(num) && num >= 1 && num <= 20;
};

export const isNonEmpty = (value) => {
  return typeof value === "string" && value.trim().length > 0;
};

export const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateUserCredentials = async (username, password) => {
  const users = await fetchUsers();
  const matchedUser = users.find(
    (user) => user.username === username && user.password === password
  );
  return matchedUser || null;
};
