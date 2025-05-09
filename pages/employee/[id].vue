<template>
  <div class="bg-white p-4 rounded-lg shadow-md">
    <div class="mt-2">
      <UForm :state="formData" class="space-y-4 max-w-8xl mx-1" @submit="onSubmit">
        <div class="bg-emerald-600 text-white py-3 px-6 border-b flex items-center">
          <span class="text-sm font-bold">Edit Employee</span>
        </div>
        <div class="p-2">
          <div class="flex flex-col">
            <div class="flex flex-wrap -mx-2">
              <div class="w-full md:w-1/2 px-2 mb-4">
                <UFormField for="name" label="Name" :ui="{ label: 'font-bold' }" required />
                <UInput
                  id="name"
                  v-model="formData.name"
                  type="text"
                  size="lg"
                  class="w-full"
                  @blur="v$.name.$touch()"
                />
                <div v-if="errorMessages.name" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                  {{ errorMessages.name }}
                </div>
              </div>
              <div class="w-full md:w-1/2 px-2 mb-4">
                <UFormField for="nric" label="Nric" :ui="{ label: 'font-bold' }" required />
                <UInput
                  id="nric"
                  v-model="formData.nric"
                  type="text"
                  size="lg"
                  class="w-full"
                  @blur="v$.nric.$touch()"
                />
                <div v-if="errorMessages.nric" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                  {{ errorMessages.nric }}
                </div>
              </div>
            </div>
            <div class="flex flex-wrap -mx-2">
              <div class="w-full md:w-1/2 px-2 mb-4">
                <UFormField for="mobile_phone" label="Mobile Phone" :ui="{ label: 'font-bold' }" required />
                <UInput
                  id="mobile_phone"
                  v-model="formData.mobile_phone"
                  type="text"
                  size="lg"
                  class="w-full"
                  @blur="v$.mobile_phone.$touch()"
                />
                <div v-if="errorMessages.mobile_phone" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                  {{ errorMessages.mobile_phone }}
                </div>
              </div>
              <div class="w-full md:w-1/2 px-2 mb-4">
                <UFormField for="email" label="Email" :ui="{ label: 'font-bold' }" required />
                <UInput
                  id="email"
                  v-model="formData.email"
                  type="email"
                  size="lg"
                  class="w-full"
                  @blur="v$.email.$touch()"
                  icon="i-lucide-at-sign"
                />
                <div v-if="errorMessages.email" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                  {{ errorMessages.email }}
                </div>
              </div>
            </div>
            <div class="flex flex-wrap -mx-2">
              <div class="w-full md:w-1/3 px-2 mb-4">
                <UFormField for="start-date" label="Start Date" :ui="{ label: 'font-bold' }" required />
                <UInput
                  id="start_date"
                  v-model="formData.start_date"
                  type="date"
                  size="lg"
                  class="w-full"
                  @blur="v$.start_date.$touch()"
                />
                <div v-if="errorMessages.start_date" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                  {{ errorMessages.start_date }}
                </div>
              </div>
              <div class="w-full md:w-1/3 px-2 mb-4">
                <UFormField for="end_date" label="End Date" :ui="{ label: 'font-bold' }" required />
                <UInput
                  id="end_date"
                  v-model="formData.end_date"
                  type="date"
                  size="lg"
                  class="w-full"
                  @blur="v$.end_date.$touch()"
                />
                <div v-if="errorMessages.end_date" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                  {{ errorMessages.end_date }}
                </div>
              </div>
              <div class="w-full md:w-1/3 px-2 mb-4">
                <UFormField for="martial_status" label="Martial Status" :ui="{ label: 'font-bold' }" required />
                <USelect
                  id="martial_status"
                  v-model="formData.martial_status"
                  :items="martialStatusOptions"
                  class="w-full"
                  size="lg"
                  @blur="v$.martial_status.$touch()"
                />
                <div v-if="errorMessages.martial_status" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                  {{ errorMessages.martial_status }}
                </div>
              </div>
            </div>
            <div class="flex flex-wrap -mx-2">
              <div class="w-full md:w-1/2 px-2 mb-4">
                <UFormField for="designation_id" label="Designation" :ui="{ label: 'font-bold' }" required />
                <USelect
                  id="designation_id"
                  v-model="formData.designation_id"
                  :items="designationOptions"
                  class="w-full"
                  size="lg"
                  label-key="name"
                  value-key="id"
                  @blur="v$.designation_id.$touch()"
                />
                <div v-if="errorMessages.designation_id" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                  {{ errorMessages.designation_id }}
                </div>
              </div>
              <div class="w-full md:w-1/2 px-2 mb-4">
                <UFormField for="department_id" label="Department" :ui="{ label: 'font-bold' }" required />
                <USelect
                  id="department_id"
                  v-model="formData.department_id"
                  :items="departmentOptions"
                  class="w-full"
                  size="lg"
                  label-key="name"
                  value-key="id"
                  @blur="v$.department_id.$touch()"
                />
                <div v-if="errorMessages.department_id" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                  {{ errorMessages.department_id }}
                </div>
              </div>
            </div>
            <div class="flex flex-wrap -mx-2">
              <div class="w-full md:w-1/3 px-2 mb-4">
                <UFormField for="username" label="Username" :ui="{ label: 'font-bold' }" required />
                <UInput
                  id="username"
                  v-model="formData.username"
                  type="text"
                  size="lg"
                  class="w-full"
                  @blur="v$.username.$touch()"
                />
                <div v-if="errorMessages.username" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                  {{ errorMessages.username }}
                </div>
              </div>
              <div class="w-full md:w-1/3 px-2 mb-4">
                <UFormField for="password" label="Password" :ui="{ label: 'font-bold' }" required />
                <UInput
                  id="password"
                  v-model="formData.password"
                  type="password"
                  size="lg"
                  class="w-full"
                  @blur="v$.password.$touch()"
                />
                <div v-if="errorMessages.password" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                  {{ errorMessages.password }}
                </div>
              </div>
              <div class="w-full md:w-1/3 px-2 mb-4">
                <UFormField for="password_confirmation" label="Password Confirmation" :ui="{ label: 'font-bold' }" required />
                <UInput
                  id="password_confirmation"
                  v-model="formData.password_confirmation"
                  type="password"
                  size="lg"
                  class="w-full"
                  @blur="v$.password_confirmation.$touch()"
                />
                <div v-if="errorMessages.password_confirmation" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                  {{ errorMessages.password_confirmation }}
                </div>
              </div>
            </div>
            <div class="flex flex-wrap -mx-2">
              <div class="w-full md:w-1/2 px-2 mb-4">
                <UFormField for="is_active" label="Status" :ui="{ label: 'font-bold' }" required />
                <USelect
                  id="is_active"
                  v-model="formData.is_active"
                  :items="statusOptions"
                  class="w-full"
                  size="lg"
                />
              </div>
            </div>
          </div>
        </div>

        <UButton
          color="primary"
          variant="solid"
          label="Update Data"
          type="submit"
        />
      </UForm>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers, sameAs } from "@vuelidate/validators";

