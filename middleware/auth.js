// ~/middleware/auth.js
import { useAuth } from '~/composables/useAuth';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuth();

//   if (process.server) {
//     // Skip authentication check on server-side (optional, depending on your SSR setup)
//     return;
//   }

  if (!auth.user) {
    try {
      await auth.fetchUser();
    } catch (error) {
      // Redirect to login page if user is not authenticated
      return navigateTo('/login');
    }
  }
});