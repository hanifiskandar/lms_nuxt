<template>
  <div class="bg-white p-4 rounded-lg shadow-md">
    <div class="mt-2">
      <!-- Header -->
      <div class="bg-emerald-600 text-white py-3 px-6 border-b flex items-center justify-between">
        <span class="text-sm font-bold">Leave Balance - {{ user.name }}</span>
        <div class="flex items-center space-x-4">
          <USelect v-model="selectedYear" :items="yearOptions" class="w-32" placeholder="Select Year"></USelect>
          <USelect
            v-model="selectedLeaveTypes"
            :items="leaveTypeOptions"
            multiple
            class="w-64"
            placeholder="Select Leave Types (3-6)"
            :min="3"
            :max="6"
          ></USelect>
        </div>
      </div>

      <!-- Chart and Reminder -->
      <div class="mt-4">
        <!-- Leave Balance Chart -->
        <div class="w-full h-72 mb-4">
          <canvas ref="leaveChart"></canvas>
        </div>

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
            <tr v-for="balance in filteredLeaveBalances" :key="balance.type" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 text-sm whitespace-nowrap">{{ getLeaveTypeLabel(balance.type) }}</td>
              <td class="px-6 py-4 text-sm whitespace-nowrap">{{ balance.entitlement.toFixed(2) }}</td>
              <td class="px-6 py-4 text-sm whitespace-nowrap">{{ balance.eligible.toFixed(2) }}</td>
              <td v-if="carryForwardAllowed" class="px-6 py-4 text-sm whitespace-nowrap">
                {{ balance.carryForward.toFixed(2) || 0 }}
              </td>
              <td class="px-6 py-4 text-sm whitespace-nowrap">{{ balance.used.toFixed(2) }}</td>
              <td class="px-6 py-4 text-sm whitespace-nowrap">
                <span class="font-semibold">{{ balance.remaining.toFixed(2) }}</span>
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

// Dummy user data
const user = ref({
  id: 1,
  name: 'John Doe',
});

// Expanded leave types
const leaveType = ref([
  { value: 1, label: "Annual Leave" },
  { value: 2, label: "Sick Leave" },
  { value: 3, label: "Maternity Leave" },
  { value: 4, label: "Paternity Leave" },
  { value: 5, label: "Emergency Leave" },
  { value: 9, label: "Hospitalization Leave" },
]);

const leaveTypeOptions = computed(() => leaveType.value.map(t => ({ label: t.label, value: t.value })));

// Flags
const carryForwardAllowed = ref(true);
const prorated = ref(true);

// Dummy leave balance data with more types
const leaveBalances = ref({
  2025: [
    { type: 1, entitlement: 15.0, eligible: 12.5, carryForward: 5.0, used: 3.5, remaining: 14.0, carryForwardExpires: '2025-05-31' }, // AL
    { type: 2, entitlement: 12.0, eligible: 12.0, carryForward: 0.0, used: 2.0, remaining: 10.0, carryForwardExpires: null },       // MC
    { type: 3, entitlement: 60.0, eligible: 60.0, carryForward: 0.0, used: 0.0, remaining: 60.0, carryForwardExpires: null },       // Maternity
    { type: 4, entitlement: 14.0, eligible: 14.0, carryForward: 0.0, used: 7.0, remaining: 7.0, carryForwardExpires: null },        // Paternity
    { type: 5, entitlement: 5.0, eligible: 5.0, carryForward: 0.0, used: 2.5, remaining: 2.5, carryForwardExpires: null },          // EL
    { type: 9, entitlement: 30.0, eligible: 30.0, carryForward: 0.0, used: 5.0, remaining: 25.0, carryForwardExpires: null },       // Hospitalization
  ],
  2024: [
    { type: 1, entitlement: 15.0, eligible: 12.0, carryForward: 3.0, used: 5.5, remaining: 9.5, carryForwardExpires: '2024-05-31' },  // AL
    { type: 2, entitlement: 12.0, eligible: 12.0, carryForward: 0.0, used: 3.0, remaining: 9.0, carryForwardExpires: null },        // MC
    { type: 3, entitlement: 60.0, eligible: 60.0, carryForward: 0.0, used: 30.0, remaining: 30.0, carryForwardExpires: null },      // Maternity
    { type: 4, entitlement: 14.0, eligible: 14.0, carryForward: 0.0, used: 0.0, remaining: 14.0, carryForwardExpires: null },       // Paternity
    { type: 5, entitlement: 5.0, eligible: 5.0, carryForward: 0.0, used: 2.0, remaining: 3.0, carryForwardExpires: null },         // EL
    { type: 9, entitlement: 30.0, eligible: 30.0, carryForward: 0.0, used: 0.0, remaining: 30.0, carryForwardExpires: null },       // Hospitalization
  ],
});

// Year filter
const currentYear = new Date().getFullYear(); // 2025
const selectedYear = ref(currentYear);

const yearOptions = computed(() => {
  const years = [];
  for (let year = currentYear - 5; year <= currentYear; year++) {
    years.push({ label: String(year), value: year });
  }
  return years;
});

