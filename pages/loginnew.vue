<template>
  <div class="flex h-screen">
    <!-- Left Side: Image/Logo -->
    <div class="w-1/2 bg-blue-900 flex items-center justify-center">
      <h1 class="text-white text-4xl font-bold">Welcome Back</h1>
    </div>

    <!-- Right Side: Login Form -->
    <div class="w-1/2 flex items-center justify-center bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 class="text-2xl font-bold mb-6 text-gray-800">Login</h2>
        
        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label class="block text-gray-700">Email</label>
            <input type="email" v-model="email" class="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300">
          </div>
          
          <div class="mb-4">
            <label class="block text-gray-700">Password</label>
            <input type="password" v-model="password" class="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300">
          </div>
          
          <div class="flex items-center justify-between mb-4">
            <label class="flex items-center">
              <input type="checkbox" v-model="stayLoggedIn" class="mr-2">
              Stay logged in
            </label>
            <a href="#" class="text-blue-500 hover:underline">Forgot Password?</a>
          </div>
          
          <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const stayLoggedIn = ref(false);

const handleLogin = () => {
  console.log('Logging in with:', email.value, password.value, stayLoggedIn.value);
};
</script>
  