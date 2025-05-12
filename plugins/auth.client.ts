// plugins/auth.client.ts
export default defineNuxtPlugin(() => {
    
    const login = async (username: string, password: string) => {
      await $fetch('http://localhost:8000/sanctum/csrf-cookie', {
        credentials: 'include',
      });
  
      return await $fetch('http://localhost:8000/api/login', {
        method: 'POST',
        body: { username, password },
        credentials: 'include',
      });
    };
  
    const logout = async () => {
      await $fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
    };
  
    const getUser = async () => {
      return await $fetch('http://localhost:8000/api/user', {
        credentials: 'include',
      });
    };
  
    return {
      provide: {
        auth: {
          login,
          logout,
          getUser,
        },
      },
    };
  });
  