// ~/stores/auth.js
// import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
  }),
  actions: {
    async fetchUser() {
      const auth = useNuxtApp().$auth; // Depends on auth.client.ts
      try {
        this.user = await auth.getUser();
      } catch (error) {
        this.user = null;
        throw error;
      }
    },
    async login(username, password) {
      const auth = useNuxtApp().$auth; // Depends on auth.client.ts
      await auth.login(username, password);
      await this.fetchUser();
    },
    async logout() {
      const auth = useNuxtApp().$auth; // Depends on auth.client.ts
      await auth.logout();
      this.user = null;
    },
  },
});