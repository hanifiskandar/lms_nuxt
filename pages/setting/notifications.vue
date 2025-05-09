<template>
  <div class="bg-white p-4 rounded-lg shadow-md">
    <div class="bg-emerald-600 text-white py-3 px-6 border-b flex items-center">
      <span class="text-sm font-bold">Notification Settings</span>
    </div>
    <div class="p-2">
      <div class="space-y-4">
        <div class="mb-4">
          <UFormField 
            for="emailNotifications" 
            label="Email Notifications" 
            :ui="{ label: 'font-bold' }" 
          />
          <USwitch 
            id="emailNotifications"
            v-model="notificationSettings.email" 
            color="primary" 
            class="w-1/2" 
          />
        </div>
        <div class="mb-4">
          <UFormField 
            for="inAppNotifications" 
            label="In-App Notifications" 
            :ui="{ label: 'font-bold' }" 
          />
          <USwitch 
            id="inAppNotifications"
            v-model="notificationSettings.inApp" 
            color="primary" 
            class="w-1/2" 
          />
        </div>
        <div>
          <UButton 
            color="primary" 
            variant="solid" 
            label="Save" 
            @click="saveNotificationSettings" 
          />
        </div>
      </div>
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