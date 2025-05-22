<template>
  <div class="bg-white p-4 rounded-lg shadow-md">
    <div class="mt-2">
        <div class="bg-emerald-600 text-white py-3 px-6 border-b flex items-center">
          <span class="text-sm font-bold">Report Leave Requests</span>
        </div>

        <div class="flex flex-wrap items-center justify-between mb-4 mt-4">

        <div class="flex space-x-4">
          <USelect v-model="filter.leave_type" :items="leaveTypeOptions" class="w-48" label-key="name" value-key="id" placeholder="Select Leave Type" />
          <USelect v-model="filter.duration" :items="durationOptions" class="w-48" placeholder="Select Duration Type" />
          <UInput v-model="filter.start_date" type="date" class="w-48" size="lg" />
          <UInput v-model="filter.end_date" type="date" class="w-48" size="lg" />

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

const leaveTypeOptions = ref([])
const durationOptions = ref([
  { value: 'full_day', label: 'Full Day' },
  { value: 'half_day', label: 'Half Day' },
])

const getLeaveTypes = async () => {
  const res = await $fetch('/api/setting/leave-types')
  leaveTypeOptions.value = res.data
}


const filter = reactive({
  designation: null,
  department: null,
})


const exportToPDF = async () => {
  try {
    const response = await $fetch('/api/leave/export/pdf', {
      method: 'GET',
      query: {
        leave_type: filter.leave_type,
        duration: filter.duration,
        start_date: filter.start_date,
        end_date: filter.end_date,
        department: filter.department,
      },
      responseType: 'blob', // Important for binary file response
    });

    downloadFile(new Blob([response], { type: 'application/pdf' }), 'leave-requests.pdf');
  } catch (error) {
    console.error('Failed to export PDF:', error);
  }
};

const exportToExcel = async () => {
  try {
    const response = await $fetch('/api/leave/export/excel', {
      method: 'GET',
      query: {
        leave_type: filter.leave_type,
        duration: filter.duration,
        start_date: filter.start_date,
        end_date: filter.end_date,
      },
      responseType: 'blob',
    });

    downloadFile(new Blob([response]), 'leave-requests.xlsx');
  } catch (error) {
    console.error('Failed to export Excel:', error);
  }
};

const resetFilter = () =>{
  filter.leave_type = null
  filter.duration = null
  filter.start_date = null
  filter.end_date = null
}

onMounted(() => {
  getLeaveTypes()

})
</script>