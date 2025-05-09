<template>
  <div class="bg-white p-4 rounded-lg shadow-md">
    <div class="bg-emerald-600 text-white py-3 px-6 border-b flex items-center">
      <span class="text-sm font-bold">Reset Password</span>
    </div>
    <div class="p-2">
      <UForm :state="formData" class="space-y-4" @submit="resetPassword">
        <div class="mb-4">
          <UFormField 
            for="currentPassword" 
            label="Current Password" 
            :ui="{ label: 'font-bold' }" 
            required 
          />
          <UInput 
            id="currentPassword"
            v-model="formData.currentPassword" 
            type="password" 
            size="lg" 
            class="w-1/2" 
            @blur="v$.currentPassword.$touch()"
          />
          <div 
            v-if="errorMessages.currentPassword" 
            class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1"
          >
            {{ errorMessages.currentPassword }}
          </div>
        </div>
        <div class="mb-4">
          <UFormField 
            for="newPassword" 
            label="New Password" 
            :ui="{ label: 'font-bold' }" 
            required 
          />
          <UInput 
            id="newPassword"
            v-model="formData.newPassword" 
            type="password" 
            size="lg" 
            class="w-1/2"
            @blur="v$.newPassword.$touch()"
          />
          <div 
            v-if="errorMessages.newPassword" 
            class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1"
          >
            {{ errorMessages.newPassword }}
          </div>
        </div>
        <div class="mb-4">
          <UFormField 
            for="confirmPassword" 
            label="Confirm New Password" 
            :ui="{ label: 'font-bold' }" 
            required 
          />
          <UInput 
            id="confirmPassword"
            v-model="formData.confirmPassword" 
            type="password" 
            size="lg" 
            class="w-1/2"
            @blur="v$.confirmPassword.$touch()"
          />
          <div 
            v-if="errorMessages.confirmPassword" 
            class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1"
          >
            {{ errorMessages.confirmPassword }}
          </div>
        </div>
        <div>
          <UButton 
            color="primary" 
            variant="solid" 
            label="Reset Password" 
            type="submit" 
            :disabled="v$.$invalid"
          />
        </div>
      </UForm>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, sameAs } from '@vuelidate/validators';

// Form data
const formData = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
});

// Validation rules
const rules = {
  currentPassword: { required, minLength: minLength(6) },
  newPassword: { required, minLength: minLength(6) },
  confirmPassword: { 
    required, 
    minLength: minLength(6), 
    sameAs: sameAs(computed(() => formData.value.newPassword), 'new password') 
  },
};

const v$ = useVuelidate(rules, formData);

// Error messages
const errorMessages = computed(() => ({
  currentPassword: v$.value.currentPassword.$errors.length 
    ? v$.value.currentPassword.$errors[0].$message 
    : '',
  newPassword: v$.value.newPassword.$errors.length 
    ? v$.value.newPassword.$errors[0].$message 
    : '',
  confirmPassword: v$.value.confirmPassword.$errors.length 
    ? v$.value.confirmPassword.$errors[0].$message 
    : '',
}));

// Reset password submission
const resetPassword = async () => {
  v$.value.$touch();
  if (v$.value.$invalid) return;

  try {
    await $fetch('/api/user/reset-password', {
      method: 'POST',
      body: formData.value,
    });
    alert('Password reset successfully!');
    formData.value = { currentPassword: '', newPassword: '', confirmPassword: '' };
    v$.value.$reset();
  } catch (error) {
    console.error('Error resetting password:', error);
    alert('Failed to reset password. Please try again.');
  }
};
</script>