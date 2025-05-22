<template>
  <div class="bg-white p-4 rounded-lg shadow-md">
    <div class="mt-2">
        <div class="bg-emerald-600 text-white py-3 px-6 border-b flex items-center">
          <span class="text-sm font-bold">Report Employees</span>
        </div>

        <div class="flex flex-wrap items-center justify-between mb-4 mt-4">

        <div class="flex space-x-4">
          <USelect v-model="filter.designation" placeholder="Select Designation" :items="designationOptions" label-key="name" value-key="id" class="w-80" size="lg"></USelect>
          <USelect v-model="filter.department" placeholder="Select Department" :items="departmentOptions" label-key="name" value-key="id" class="w-80" size="lg"></USelect>
          <UButton icon="heroicons:arrow-path" color="primary" size="lg" @click="resetFilter"/>
          <UButton label="PDF" color="warning" size="lg" @click="exportToPDF"/>
          <UButton label="Excel" color="secondary" size="lg" @click="exportToExcel"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { downloadFile } from '~/utils/download';

definePageMeta({
  middleware: ['auth'],
});
const auth = useAuth();
const user = computed(() => auth.user);

const toast = useToast()
const formData = ref([]);
const designationOptions = ref([]);
const departmentOptions = ref([]);

const filter = reactive({
  designation: null,
  department: null,
})


const exportToPDF = async () => {
  try {
    const response = await $fetch('/api/employee/export/pdf', {
      method: 'GET',
      query: {
        search: filter.search,
        designation: filter.designation,
        department: filter.department,
      },
      responseType: 'blob', // Important for binary file response
    });

    downloadFile(new Blob([response], { type: 'application/pdf' }), 'employee.pdf');
  } catch (error) {
    console.error('Failed to export PDF:', error);
  }
};

const exportToExcel = async () => {
  try {
    const response = await $fetch('/api/employee/export/excel', {
      method: 'GET',
      query: {
        search: filter.search,
        designation: filter.designation,
        department: filter.department,
      },
      responseType: 'blob',
    });

    downloadFile(new Blob([response]), 'employee.xlsx');
  } catch (error) {
    console.error('Failed to export Excel:', error);
  }
};

const getDesignations = async () => {
    try {
        const response = await $fetch('/api/setting/designations')
        if (response) {
            designationOptions.value = response.data
        }
    } catch (error) {
        console.error('Failed to fetch data', error)
    }
}

const getDepartments = async () => {
    try {
        const response = await $fetch('/api/setting/departments')
        if (response) {
            departmentOptions.value = response.data
        }
    } catch (error) {
        console.error('Failed to fetch data', error)
    }
}

const resetFilter = () =>{
  filter.designation = null;
  filter.department = null;
}

onMounted(() => {
  getDesignations(),
  getDepartments()
})
</script>