<template>
  <div>
    <h2 class="text-lg font-semibold text-gray-800 mb-4">Payslip Configuration</h2>
    <div class="space-y-4 max-w-md">
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium text-gray-700">Show Overtime</span>
        <USwitch v-model="payslipConfig.overtime" color="emerald" />
      </div>
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium text-gray-700">Show Deductions</span>
        <USwitch v-model="payslipConfig.deductions" color="emerald" />
      </div>
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium text-gray-700">Show Bonuses</span>
        <USwitch v-model="payslipConfig.bonuses" color="emerald" />
      </div>
      <UButton color="primary" variant="solid" label="Save" @click="savePayslipConfig" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const payslipConfig = ref({
  overtime: true,
  deductions: true,
  bonuses: false,
});

const savePayslipConfig = async () => {
  try {
    await $fetch('/api/payslip/config', {
      method: 'POST',
      body: payslipConfig.value,
    });
    alert('Payslip configuration saved successfully!');
  } catch (error) {
    console.error('Error saving payslip config:', error);
    alert('Failed to save payslip configuration.');
  }
};
</script>