// Selected leave types for chart (default to first 6)
const selectedLeaveTypes = ref([1, 2, 3, 4, 5, 9]); // AL, MC, Maternity, Paternity, EL, Hospitalization

// Filtered leave balances
const filteredLeaveBalances = computed(() => {
  const balances = leaveBalances.value[selectedYear.value] || [];
  const today = new Date('2025-04-09'); // Hardcoded for testing
  const cutoffDate = new Date(`${selectedYear.value}-05-31`);

  return balances.map(balance => {
    let totalAvailable = balance.eligible;
    let adjustedRemaining = balance.remaining;

    if (carryForwardAllowed.value && balance.carryForward && balance.type === 1) {
      if (today <= cutoffDate) {
        totalAvailable += balance.carryForward;
        adjustedRemaining = totalAvailable - balance.used;
      } else {
        adjustedRemaining = balance.eligible - balance.used;
      }
    } else {
      adjustedRemaining = balance.eligible - balance.used;
    }

    return {
      ...balance,
      totalAvailable: totalAvailable,
      remaining: adjustedRemaining,
    };
  });
});

// Filtered balances for chart (limited to selected types)
const chartLeaveBalances = computed(() => {
  const allBalances = filteredLeaveBalances.value;
  return allBalances.filter(balance => selectedLeaveTypes.value.includes(balance.type));
});

// Get leave type label
const getLeaveTypeLabel = (typeId) => {
  const leave = leaveType.value.find(l => l.value === typeId);
  return leave ? leave.label : 'Unknown';
};

// Chart setup
const leaveChart = ref(null);
let chartInstance = null;

const updateChart = () => {
  const balances = chartLeaveBalances.value;
  const labels = balances.map(b => getLeaveTypeLabel(b.type));

  if (chartInstance) {
    chartInstance.destroy();
  }

  const ctx = leaveChart.value.getContext('2d');

  // Gradient colors
  const balanceGradient = ctx.createLinearGradient(0, 0, 0, 300);
  balanceGradient.addColorStop(0, 'rgba(16, 185, 129, 0.8)');
  balanceGradient.addColorStop(1, 'rgba(16, 185, 129, 0.4)');

  const carryForwardGradient = ctx.createLinearGradient(0, 0, 0, 300);
  carryForwardGradient.addColorStop(0, 'rgba(54, 162, 235, 0.8)');
  carryForwardGradient.addColorStop(1, 'rgba(54, 162, 235, 0.4)');

  const usedGradient = ctx.createLinearGradient(0, 0, 0, 300);
  usedGradient.addColorStop(0, 'rgba(255, 99, 132, 0.8)');
  usedGradient.addColorStop(1, 'rgba(255, 99, 132, 0.4)');

  const datasets = [
    {
      label: 'Balance',
      data: balances.map(b => {
        const baseRemaining = b.eligible - b.used;
        return carryForwardAllowed.value && b.carryForward && new Date('2025-04-09') <= new Date(`${selectedYear.value}-05-31`)
          ? baseRemaining
          : b.remaining;
      }),
      backgroundColor: balanceGradient,
      borderColor: 'rgba(16, 185, 129, 1)',
      borderWidth: 1,
    },
    ...(carryForwardAllowed.value
      ? [{
          label: 'Carry Forward',
          data: balances.map(b => (b.carryForward && new Date('2025-04-09') <= new Date(`${selectedYear.value}-05-31`) ? b.carryForward : 0)),
          backgroundColor: carryForwardGradient,
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        }]
      : []),
    {
      label: 'Used',
      data: balances.map(b => b.used),
      backgroundColor: usedGradient,
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
  ];

  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: datasets,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1000,
        easing: 'easeOutBounce',
      },
      scales: {
        x: {
          stacked: true,
          grid: { display: false },
        },
        y: {
          stacked: true,
          beginAtZero: true,
          title: {
            display: true,
            text: 'Days',
            font: { size: 14, weight: 'bold' },
          },
          grid: { color: 'rgba(0, 0, 0, 0.05)' },
        },
      },
      plugins: {
        legend: {
          position: 'top',
          labels: {
            font: { size: 12, family: 'Arial' },
            padding: 20,
          },
        },
        title: {
          display: true,
          text: `Leave Balance for ${selectedYear.value}`,
          font: { size: 18, weight: 'bold', family: 'Arial' },
          padding: { top: 10, bottom: 20 },
        },
        tooltip: {
          callbacks: {
            label: (context) => `${context.dataset.label}: ${context.parsed.y.toFixed(2)} days`,
          },
        },
        datalabels: {
          display: true,
          color: '#fff',
          font: { weight: 'bold' },
          formatter: (value) => (value > 0 ? value.toFixed(2) : ''),
          anchor: 'center',
          align: 'center',
        },
      },
    },
  });
};

// Initialize chart on mount and update on changes
onMounted(() => {
  updateChart();
});

watch([selectedYear, selectedLeaveTypes], () => {
  updateChart();
});
</script>

<style>
canvas {
  max-height: 100%;
  width: 100%;
}
</style>