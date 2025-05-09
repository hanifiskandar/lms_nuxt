<template>
  <div class="bg-white p-4 rounded-lg shadow-md">
    <div class="bg-emerald-600 text-white py-3 px-6 border-b flex items-center">
      <span class="text-sm font-bold">Payslip Configuration</span>
    </div>
    <div class="p-2">
      <div class="space-y-4">
        <div class="mb-4">
          <UFormField 
            for="overtime" 
            label="Show Overtime" 
            :ui="{ label: 'font-bold' }" 
          />
          <USwitch 
            id="overtime"
            v-model="payslipConfig.overtime" 
            color="primary" 
            class="w-1/2" 
          />
        </div>
        <div class="mb-4">
          <UFormField 
            for="deductions" 
            label="Show Deductions" 
            :ui="{ label: 'font-bold' }" 
          />
          <USwitch 
            id="deductions"
            v-model="payslipConfig.deductions" 
            color="primary" 
            class="w-1/2" 
          />
        </div>
        <div class="mb-4">
          <UFormField 
            for="bonuses" 
            label="Show Bonuses" 
            :ui="{ label: 'font-bold' }" 
          />
          <USwitch 
            id="bonuses"
            v-model="payslipConfig.bonuses" 
            color="primary" 
            class="w-1/2" 
          />
        </div>
        <div>
          <UButton 
            color="primary" 
            variant="solid" 
            label="Save" 
            @click="savePayslipConfig" 
          />
        </div>
      </div>
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