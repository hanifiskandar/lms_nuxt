// ~/composables/useAuth.ts
import { useAuthStore } from '~/stores/auth';

export const useAuth = () => {
  return useAuthStore();
};