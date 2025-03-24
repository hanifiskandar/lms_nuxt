export const useAuth = () => {
  const user = useState("user", () => ({
    loggedIn: false,
    id: null,
    role: null,
  }));

  const login = (id, role) => {
    user.value = { loggedIn: true, id, role };
    console.log("Login - New user value:", user.value); // Log after login
  };

  const logout = () => {
    user.value = { loggedIn: false, id: null, role: null };
    console.log("Logout - New user value:", user.value); // Log after logout
  };

  return { user, login, logout };
};
