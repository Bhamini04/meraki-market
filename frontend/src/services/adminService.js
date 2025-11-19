import api from "./api";

// FIXED — now function receives object
export const loginAdmin = async ({ email, password }) => {
  const res = await api.post("/auth/login", {
    email,
    password,
    isAdminLogin: true,
  });

  if (!res.data.user.isAdmin) {
    throw new Error("Not an admin");
  }

  return res.data;
};

// Register new admin
export const registerAdmin = async ({ name, email, password }) => {
  const res = await api.post("/auth/admin/register", {
    name,
    email,
    password,
  });

  if (!res.data.user.isAdmin) {
    throw new Error("Registration failed - not admin");
  }

  return res.data;
};
