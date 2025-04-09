<template>
  <div>
    <h2 class="text-lg font-semibold text-gray-800 mb-4">Company Info</h2>
    <UForm :state="companyData" class="space-y-4 max-w-md" @submit="saveCompanyInfo">
      <UFormField label="Company Name" :ui="{ label: 'text-sm font-semibold text-gray-700' }" required>
        <UInput v-model="companyData.name" size="lg" />
      </UFormField>
      <UFormField label="Company Logo" :ui="{ label: 'text-sm font-semibold text-gray-700' }">
        <input 
          type="file" 
          @change="uploadLogo" 
          accept="image/*" 
          class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
        />
        <img v-if="companyData.logoPreview" :src="companyData.logoPreview" alt="Logo Preview" class="mt-2 w-32 h-32 object-contain" />
      </UFormField>
      <UButton color="primary" variant="solid" label="Save" type="submit" />
    </UForm>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const companyData = ref({
  name: 'LeafSync Inc.',
  logo: null,
  logoPreview: null,
});

const uploadLogo = (event) => {
  const file = event.target.files[0];
  if (file) {
    companyData.value.logo = file;
    companyData.value.logoPreview = URL.createObjectURL(file);
  }
};

const saveCompanyInfo = async () => {
  const formData = new FormData();
  formData.append('name', companyData.value.name);
  if (companyData.value.logo) formData.append('logo', companyData.value.logo);

  try {
    await $fetch('/api/company/info', {
      method: 'POST',
      body: formData,
    });
    alert('Company info saved successfully!');
  } catch (error) {
    console.error('Error saving company info:', error);
    alert('Failed to save company info.');
  }
};
</script>