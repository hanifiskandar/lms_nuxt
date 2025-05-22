<template>
  <div class="mt-2 mb-6">

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
            <th v-if="showAction" class="px-6 py-3 text-left text-sm font-semibold text-white">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
          <tr
            v-for="(data, index) in dataList"
            :key="data.id"
            class="hover:bg-gray-50 transition-colors"
          >
            <td class="px-6 py-4 text-sm whitespace-nowrap">{{ index + 1 }}</td>
            <td class="px-6 py-4 text-sm whitespace-nowrap">{{ data.leave_type?.name }}</td>
            <td class="px-6 py-4 text-sm whitespace-nowrap">{{ data.start_date }}</td>
            <td class="px-6 py-4 text-sm whitespace-nowrap">{{ data.end_date }}</td>
            <td class="px-6 py-4 text-sm whitespace-nowrap">{{ data.duration_label }}</td>
            <td class="px-6 py-4 text-sm whitespace-nowrap">{{ data.reason }}</td>
            <td class="px-6 py-4 text-sm whitespace-nowrap">
              <span v-if="data.file_original_name">
                <a :href="getFileUrl(data.file_path)" target="_blank" class="flex items-center text-blue-600 hover:underline">
                  <i :class="getAttachmentIcon(data.file_original_name)" class="mr-1"></i>
                  {{ data.file_original_name }}
                </a>
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
            <td v-if="showAction" class="px-6 py-4 text-sm whitespace-nowrap space-x-2">
              <UButton color="primary" size="sm" @click="$emit('approve', data)">Approve</UButton>
              <UButton color="error" size="sm" @click="$emit('reject', data)">Reject</UButton>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue';

const props = defineProps({
  dataList: Array,
  showAction: Boolean,
});

const emit = defineEmits(['approve', 'reject']);

const config = useRuntimeConfig();

const getFileUrl = (filePath) => {
  return filePath ? `${config.public.laravelBaseUrl}/storage/${filePath}` : '#';
};

const getAttachmentIcon = (fileName) => {
  if (!fileName) return 'fas fa-file';
  const extension = fileName.split('.').pop().toLowerCase();
  switch (extension) {
    case 'pdf': return 'fas fa-file-pdf';
    case 'jpg':
    case 'jpeg':
    case 'png': return 'fas fa-file-image';
    default: return 'fas fa-file';
  }
};
</script>
