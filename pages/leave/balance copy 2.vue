<template>
  <div class="bg-white p-4 rounded-lg shadow-md">
    <div class="mt-2">
      <!-- Header -->
      <div class="bg-emerald-600 text-white py-3 px-6 border-b flex items-center justify-between">
        <!-- <span class="text-sm font-bold">Leave Balance - {{ user.name }}</span> -->
        <div class="flex items-center space-x-4">
          <USelect v-model="filter.year" :items="yearOptions" class="w-32" placeholder="Select Year"></USelect>
          <USelect
            v-model="selectedLeaveTypes"
            :items="leaveTypeOptions"
            multiple
            class="w-64"
            placeholder="Select Leave Types (3-6)"
            :min="3"
            :max="6"
            label-key="name"
            value-key="id"
          ></USelect>
        </div>
      </div>

      <!-- Chart and Reminder -->
      <div class="mt-4">
        <!-- Leave Balance Chart -->
        <!-- <div class="w-full h-72 mb-4">
          <canvas ref="leaveChart"></canvas>
        </div> -->

        {{ formData }}

        <!-- Prorated and Carry Forward Reminder -->
        <div class="text-sm text-gray-600 italic mb-4">
          *Note: Annual Leave (AL) entitlement is
          <span v-if="prorated">prorated (see Eligible column)</span>
          <span v-else>fixed</span>
          and may not reflect the full yearly allocation.
          <span v-if="carryForwardAllowed">Carry-forward leave is added to AL and valid until May 31.</span>
        </div>
      </div>

      <!-- Leave Balance Table -->
      <div class="min-w-full shadow-sm">
        <table class="min-w-full">
          <thead class="bg-emerald-600">
            <tr>
              <th class="px-6 py-3 text-left text-sm font-semibold text-white">Leave Type</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-white">Entitlement</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-white">Eligible</th>
              <th v-if="carryForwardAllowed" class="px-6 py-3 text-left text-sm font-semibold text-white">Carry Forward</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-white">Used</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-white">Balance</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr v-for="data in formData" :key="data.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 text-sm whitespace-nowrap">{{ data.leave_type?.name }}</td>
              <td class="px-6 py-4 text-sm whitespace-nowrap">{{ data.entitlement.toFixed(2) }}</td>
              <td class="px-6 py-4 text-sm whitespace-nowrap">{{ data.eligible.toFixed(2) }}</td>
              <td v-if="carryForwardAllowed" class="px-6 py-4 text-sm whitespace-nowrap">
                {{ data.carry_forward.toFixed(2) || 0 }}
              </td>
              <td class="px-6 py-4 text-sm whitespace-nowrap">{{ data.used.toFixed(2) }}</td>
              <td class="px-6 py-4 text-sm whitespace-nowrap">
                <span class="font-semibold">{{ data.balance.toFixed(2) }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(ChartDataLabels);

const formData = ref([]);
const leaveTypeOptions = ref([]);
const filter = reactive({
  year: "",
  leave_type: [],
})

const currentYear = new Date().getFullYear(); // 2025

const yearOptions = computed(() => {
  const years = [];
  for (let year = currentYear - 5; year <= currentYear; year++) {
    years.push({ label: String(year), value: year });
  }
  return years;
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
    const response = await $fetch('/api/leave/balances',{
      method: 'GET',
      query:{
        year: filter.year,
        leave_type: filter.year,
      }
    })

    formData.value = response.data;

  } catch (error){
    console.error('Failed to fetch data', error)
  }
};


watch([() => filter.year, () => filter.leave_type], () => {
  getData();
});

// Initialize chart on mount and update on changes
onMounted(() => {
  // updateChart();
  getData();
  getLeaveTypes();
});
</script>

<style>
canvas {
  max-height: 100%;
  width: 100%;
}
</style>