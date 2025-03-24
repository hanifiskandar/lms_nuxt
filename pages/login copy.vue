<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
    <h1 class="text-2xl font-semibold mb-4">Log Masuk</h1>
    <form @submit.prevent="handleLogin">
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">ID Pengguna</label>
        <input
          v-model="userId"
          type="text"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          placeholder="Masukkan ID"
        />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Peranan</label>
        <select v-model="role" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
          <option value="admin">Admin</option>
          <option value="user">Pengguna</option>
        </select>
      </div>
      <button
        type="submit"
        class="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700"
      >
        Log Masuk
      </button>
    </form>
  </div>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth';

const { login } = useAuth();
const userId = ref('');
const role = ref('user');

const handleLogin = () => {
  login(userId.value, role.value);
  navigateTo('/kawalan-capaian/new');
};
</script>