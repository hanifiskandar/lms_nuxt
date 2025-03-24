<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full p-6 bg-white shadow-lg rounded-lg text-center">
      <h1 class="text-2xl font-semibold mb-4">Selamat Datang</h1>
      <h2 class="bg-red-600 text-3xl">Test Tailwind</h2>
      <p v-if="user.loggedIn" class="text-gray-600 mb-4">
        Anda telah log masuk sebagai {{ user.role }}.
      </p>
      <p v-else class="text-gray-600 mb-4">
        Sila log masuk untuk meneruskan.
      </p>
      <NuxtLink
        v-if="user.loggedIn"
        to="/kawalan-capaian/pengurusan-kakitangan/baharu12"
        class="inline-block bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700"
      >
        Pergi ke Pengurusan Kakitangan
      </NuxtLink>
      <NuxtLink
        v-else
        to="/login"
        class="inline-block bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700"
      >
        Log Masuk
      </NuxtLink>
      <button
        v-if="user.loggedIn"
        @click="logout"
        class="mt-4 block w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
      >
        Log Keluar
      </button>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth';

const { user, logout } = useAuth();
</script>