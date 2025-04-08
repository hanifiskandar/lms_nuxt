<template>
  <div class="bg-white p-4 rounded-lg shadow-md">
    <div class="mt-2">
        <div class="bg-emerald-600 text-white py-3 px-6 border-b flex items-center">
          <span class="text-sm font-bold">List Employee</span>
        </div>

        <div class="flex flex-wrap items-center justify-between mb-4 mt-4">
        <!-- Search Bar -->
        <UInput
          v-model="searchQuery"
          placeholder="Search..."
          class="w-128"
          size="lg"
          color="gray"
          variant="outline"
        />

        <!-- Filters + New Button -->
        <div class="flex space-x-4">
          <USelect v-model="selectedDepartment" :items="departmentOptions" class="w-48"></USelect>
          <USelect v-model="selectedRole" :items="roleOptions" class="w-48"></USelect>
          <USelect
              v-model="selectedExport"
              :items="exportOptions"
              placeholder="Export"
              icon="i-heroicons-arrow-down-tray"
              @change="handleExport"
            />
          <NuxtLink to="/kawalan-capaian/pengurusan-kakitangan/baharu12">
            <UButton icon="mdi:account-plus" color="primary">New User</UButton>
          </NuxtLink>

        </div>
      </div>

      <!-- Table -->
      <div class="min-w-full shadow-sm">
        <table class="min-w-full">
          <thead class="bg-emerald-600">
            <tr>
              <th class="px-6 py-3 text-left text-sm font-semibold text-white">No</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-white">Name</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-white">Nric</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-white">Email</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-white">Designation</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-white">Department</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-white">Role</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-white">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr
              v-for="user in paginatedUsers"
              :key="user.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="px-6 py-4 text-sm whitespace-nowrap">{{ user.id }}</td>
              <td class="px-6 py-4 text-sm whitespace-nowrap">{{ user.name }}</td>
              <td class="px-6 py-4 text-sm whitespace-nowrap">{{ user.identification_no }}</td>
              <td class="px-6 py-4 text-sm whitespace-nowrap">{{ user.email }}</td>
              <td class="px-6 py-4 text-sm whitespace-nowrap">{{ user.designation }}</td>
              <td class="px-6 py-4 text-sm whitespace-nowrap">{{ user.department }}</td>
              <td class="px-6 py-4 text-sm whitespace-nowrap">{{ user.role }}</td>
              <td class="px-6 py-4 whitespace-nowrap flex space-x-2">
                <UButton @click="viewUser(user.id)" icon="i-heroicons-eye" class="text-blue-500 bg-white text-lg hover:scale-110 transition-transform duration-200" />
                <UButton @click="editUser(user.id)" icon="i-heroicons-pencil" class="text-yellow-500 bg-white text-lg hover:scale-110 transition-transform duration-200" />
                <UButton @click="deleteUser(user.id)" icon="i-heroicons-trash" class="text-red-500 bg-white text-lg hover:scale-110 transition-transform duration-200 " />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="mt-4 flex justify-end">
        <UPagination
          v-model:page="currentPage"
          :total="filteredUsers.length"
          :items-per-page="itemsPerPage"
        />
      </div>

    </div>
    <!-- Employee list here -->
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const searchQuery = ref('');
const selectedDepartment = ref(null);
const selectedRole = ref(null);
const selectedExport = ref(null);
const currentPage = ref(1); // Current page for pagination
const itemsPerPage = 6; // Number of users per page

const departments = ref(['Finance', 'HR', 'IT', 'Legal']);
const departmentOptions = computed(() => [
  { label: 'All Departments', value: null },
  ...departments.value.map(d => ({ label: d, value: d })),
]);

const roles = ref(['Admin', 'Manager', 'Staff']);
const roleOptions = computed(() => [
  { label: 'All Roles', value: null },
  ...roles.value.map(d => ({ label: d, value: d })),
]);

const exportOptions = ref([
  { label: 'CSV', value: 'csv', icon: 'i-heroicons-document-text' },
  { label: 'Excel', value: 'excel', icon: 'i-heroicons-table-cells' },
  { label: 'PDF', value: 'pdf', icon: 'i-heroicons-document' },
]);

