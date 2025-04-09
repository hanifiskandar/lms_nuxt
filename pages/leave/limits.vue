<template>
  <div class="bg-white p-4 rounded-lg shadow-md">
    <div class="mt-2">
      <div class="bg-emerald-600 text-white py-3 px-6 border-b flex items-center">
        <span class="text-sm font-bold">Manage Leave Limits</span>
      </div>

      <!-- Leave Limits Form -->
      <div class="p-4">
        <UForm :state="formData" class="space-y-4" @submit="saveLimits">
          <div class="flex flex-wrap -mx-2">
            <div class="w-full md:w-1/3 px-2 mb-4">
              <UFormField for="annual_leave" label="Annual Leave (AL)" :ui="{ label: 'font-bold' }" />
              <UInput
                id="annual_leave"
                v-model="formData.annual_leave"
                type="number"
                size="lg"
                class="w-full"
                min="0"
              />
            </div>
            <div class="w-full md:w-1/3 px-2 mb-4">
              <UFormField for="sick_leave" label="Sick Leave (MC)" :ui="{ label: 'font-bold' }" />
              <UInput
                id="sick_leave"
                v-model="formData.sick_leave"
                type="number"
                size="lg"
                class="w-full"
                min="0"
              />
            </div>
            <div class="w-full md:w-1/3 px-2 mb-4">
              <UFormField for="emergency_leave" label="Emergency Leave (EL)" :ui="{ label: 'font-bold' }" />
              <UInput
                id="emergency_leave"
                v-model="formData.emergency_leave"
                type="number"
                size="lg"
                class="w-full"
                min="0"
              />
            </div>
            <div class="w-full md:w-1/3 px-2 mb-4">
              <UFormField for="hospitalization_leave" label="Hospitalization Leave" :ui="{ label: 'font-bold' }" />
              <UInput
                id="hospitalization_leave"
                v-model="formData.hospitalization_leave"
                type="number"
                size="lg"
                class="w-full"
                min="0"
              />
            </div>
            <div class="w-full md:w-1/3 px-2 mb-4">
              <UFormField for="marriage_leave" label="Marriage Leave" :ui="{ label: 'font-bold' }" />
              <UInput
                id="marriage_leave"
                v-model="formData.marriage_leave"
                type="number"
                size="lg"
                class="w-full"
                min="0"
              />
            </div>
          </div>
          <UButton
            color="primary"
            variant="solid"
            label="Save"
            type="submit"
            :disabled="!selectedEmployeeId"
          />
        </UForm>
      </div>

      <!-- Table -->
      <div class="min-w-full shadow-sm mt-4">
        <table class="min-w-full">
          <thead class="bg-emerald-600">
            <tr>
              <th class="px-6 py-3 text-left text-sm font-semibold text-white">Employee ID</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-white">Name</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-white">Annual Leave (AL)</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-white">Sick Leave (MC)</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-white">Emergency Leave (EL)</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-white">Hospitalization Leave</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-white">Marriage Leave</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-white">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr v-for="employee in paginatedEmployees" :key="employee.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 text-sm whitespace-nowrap">{{ employee.id }}</td>
              <td class="px-6 py-4 text-sm whitespace-nowrap">{{ employee.name }}</td>
              <td class="px-6 py-4 text-sm whitespace-nowrap">{{ employee.annual_leave }}</td>
              <td class="px-6 py-4 text-sm whitespace-nowrap">{{ employee.sick_leave }}</td>
              <td class="px-6 py-4 text-sm whitespace-nowrap">{{ employee.emergency_leave }}</td>
              <td class="px-6 py-4 text-sm whitespace-nowrap">{{ employee.hospitalization_leave }}</td>
              <td class="px-6 py-4 text-sm whitespace-nowrap">{{ employee.marriage_leave }}</td>
              <td class="px-6 py-4 text-sm whitespace-nowrap">
                <UButton
                  color="primary"
                  variant="outline"
                  size="sm"
                  label="Edit"
                  @click="editEmployee(employee.id)"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="mt-4 flex justify-end">
        <UPagination v-model:page="currentPage" :total="employees.length" :items-per-page="itemsPerPage" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Form data for leave limits
const formData = ref({
  annual_leave: null,
  sick_leave: null,
  emergency_leave: null,
  hospitalization_leave: null,
  marriage_leave: null,
});

// Track the selected employee ID
const selectedEmployeeId = ref(null);

// Dummy employee data
const employees = ref([
  { id: 1, name: "John Doe", annual_leave: 14, sick_leave: 10, emergency_leave: 3, hospitalization_leave: 5, marriage_leave: 3 },
  { id: 2, name: "Jane Smith", annual_leave: 12, sick_leave: 8, emergency_leave: 2, hospitalization_leave: 4, marriage_leave: 2 },
  { id: 3, name: "Alice Johnson", annual_leave: 15, sick_leave: 12, emergency_leave: 4, hospitalization_leave: 6, marriage_leave: 3 },
  { id: 4, name: "Bob Brown", annual_leave: 10, sick_leave: 7, emergency_leave: 1, hospitalization_leave: 3, marriage_leave: 1 },
]);

// Pagination
const currentPage = ref(1);
const itemsPerPage = 10;

const paginatedEmployees = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return employees.value.slice(start, end);
});

// Edit employee: Populate form with selected employee's data
const editEmployee = (employeeId) => {
  const employee = employees.value.find(e => e.id === employeeId);
  if (employee) {
    selectedEmployeeId.value = employeeId;
    formData.value = {
      annual_leave: employee.annual_leave,
      sick_leave: employee.sick_leave,
      emergency_leave: employee.emergency_leave,
      hospitalization_leave: employee.hospitalization_leave,
      marriage_leave: employee.marriage_leave,
    };
  }
};

// Save limits: Update the selected employee's data
const saveLimits = async () => {
  if (!selectedEmployeeId.value) return;

  const employee = employees.value.find(e => e.id === selectedEmployeeId.value);
  if (employee) {
    employee.annual_leave = formData.value.annual_leave;
    employee.sick_leave = formData.value.sick_leave;
    employee.emergency_leave = formData.value.emergency_leave;
    employee.hospitalization_leave = formData.value.hospitalization_leave;
    employee.marriage_leave = formData.value.marriage_leave;

    try {
      // Simulate API call (replace with actual backend endpoint)
      await $fetch(`/api/employees/${selectedEmployeeId.value}/leave-limits`, {
        method: 'PATCH',
        body: formData.value,
      });
      console.log(`Leave limits updated for employee ${selectedEmployeeId.value}`);
    } catch (error) {
      console.error('Error updating leave limits:', error);
    }

    // Reset form after saving
    resetForm();
  }
};

// Reset form to initial state
const resetForm = () => {
  selectedEmployeeId.value = null;
  formData.value = {
    annual_leave: null,
    sick_leave: null,
    emergency_leave: null,
    hospitalization_leave: null,
    marriage_leave: null,
  };
};
</script>