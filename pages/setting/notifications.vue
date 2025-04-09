<template>
  <div>
    <h2 class="text-lg font-semibold text-gray-800 mb-4">Notification Settings</h2>
    <div class="space-y-4 max-w-md">
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium text-gray-700">Email Notifications</span>
        <USwitch v-model="notificationSettings.email" color="emerald" />
      </div>
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium text-gray-700">In-App Notifications</span>
        <USwitch v-model="notificationSettings.inApp" color="emerald" />
      </div>
      <UButton color="primary" variant="solid" label="Save" @click="saveNotificationSettings" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const notificationSettings = ref({
  email: true,
  inApp: true,
});

const saveNotificationSettings = async () => {
  try {
    await $fetch('/api/user/notification-settings', {
      method: 'POST',
      body: notificationSettings.value,
    });
    alert('Notification settings saved successfully!');
  } catch (error) {
    console.error('Error saving notification settings:', error);
    alert('Failed to save notification settings.');
  }
};
</script>