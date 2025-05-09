<template>
  <div class="bg-white p-6 rounded-xl shadow-lg">
    <!-- <div class="bg-emerald-600 text-white py-3 px-6 rounded-t-xl flex items-center justify-between">
      <span class="text-lg font-bold">Payslips</span>
    </div> -->
    <div class="bg-emerald-600 text-white py-3 px-6 border-b flex items-center">
      <span class="text-sm font-bold">Payslips</span>
    </div>

    <!-- Filters -->
    <div class="mt-4 px-6">
      <div class="flex flex-wrap gap-4">
        <div class="flex-1 min-w-[200px]">
          <UFormField label="Employee" :ui="{ label: 'text-sm font-semibold text-gray-700' }">
            <UInput 
              v-model="filters.employee" 
              placeholder="Search by employee name" 
              size="lg" 
              class="w-full"
            />
          </UFormField>
        </div>
        <div class="flex-1 min-w-[200px]">
          <UFormField label="Date Range" :ui="{ label: 'text-sm font-semibold text-gray-700' }">
            <UInput 
              v-model="filters.dateRange" 
              type="date" 
              size="lg" 
              class="w-full"
            />
          </UFormField>
        </div>
        <div class="flex-1 min-w-[200px]">
          <UFormField label="Status" :ui="{ label: 'text-sm font-semibold text-gray-700' }">
            <USelect 
              v-model="filters.status" 
              :options="statusOptions" 
              placeholder="Select status" 
              size="lg" 
              class="w-full"
            />
          </UFormField>
        </div>
        <div class="self-end">
          <UButton 
            color="primary" 
            variant="solid" 
            label="Apply Filters" 
            size="lg" 
            @click="applyFilters"
          />
        </div>
      </div>
    </div>

    <!-- Payslip Table -->
    <div class="mt-6 overflow-x-auto">
      <table class="min-w-full">
        <thead class="bg-emerald-600 text-white">
          <tr>
            <th class="px-6 py-3 text-left text-sm font-semibold">Employee</th>
            <th class="px-6 py-3 text-left text-sm font-semibold">Pay Period</th>
            <th class="px-6 py-3 text-left text-sm font-semibold">Net Pay</th>
            <th class="px-6 py-3 text-left text-sm font-semibold">Status</th>
            <th class="px-6 py-3 text-left text-sm font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
          <tr 
            v-for="payslip in filteredPayslips" 
            :key="payslip.id" 
            class="hover:bg-gray-50 transition-colors duration-150"
          >
            <td class="px-6 py-4 text-sm whitespace-nowrap">{{ payslip.employee }}</td>
            <td class="px-6 py-4 text-sm whitespace-nowrap">{{ payslip.payPeriod }}</td>
            <td class="px-6 py-4 text-sm whitespace-nowrap">{{ formatCurrency(payslip.netPay) }}</td>
            <td class="px-6 py-4 text-sm whitespace-nowrap">
              <span 
                :class="[
                  'px-2 py-1 rounded-full text-xs font-semibold',
                  payslip.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                ]"
              >
                {{ payslip.status }}
              </span>
            </td>
            <td class="px-6 py-4 text-sm whitespace-nowrap">
              <UButton 
                color="primary" 
                variant="outline" 
                size="sm" 
                label="View PDF" 
                @click="viewPdf(payslip.id)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="mt-6 flex justify-end px-6">
      <UPagination 
        v-model:page="currentPage" 
        :total="payslips.length" 
        :items-per-page="itemsPerPage" 
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Dummy payslip data
const payslips = ref([
  { id: 1, employee: "John Doe", payPeriod: "Mar 2025", netPay: 3500, status: "Paid" },
  { id: 2, employee: "Jane Smith", payPeriod: "Mar 2025", netPay: 3200, status: "Pending" },
  { id: 3, employee: "Alice Johnson", payPeriod: "Feb 2025", netPay: 3800, status: "Paid" },
  { id: 4, employee: "Bob Brown", payPeriod: "Feb 2025", netPay: 3000, status: "Paid" },
]);

// Filter state
const filters = ref({
  employee: '',
  dateRange: '',
  status: '',
});

// Pagination
const currentPage = ref(1);
const itemsPerPage = 10;

// Status options for filter
const statusOptions = [
  { label: "All", value: "" },
  { label: "Paid", value: "Paid" },
  { label: "Pending", value: "Pending" },
];

// Computed property for filtered and paginated payslips
const filteredPayslips = computed(() => {
  let result = payslips.value;

  // Filter by employee name
  if (filters.value.employee) {
    result = result.filter(p => 
      p.employee.toLowerCase().includes(filters.value.employee.toLowerCase())
    );
  }

  // Filter by date range (assuming payPeriod is in "MMM YYYY" format)
  if (filters.value.dateRange) {
    const filterDate = new Date(filters.value.dateRange);
    result = result.filter(p => {
      const [month, year] = p.payPeriod.split(' ');
      const payslipDate = new Date(`${month} 1, ${year}`);
      return payslipDate.getMonth() === filterDate.getMonth() && 
             payslipDate.getFullYear() === filterDate.getFullYear();
    });
  }

  // Filter by status
  if (filters.value.status) {
    result = result.filter(p => p.status === filters.value.status);
  }

  // Pagination
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return result.slice(start, end);
});

// Format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

// Apply filters (reset pagination)
const applyFilters = () => {
  currentPage.value = 1; // Reset to first page when filters change
};

// View PDF action
const viewPdf = (payslipId) => {
  // Simulate PDF generation/download (replace with actual logic)
  const payslip = payslips.value.find(p => p.id === payslipId);
  console.log(`Generating PDF for payslip ID ${payslipId}:`, payslip);
  
  // Placeholder for PDF generation - you can use jsPDF or a backend API
  alert(`Viewing PDF for ${payslip.employee} - ${payslip.payPeriod}`);
  // Example: window.open(`/api/payslips/${payslipId}/pdf`, '_blank');
};
</script>