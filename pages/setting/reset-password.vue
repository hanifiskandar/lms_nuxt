<template>
  <div>
    <h2 class="text-lg font-semibold text-gray-800 mb-4">Reset Password</h2>
    <UForm :state="formData" class="space-y-4 max-w-md" @submit="resetPassword">
      <UFormField label="Current Password" :ui="{ label: 'text-sm font-semibold text-gray-700' }" required>
        <UInput v-model="formData.currentPassword" type="password" size="lg" />
      </UFormField>
      <UFormField label="New Password" :ui="{ label: 'text-sm font-semibold text-gray-700' }" required>
        <UInput v-model="formData.newPassword" type="password" size="lg" />
      </UFormField>
      <UFormField label="Confirm New Password" :ui="{ label: 'text-sm font-semibold text-gray-700' }" required>
        <UInput v-model="formData.confirmPassword" type="password" size="lg" />
      </UFormField>
      <UButton color="primary" variant="solid" label="Reset Password" type="submit" />
    </UForm>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const formData = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
});

const resetPassword = async () => {
  // Simulate API call
  try {
    await $fetch('/api/user/reset-password', {
      method: 'POST',
      body: formData.value,
    });
    alert('Password reset successfully!');
    formData.value = { currentPassword: '', newPassword: '', confirmPassword: '' };
  } catch (error) {
    console.error('Error resetting password:', error);
    alert('Failed to reset password. Please try again.');
  }
};
</script>