const formData = ref([
  { id: 1, name: 'John Doe', mobile_phone: '012-3456789', email: 'john@example.com', department: 'IT', role: 'Admin', designation: 'IT Administrator', identification_no: '850214-01-1235' },
  { id: 2, name: 'Jane Smith', mobile_phone: '019-8765432', email: 'jane@example.com', department: 'HR', role: 'Manager', designation: 'HR Manager', identification_no: '780509-02-2346' },
  { id: 3, name: 'Ali Hassan', mobile_phone: '013-1122334', email: 'ali@example.com', department: 'Finance', role: 'Staff', designation: 'Finance Staff', identification_no: '920731-03-3457' },
  { id: 4, name: 'Siti Aminah', mobile_phone: '014-5678901', email: 'siti@example.com', department: 'Legal', role: 'Staff', designation: 'Legal Staff', identification_no: '880623-04-4568' },
  { id: 5, name: 'Ahmad Zaki', mobile_phone: '011-2233445', email: 'ahmad@example.com', department: 'IT', role: 'Manager', designation: 'IT Manager', identification_no: '830112-05-5679' },
  { id: 6, name: 'Emily Tan', mobile_phone: '017-9988776', email: 'emily@example.com', department: 'HR', role: 'Staff', designation: 'HR Staff', identification_no: '950408-06-6782' },
  { id: 7, name: 'Muhammad Faiz', mobile_phone: '015-6655443', email: 'faiz@example.com', department: 'Finance', role: 'Admin', designation: 'Finance Administrator', identification_no: '900325-07-7893' },
  { id: 8, name: 'Lisa Wong', mobile_phone: '018-3344556', email: 'lisa@example.com', department: 'IT', role: 'Staff', designation: 'IT Staff', identification_no: '970516-08-8904' },
  { id: 9, name: 'Norazlina Bakar', mobile_phone: '016-7788990', email: 'norazlina@example.com', department: 'Legal', role: 'Manager', designation: 'Legal Manager', identification_no: '820907-09-9016' },
  { id: 10, name: 'David Lim', mobile_phone: '012-1122334', email: 'david@example.com', department: 'Finance', role: 'Staff', designation: 'Finance Staff', identification_no: '890219-10-0127' },
  { id: 11, name: 'Fatimah Ismail', mobile_phone: '019-4455667', email: 'fatimah@example.com', department: 'HR', role: 'Admin', designation: 'HR Administrator', identification_no: '760830-11-1238' },
  { id: 12, name: 'Rajesh Kumar', mobile_phone: '013-6677889', email: 'rajesh@example.com', department: 'IT', role: 'Staff', designation: 'IT Staff', identification_no: '930614-12-2349' },
  { id: 13, name: 'Aisyah Rahman', mobile_phone: '017-2233445', email: 'aisyah@example.com', department: 'Legal', role: 'Staff', designation: 'Legal Staff', identification_no: '980702-13-3450' },
]);

const filteredUsers = computed(() => {
  return formData.value.filter(user => {
    return (
      (selectedDepartment.value === null || user.department === selectedDepartment.value) &&
      (selectedRole.value === null || user.role === selectedRole.value) &&
      (searchQuery.value === '' ||
        user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        user.mobile_phone.includes(searchQuery.value))
    );
  });
});

// Pagination logic
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredUsers.value.slice(start, end);
});

// Action handlers
const viewUser = (id) => {
  console.log('View user:', id);
};

const editUser = (id) => {
  console.log('Edit user:', id);
};

const deleteUser = (id) => {
  if (confirm('Are you sure you want to delete this user?')) {
    console.log('Delete user:', id);
  }
};

// Export handler
const handleExport = () => {
  if (selectedExport.value) {
    console.log(`Exporting data as ${selectedExport.value}`);
    // Add your export logic here, e.g., generate CSV, Excel, or PDF
    switch (selectedExport.value) {
      case 'csv':
        exportToCSV();
        break;
      case 'excel':
        exportToExcel();
        break;
      case 'pdf':
        exportToPDF();
        break;
      default:
        console.log('No export type selected');
    }
    // Reset the selection if desired
    selectedExport.value = null;
  }
};

// Placeholder export methods
const exportToCSV = () => {
  console.log('Exporting to CSV...');
  // Implement CSV export logic here
};

const exportToExcel = () => {
  console.log('Exporting to Excel...');
  // Implement Excel export logic here
};

const exportToPDF = () => {
  console.log('Exporting to PDF...');
  // Implement PDF export logic here
};
</script>