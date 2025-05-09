<template>
  <div class="p-2 space-y-4">
    <!-- Stats Cards (Customizable) -->
    <div v-if="visibleStats.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div 
        v-for="stat in visibleStats" 
        :key="stat.key" 
        class="bg-white p-4 rounded-lg shadow-md"
      >
        <h3 class="text-base font-semibold text-gray-700">{{ stat.label }}</h3>
        <p class="text-2xl font-bold text-emerald-600 mt-1">{{ stat.value }}</p>
        <p class="text-xs text-gray-500 mt-1">{{ stat.subtext }}</p>
      </div>
    </div>
    <!-- Stats Toggle Button -->
    <div class="flex justify-end">
      <button 
        @click="showStatsModal = true" 
        class="text-sm text-emerald-600 hover:underline"
      >
        Customize Stats
      </button>
    </div>

    <div class="bg-white p-4 rounded-lg shadow-md">
        <h3 class="text-base font-semibold text-gray-700 mb-3">Leave Calendar</h3>
        <FullCalendar :options="calendarOptions" class="fc" />
    </div>

    <!-- Enhanced Leave Requests Table -->
    <div class="bg-white p-4 rounded-lg shadow-md">
      <div class="flex justify-between items-center mb-3">
        <h3 class="text-base font-semibold text-gray-700">Recent Leave Requests</h3>
        <select 
          v-model="statusFilter" 
          class="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-gray-50 text-gray-700">
            <th class="p-2 text-sm font-semibold">Employee</th>
            <th class="p-2 text-sm font-semibold">Leave Type</th>
            <th class="p-2 text-sm font-semibold">Start Date</th>
            <th class="p-2 text-sm font-semibold">End Date</th>
            <th class="p-2 text-sm font-semibold">Status</th>
            <th class="p-2 text-sm font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="request in filteredRequests" 
            :key="request.id" 
            class="border-b border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <td class="p-2 text-sm text-gray-700">{{ request.employee }}</td>
            <td class="p-2 text-sm text-gray-700">{{ request.type }}</td>
            <td class="p-2 text-sm text-gray-700">{{ request.startDate }}</td>
            <td class="p-2 text-sm text-gray-700">{{ request.endDate }}</td>
            <td class="p-2">
              <span :class="[
                'px-2 py-1 rounded-full text-xs font-medium',
                request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                request.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                'bg-red-100 text-red-800'
              ]">
                {{ request.status }}
              </span>
            </td>
            <td class="p-2">
              <button 
                class="px-2 py-1 text-xs font-semibold text-emerald-600 border border-emerald-600 rounded hover:bg-emerald-50 transition-colors"
                @click="handleAction(request)"
              >
                Review
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Stats Customization Modal (Simple) -->
    <div v-if="showStatsModal" class="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-4 rounded-lg shadow-lg w-80">
        <h3 class="text-lg font-semibold mb-3">Customize Stats</h3>
        <div v-for="stat in allStats" :key="stat.key" class="flex items-center mb-2">
          <input 
            type="checkbox" 
            :id="stat.key" 
            v-model="stat.visible" 
            :disabled="!stat.visible && visibleStats.length >= 6"
            class="mr-2"
          >
          <label :for="stat.key" class="text-sm text-gray-700">{{ stat.label }}</label>
        </div>
        <p class="text-xs text-gray-500 mt-2">Select 3–6 stats</p>
        <button 
          @click="showStatsModal = false" 
          class="mt-4 w-full px-3 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

// Stats Customization
const allStats = ref([
  { key: 'pending', label: 'Pending Requests', value: 12, subtext: 'Awaiting approval', visible: true },
  { key: 'approved', label: 'Approved This Month', value: 45, subtext: 'Total approved leaves', visible: true },
  { key: 'today', label: 'Today’s Leave Count', value: 3, subtext: 'Employees off today', visible: true },
  { key: 'rejected', label: 'Rejected This Month', value: 8, subtext: 'Total rejected leaves', visible: false },
  { key: 'upcoming', label: 'Upcoming Leaves', value: 15, subtext: 'Next 30 days', visible: false },
  { key: 'overdue', label: 'Overdue Approvals', value: 2, subtext: 'Past due date', visible: false }
]);
const visibleStats = computed(() => allStats.value.filter(stat => stat.visible));
const showStatsModal = ref(false);

// Calendar configuration for FullCalendar
const calendarOptions = ref({
  plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
  initialView: 'dayGridMonth',
  initialDate: '2025-03-01',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,listWeek'
  },
  events: computed(() => {
    // Map leave requests to calendar events
    return leaveRequests.value.map(request => ({
      title: `${request.employee} - ${request.type}`,
      start: request.startDate,
      end: request.endDate,
      classNames: [
        request.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
        request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
        'bg-red-100 text-red-800'
      ]
    }));
  }),
  eventClick: (info) => {
    const request = leaveRequests.value.find(r => 
      r.employee === info.event.title.split(' - ')[0] && 
      r.startDate === info.event.startStr
    );
    if (request) handleAction(request);
  }
});

// Leave Requests
const leaveRequests = ref([
  { id: 1, employee: 'Muhammad Hanif', type: 'Annual', startDate: '2025-04-01', endDate: '2025-04-03', status: 'Pending' },
  { id: 2, employee: 'Jane Doe', type: 'Sick', startDate: '2025-03-28', endDate: '2025-03-29', status: 'Reject' },
  { id: 3, employee: 'John Smith', type: 'Maternity', startDate: '2025-05-01', endDate: '2025-07-01', status: 'Pending' }
]);
const statusFilter = ref('All');
const filteredRequests = computed(() => {
  if (statusFilter.value === 'All') return leaveRequests.value;
  return leaveRequests.value.filter(r => r.status === statusFilter.value);
});

const handleAction = (request) => {
  console.log(`Reviewing leave request for ${request.employee}`);
};
</script>