// Reactive form data
const formData = ref({});
const departmentOptions = ref([]);
const designationOptions = ref([]);
const route = useRoute();
const userId = route.params.id;

const martialStatusOptions = ref([
  { value: "single", label: "Single" },
  { value: "married", label: "Married" },
  { value: "divorced", label: "Divorced" },
]);

const statusOptions = ref([
  { value: true, label: "Active" },
  { value: false, label: "Inactive" },
])

const passwordValue = computed(()=>formData.value.password)

// Validation rules
const rules = {
  name: { required: helpers.withMessage("Name is required", required) },
  nric: { required: helpers.withMessage("NRIC is required", required) },
  mobile_phone: { required: helpers.withMessage("Mobile Phone is required", required) },
  email: {
    required: helpers.withMessage("Email is required", required),
    email: helpers.withMessage("Invalid email format", email),
  },
  start_date: { required: helpers.withMessage("Start Date is required", required) },
  end_date: {},
  martial_status: { required: helpers.withMessage("Martial Status is required", required) }, 
  designation_id: { required: helpers.withMessage("Designation is required", required) },
  department_id: { required: helpers.withMessage("Department is required", required) },
  username: { required: helpers.withMessage("Username is required", required) },
  password: { required: helpers.withMessage("Password is required", required) },
  password_confirmation: {
    required: helpers.withMessage("Password Confirmation is required", required),
    sameAsPassword: helpers.withMessage("Katalaluan tidak sepadan", sameAs(passwordValue))
  },
};

