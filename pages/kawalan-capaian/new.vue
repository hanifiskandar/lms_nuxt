<template>
  <div class="max-w-2xl mx-auto mt-10 shadow-lg rounded-2xl overflow-hidden bg-white">
    <div class="bg-[#1D4D5C] text-white px-6 py-4">
      <h2 class="text-lg font-semibold">Maklumat Pengguna</h2>
    </div>
    <div class="divide-y divide-gray-200">
      <div class="flex hover:bg-gray-50 transition-colors duration-150">
        <div class="w-1/3 px-6 py-4 text-sm font-medium text-gray-700">ID</div>
        <div class="flex-1 px-6 py-4 text-sm text-gray-900">{{ user.id }}</div>
      </div>
      <div class="flex hover:bg-gray-50 transition-colors duration-150">
        <div class="w-1/3 px-6 py-4 text-sm font-medium text-gray-700">Nama</div>
        <div class="flex-1 px-6 py-4 text-sm text-gray-900">Muhammad Hanif Bin Iskandar</div>
      </div>
    </div>
    <div class="flex space-x-4 p-6">
      <button
        v-if="hasPermission('edit')"
        class="bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 flex items-center space-x-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
        </svg>
        <span>Kemaskini</span>
      </button>
      <button
        v-if="hasPermission('delete')"
        class="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 flex items-center space-x-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4M5 7h14m-2 0v1M7 7v1"></path>
        </svg>
        <span>Hapus</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth';
import { hasPermission } from '~/utils/acl';

definePageMeta({
  middleware: ['acl']
});

const { user } = useAuth();
</script>