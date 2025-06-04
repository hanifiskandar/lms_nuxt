export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    roles: [],
  }),
  actions: {
    async fetchUser() {
      const auth = useNuxtApp().$auth;
      try {
        const user = await auth.getUser();
        this.user = user;
        this.roles = user.roles || [];
      } catch (error) {
        this.user = null;
        this.roles = [];
        throw error;
      }
    },
    async login(username, password) {
      const auth = useNuxtApp().$auth;
      await auth.login(username, password);
      await this.fetchUser();
    },
    async logout() {
      const auth = useNuxtApp().$auth;
      await auth.logout();
      this.user = null;
      this.roles = [];
    },
  },
  getters: {
    hasRole: (state) => (role) => {
      return state.user?.role?.includes(role);
    },
    isHeadOfDepartment: (state) => {
      return state.user?.is_head_of_department === true;
    },
    isHR: (state) => state.user?.role?.includes("hr"),
    isCEO: (state) => state.user?.role?.includes("ceo"),
    isStaff: (state) => state.user?.role?.includes("staff"),
    // isHeadOfDepartment: (state) => state.user?.is_head_of_department == true,
  },
});
