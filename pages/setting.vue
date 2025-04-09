<template>
  <div class="bg-white p-6 rounded-xl shadow-lg">
    <div class="bg-emerald-600 text-white py-3 px-6 rounded-t-xl flex items-center">
      <span class="text-lg font-bold">Settings</span>
    </div>

    <!-- Sub-tab Navigation -->
    <div class="mt-4 border-b border-gray-200">
      <nav class="flex space-x-4 px-6">
        <NuxtLink 
          v-for="tab in tabs" 
          :key="tab.route" 
          :to="`/setting/${tab.route}`" 
          class="px-4 py-2 text-sm font-medium"
          :class="[
            $route.path === `/setting/${tab.route}` 
              ? 'border-b-2 border-emerald-600 text-emerald-600' 
              : 'text-gray-500 hover:text-emerald-600'
          ]"
        >
          {{ tab.label }}
        </NuxtLink>
      </nav>
    </div>

    <!-- Sub-tab Content -->
    <div class="mt-6 px-6">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
const tabs = [
  { label: "Reset Password", route: "reset-password" },
  { label: "Company Info", route: "company-info" },
  { label: "Notifications", route: "notifications" },
  { label: "Payslip Config", route: "payslip-config" },
];
</script>