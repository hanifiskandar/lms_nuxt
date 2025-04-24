<!-- pages/profile.vue -->
<template>
  <div class="bg-white p-4 rounded-lg shadow-md">
    <div class="border-b border-gray-200">
      <nav class="flex space-x-4">
        <NuxtLink
          to="/profile/personal"
          class="py-2 px-4 font-medium"
          active-class="border-b-2 border-emerald-600 text-emerald-600"
          :class="{ 'text-gray-500 hover:text-emerald-600': $route.path !== '/profile/personal' }"
        >
          Personal
        </NuxtLink>
        <NuxtLink
          to="/profile/family"
          class="py-2 px-4 font-medium"
          active-class="border-b-2 border-emerald-600 text-emerald-600"
          :class="{ 'text-gray-500 hover:text-emerald-600': $route.path !== '/profile/family' }"
        >
          Family
        </NuxtLink>
      </nav>
    </div>
    <div class="mt-4">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default',
});

// Redirect to /profile/personal if on /profile
if (useRoute().path === '/profile') {
  console.log('testing boomb2');
  navigateTo('/profile/personal');
}
</script>