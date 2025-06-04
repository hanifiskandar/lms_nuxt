<template>
  <div class="bg-white p-4 rounded-lg shadow-md">
    <div class="mt-2">
        <div class="bg-emerald-600 text-white py-3 px-6 border-b flex items-center">
          <span class="text-sm font-bold">List Department</span>
        </div>

        <div class="flex flex-wrap items-center justify-end mb-4 mt-4">
        <!-- Search Bar -->
        <!-- <UInput v-model="filter.search" placeholder="Search..." class="w-128" size="lg" color="gray" variant="outline" @keyup.enter="searchData"/> -->

        <div class="flex space-x-4">
          <USelect v-model="filter.department" placeholder="Select Department" :items="departmentOptions" label-key="name" value-key="id" class="w-80" size="lg"></USelect>
          <!-- <USelect v-model="selectedExport" :items="exportOptions" placeholder="Export" icon="i-heroicons-arrow-down-tray" @change="handleExport"/> -->
          <UButton icon="heroicons:arrow-path" color="primary" size="lg" @click="resetFilter"/>
        </div>
      </div>
      <!-- Table -->
      <div class="min-w-full shadow-sm">
        <table class="min-w-full">
          <thead class="bg-emerald-600">
            <tr>
              <th class="px-6 py-3 text-left text-sm font-semibold text-white">No</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-white">Department</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-white">Head Department</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-white">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr
              v-for="(department, index) in formData"
              :key="department.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="px-6 py-4 text-sm whitespace-nowrap">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
              <td class="px-6 py-4 text-sm whitespace-nowrap">{{ department.name }}</td>
              <td class="px-6 py-4 text-sm whitespace-nowrap">{{ department.head_department?.name }}</td>

              <td class="px-6 py-4 whitespace-nowrap flex space-x-2">
                <div class="flex items-center gap-2">
                  <NuxtLink :to="`/department/${department.id}`" class="icon-button text-blue-500">
                    <UIcon name="i-heroicons-pencil" />
                  </NuxtLink>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="mt-4 flex justify-end">
        <UPagination
          v-model:page="currentPage"
          :total="totalItems"
          :items-per-page="itemsPerPage"
        />
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

const formData = ref([]);
const departmentOptions = ref([]);
const selectedExport = ref(null);
const currentPage = ref(1); // Current page for pagination
const itemsPerPage = 6; // Number of users per page
const totalItems = ref(0);

const filter = reactive({
  search: "",
  department: null,
})

const exportOptions = ref([
  { label: 'Excel', value: 'excel', icon: 'i-heroicons-table-cells' },
  { label: 'PDF', value: 'pdf', icon: 'i-heroicons-document' },
]);

// Export handler
const handleExport = () => {
  if (selectedExport.value) {
    switch (selectedExport.value) {
      case 'excel':
        exportToExcel();
        break;
      case 'pdf':
        exportToPDF();
        break;
      default:
        console.log('No export type selected');
    }
    selectedExport.value = null;
  }
};

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

watch([() => filter.department, currentPage], () => {
  getData();
});

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

const getData = async () => {
  try {
    const response = await $fetch('/api/departments/',{
      method: 'GET',
      query: {
        search: filter.search,
        department: filter.department,
        page: currentPage.value,
        per_page: itemsPerPage,
      }
    })

    formData.value = response.data;
    totalItems.value = response.meta.total;
  } catch (error){
    console.error('Failed to fetch data', error)
  }
};

const searchData = () => {
  getData();
}

const resetFilter = () =>{
  filter.search = "";
  filter.department = null;
  currentPage.value = 1;
  getData();
}

onMounted(() => {
  getData(),
  getDepartments()
})
</script>