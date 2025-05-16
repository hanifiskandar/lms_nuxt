<template>
  <div class="bg-white p-4 rounded-lg shadow-md">
    <div class="mt-2">
      <div class="bg-emerald-600 text-white py-3 px-6 border-b flex items-center">
        <span class="text-sm font-bold">Leave Request</span>
      </div>
      <div class="flex flex-wrap items-center justify-between mb-4 mt-4">
        <!-- Filters -->
        <div class="flex space-x-4">
          <div class="flex flex-col">
            <USelect v-model="filter.leave_type" :items="leaveTypeOptions" class="w-48 mt-6" label-key="name" value-key="id" placeholder="Select Leave Type"></USelect>
          </div>
          <div class="flex flex-col">
            <USelect v-model="filter.duration" :items="durationOptions" class="w-48 mt-6" placeholder="Select Duration Type"></USelect>
          </div>
          <div class="flex flex-col">
            <label for="start-date" class="text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <UInput v-model="filter.start_date" type="date" id="start-date" class="w-48"></UInput>
          </div>
          <div class="flex flex-col">
            <label for="end-date" class="text-sm font-medium text-gray-700 mb-1">End Date</label>
            <UInput v-model="filter.end_date" type="date" id="end-date" class="w-48"></UInput>
          </div>
          <div class="flex flex-col">
            <UButton icon="heroicons:arrow-path" color="primary" size="md" class="mt-6" @click="resetFilter"></UButton>
          </div>
        </div>
      </div>  
      <!-- Table -->
      <div class="min-w-full shadow-sm">
        <table class="min-w-full">
          <thead class="bg-emerald-600">
            <tr>
              <th class="px-6 py-3 text-left text-sm font-semibold text-white">No</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-white">Leave Type</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-white">Start Date</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-white">End Date</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-white">Duration</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-white">Reason</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-white">Attachment</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-white">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr
              v-for="(data, index) in formData"
              :key="data.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="px-6 py-4 text-sm whitespace-nowrap">{{ data.id }}</td>
              <td class="px-6 py-4 text-sm whitespace-nowrap">{{ data.leave_type?.name }}</td>
              <td class="px-6 py-4 text-sm whitespace-nowrap">{{ data.start_date }}</td>
              <td class="px-6 py-4 text-sm whitespace-nowrap">{{ data.end_date }}</td>
              <td class="px-6 py-4 text-sm whitespace-nowrap">{{ data.duration_label }}</td>
              <td class="px-6 py-4 text-sm whitespace-nowrap">{{ data.reason }}</td>
              <td class="px-6 py-4 text-sm whitespace-nowrap">
                <span v-if="data.attachment">
                  <i :class="getAttachmentIcon(data.attachment.type)" class="mr-1"></i>
                  {{ data.attachment.name }}
                </span>
                <span v-else>-</span>
              </td>
              <td class="px-6 py-4 text-sm whitespace-nowrap">
                <span
                  :class="{
                    'px-2 py-1 rounded-full text-xs': true,
                    'bg-gray-200 text-gray-800': data.status.id === '1',
                    'bg-green-200 text-green-800': data.status.id === '2',
                    'bg-red-200 text-red-800': data.status.id === '3'
                  }"
                >
                  {{ data.status.label }}
                </span>
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

// Filter object with date filters
const filter = reactive({
  leave_type: null,
  duration: null,
  start_date: null,
  end_date: null,
});

const formData = ref([]);
const leaveTypeOptions = ref([]);
const currentPage = ref(1);
const itemsPerPage = 6;
const totalItems = ref(0);

// Add sorting state
const sortBy = ref(null); // Current column to sort by
const sortDirection = ref('asc'); // Default sort direction

const durationOptions = ref([
  { value: 'full_day', label: "Full Day" },
  { value: 'half_day', label: "Half Day" },
]);

// Function to get attachment icon class (using FontAwesome as an example)
const getAttachmentIcon = (type) => {
  return type === 'pdf' ? 'fas fa-file-pdf' : 'fas fa-file-word';
};

watch([() => filter.leave_type, () => filter.duration, () => filter.start_date, () => filter.end_date, currentPage, sortBy, sortDirection], () => {
  getData();
});

const getLeaveTypes = async () => {
  try {
      const data = await $fetch('/api/setting/leave-types')
      if (data) {
          leaveTypeOptions.value = data.data
      }
  } catch (error) {
      console.error('Failed to fetch data', error)
  }
}

const getData = async () => {
  try {
    const response = await $fetch('/api/leave-requests',{
      method: 'GET',
      query: {
        leave_type: filter.leave_type,
        duration: filter.duration,
        start_date: filter.start_date,
        end_date: filter.end_date,
        page: currentPage.value,
        per_page: itemsPerPage,
        sort_by: sortBy.value, // Add sort_by to query
        sort_direction: sortDirection.value, // Add sort_direction to query
      }
    })

    formData.value = response.data;
    totalItems.value = response.meta.total;

    console.log('formData filled:' ,formData.value)
  } catch (error){
    console.error('Failed to fetch user', error)
  }
};


const resetFilter = () =>{
  filter.leave_type = null;
  filter.duration = null;
  filter.start_date = null;
  filter.end_date = null;
  currentPage.value = 1;
  sortBy.value = null; // Reset sorting
  sortDirection.value = 'asc';
  getData();
}

onMounted(() => {
  getLeaveTypes(),
  getData()
})


</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
</style>