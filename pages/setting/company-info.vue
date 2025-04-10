<template>
  <div class="bg-white p-4 rounded-lg shadow-md">
    <div class="bg-emerald-600 text-white py-3 px-6 border-b flex items-center">
      <span class="text-sm font-bold">Company Info</span>
    </div>
    <div class="p-2">
      <UForm :state="companyData" class="space-y-4" @submit="saveCompanyInfo">
        <div class="mb-4">
          <UFormField 
            for="companyName" 
            label="Company Name" 
            :ui="{ label: 'font-bold' }" 
            required 
          />
          <UInput 
            id="companyName"
            v-model="companyData.name" 
            size="lg" 
            class="w-1/2" 
          />
        </div>
        <div class="mb-4">
          <UFormField 
            for="companyLogo" 
            label="Company Logo" 
            :ui="{ label: 'font-bold' }" 
          />
          <input 
            id="companyLogo"
            type="file" 
            @change="uploadLogo" 
            accept="image/*" 
            class="block w-1/2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
          />
          <img 
            v-if="companyData.logoPreview" 
            :src="companyData.logoPreview" 
            alt="Logo Preview" 
            class="mt-2 w-32 h-32 object-contain" 
          />
        </div>
        <div>
          <UButton 
            color="primary" 
            variant="solid" 
            label="Save" 
            type="submit" 
          />
        </div>
      </UForm>
    </div>
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