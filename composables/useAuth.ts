import { useAuthStore } from "~/stores/auth";

export const useAuth = () => {
  if (process.server) {
    return {
      user: null,
      login: async () => {},
      logout: async () => {},
      fetchUser: async () => {},
    };
  }
  const store = useAuthStore();
  if (!store) {
    throw new Error(
      "Pinia store is not available. Ensure Pinia is initialized."
    );
  }
  return store;
};
