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
            <USelect v-model="filter.leave_type" :items="leaveTypeOptions" class="w-48 mt-6" placeholder="Select Leave Type"></USelect>
          </div>
          <div class="flex flex-col">
            <USelect v-model="filter.duration" :items="durationOptions" class="w-48 mt-6" placeholder="Select Leave Type"></USelect>
          </div>
          <div class="flex flex-col">
            <label for="start-date" class="text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <UInput v-model="filter.start_date" type="date" id="start-date" class="w-48"></UInput>
          </div>
          <div class="flex flex-col">
            <label for="end-date" class="text-sm font-medium text-gray-700 mb-1">End Date</label>
            <UInput v-model="filter.end_date" type="date" id="end-date" class="w-48"></UInput>
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
              v-for="data in paginatedData"
              :key="data.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="px-6 py-4 text-sm whitespace-nowrap">{{ data.id }}</td>
              <td class="px-6 py-4 text-sm whitespace-nowrap">{{ getLeaveTypeLabel(data.type) }}</td>
              <td class="px-6 py-4 text-sm whitespace-nowrap">{{ data.start_date }}</td>
              <td class="px-6 py-4 text-sm whitespace-nowrap">{{ data.end_date }}</td>
              <td class="px-6 py-4 text-sm whitespace-nowrap">{{ getDurationLabel(data.duration) }}</td>
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
                    'bg-gray-200 text-gray-800': data.status === 'Pending',
                    'bg-red-200 text-red-800': data.status === 'Rejected',
                    'bg-green-200 text-green-800': data.status === 'Approved'
                  }"
                >
                  {{ data.status }}
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
          :total="filteredData.length"
          :items-per-page="itemsPerPage"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Filter object with date filters
const filter = ref({
  leave_type: null,
  duration: null,
  start_date: null,
  end_date: null,
});

const currentPage = ref(1);
const itemsPerPage = 6;

// Leave Types
const leaveType = ref([
  { value: 1, label: "Annual Leave" },
  { value: 2, label: "Sick Leave" },
  { value: 3, label: "Maternity Leave" },
  { value: 4, label: "Paternity Leave" },
  { value: 5, label: "Emergency Leave" },
  { value: 6, label: "Unpaid Leave" },
  { value: 7, label: "Compassionate Leave" },
  { value: 8, label: "Study Leave" },
  { value: 9, label: "Hospitalization Leave" },
  { value: 10, label: "Marriage Leave" },
]);

const leaveTypeOptions = computed(() => [
  { label: 'All Leave', value: null },
  ...leaveType.value.map(d => ({ label: d.label, value: d.value })),
]);

// Duration
const duration = ref([
  { value: 1, label: "Full Day" },
  { value: 2, label: "Half Day" },
]);

const durationOptions = computed(() => [
  { label: 'All Duration', value: null },
  ...duration.value.map(d => ({ label: d.label, value: d.value })),
]);

// Dummy Data with Attachments
const formData = ref([
  { id: 1, type: 1, start_date: '2025-04-15', end_date: '2025-04-17', duration: 1, reason: 'Family vacation', status: 'Approved', attachment: { name: 'vacation_plan.pdf', type: 'pdf' } },
  { id: 2, type: 2, start_date: '2025-04-10', end_date: '2025-04-10', duration: 1, reason: 'Fever and flu', status: 'Pending', attachment: { name: 'medical_cert.doc', type: 'doc' } },
  { id: 3, type: 5, start_date: '2025-04-20', end_date: '2025-04-20', duration: 2, reason: 'Family emergency', status: 'Approved', attachment: null },
  { id: 4, type: 3, start_date: '2025-05-01', end_date: '2025-06-15', duration: 1, reason: 'Childbirth', status: 'Approved', attachment: { name: 'birth_cert.pdf', type: 'pdf' } },
  { id: 5, type: 6, start_date: '2025-04-25', end_date: '2025-04-27', duration: 1, reason: 'Personal matters', status: 'Rejected', attachment: null },
  { id: 6, type: 9, start_date: '2025-04-12', end_date: '2025-04-14', duration: 1, reason: 'Hospital admission', status: 'Pending', attachment: { name: 'hospital_bill.pdf', type: 'pdf' } },
  { id: 7, type: 7, start_date: '2025-04-18', end_date: '2025-04-20', duration: 1, reason: 'Family bereavement', status: 'Approved', attachment: { name: 'death_cert.doc', type: 'doc' } },
  { id: 8, type: 10, start_date: '2025-05-05', end_date: '2025-05-07', duration: 1, reason: 'Wedding ceremony', status: 'Pending', attachment: { name: 'wedding_invite.pdf', type: 'pdf' } },
  { id: 9, type: 8, start_date: '2025-04-22', end_date: '2025-04-23', duration: 1, reason: 'Exam preparation', status: 'Rejected', attachment: null },
  { id: 10, type: 4, start_date: '2025-05-02', end_date: '2025-05-04', duration: 1, reason: 'Newborn care', status: 'Approved', attachment: { name: 'paternity_proof.doc', type: 'doc' } },
]);

// Computed to get Leave Type Label
const getLeaveTypeLabel = (typeId) => {
  const leave = leaveType.value.find(l => l.value === typeId);
  return leave ? leave.label : 'Unknown';
};

// Computed to get Duration Label
const getDurationLabel = (durationId) => {
  const dur = duration.value.find(d => d.value === durationId);
  return dur ? dur.label : 'Unknown';
};

// Function to get attachment icon class (using FontAwesome as an example)
const getAttachmentIcon = (type) => {
  return type === 'pdf' ? 'fas fa-file-pdf' : 'fas fa-file-word';
};

// Filter Logic with Date Range
const filteredData = computed(() => {
  return formData.value.filter(form => {
    const formStartDate = new Date(form.start_date);
    const formEndDate = new Date(form.end_date);
    const filterStartDate = filter.value.start_date ? new Date(filter.value.start_date) : null;
    const filterEndDate = filter.value.end_date ? new Date(filter.value.end_date) : null;

    return (
      (filter.value.leave_type === null || form.type === filter.value.leave_type) &&
      (filter.value.duration === null || form.duration === filter.value.duration) &&
      (filterStartDate === null || formStartDate >= filterStartDate) &&
      (filterEndDate === null || formEndDate <= filterEndDate)
    );
  });
});

// Pagination Logic
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredData.value.slice(start, end);
});
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
</style>