const v$ = useVuelidate(rules, formData);

const backendErrors = ref({});

const errorMessages = computed(() => ({
  name: v$.value.name.$error ? v$.value.name.$errors[0].$message : backendErrors.value.name?.[0] || "",
  nric: v$.value.nric.$error ? v$.value.nric.$errors[0].$message : backendErrors.value.nric?.[0] || "",
  mobile_phone: v$.value.mobile_phone.$error ? v$.value.mobile_phone.$errors[0].$message : backendErrors.value.mobile_phone?.[0] || "",
  email: v$.value.email.$error ? v$.value.email.$errors[0].$message : backendErrors.value.email?.[0] || "",
  start_date: v$.value.start_date.$error ? v$.value.start_date.$errors[0].$message : backendErrors.value.start_date?.[0] || "",
  end_date: v$.value.end_date.$error ? v$.value.end_date.$errors[0].$message : backendErrors.value.end_date?.[0] || "",
  martial_status: v$.value.martial_status.$error ? v$.value.martial_status.$errors[0].$message : backendErrors.value.martial_status?.[0] || "",
  designation_id: v$.value.designation_id.$error ? v$.value.designation_id.$errors[0].$message : backendErrors.value.designation_id?.[0] || "",
  department_id: v$.value.department_id.$error ? v$.value.department_id.$errors[0].$message : backendErrors.value.department_id?.[0] || "",
  username: v$.value.username.$error ? v$.value.username.$errors[0].$message : backendErrors.value.username?.[0] || "",
  password: v$.value.password.$error ? v$.value.password.$errors[0].$message : backendErrors.value.password?.[0] || "",
  password_confirmation: v$.value.password_confirmation.$error ? v$.value.password_confirmation.$errors[0].$message : backendErrors.value.password_confirmation?.[0] || "",
}));

const onSubmit = async () => {
  v$.value.$touch();

  if (v$.value.$invalid) {
    console.log("Please fill in all required fields", errorMessages.value);
    return;
  }

  try {
    const response = await $fetch(`/api/employee/${userId}`, {
      method: 'PATCH',
      body: formData.value,
    });

    backendErrors.value = {};
  } catch (error) {
    backendErrors.value = error.response?.data?.errors || {};
    console.error("Submission error:", backendErrors.value);
  }
};

const getDesignations = async () => {
    try {
        const response = await $fetch('/api/setting/designations')
        if (response) {
            designationOptions.value = response.data
        }
    } catch (error) {
        console.error('Failed to fetch data', error)
    }
}

const getDepartments = async () => {
    try {
        const response = await $fetch('/api/setting/departments')
        if (response) {
            departmentOptions.value = response.data
        }
    } catch (error) {
        console.error('Failed to fetch data', error)
    }
}

const getData = async () => {

  try {
    const response = await $fetch(`/api/employee/${userId}`,{
      method: 'GET',
    })

    formData.value = {
      ...response.data,
    };

  } catch (error) {
    console.error('Failed to fetch user', error)
  }
};

onMounted(() => {
  getData();
  getDepartments();
  getDesignations();
})
</script>