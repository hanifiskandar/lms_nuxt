<template>
  <div class="flex flex-wrap items-center justify-between mb-4 mt-4">
    <div class="flex space-x-4">
      <div class="flex flex-col">
        <USelect v-model="filter.leave_type" :items="leaveTypeOptions" class="w-48 mt-6" label-key="name" value-key="id" placeholder="Select Leave Type" />
      </div>
      <div class="flex flex-col">
        <USelect v-model="filter.duration" :items="durationOptions" class="w-48 mt-6" placeholder="Select Duration Type" />
      </div>
      <div class="flex flex-col">
        <label class="text-sm text-gray-700 mb-1">Start Date</label>
        <UInput v-model="filter.start_date" type="date" class="w-48" />
      </div>
      <div class="flex flex-col">
        <label class="text-sm text-gray-700 mb-1">End Date</label>
        <UInput v-model="filter.end_date" type="date" class="w-48" />
      </div>
      <div class="flex flex-col">
        <UButton icon="heroicons:arrow-path" color="primary" size="md" class="mt-6" @click="$emit('reset')" />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['leaveTypeOptions', 'durationOptions', 'filter'])
defineEmits(['update:filter', 'reset'])
</script>
