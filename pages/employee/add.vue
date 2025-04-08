<!-- pages/profile.vue -->
<template>
  <div class="bg-white p-4 rounded-lg shadow-md">
    <!-- Tab Content -->
    <div class="mt-2">
      <div>
        <UForm :state="formData" class="space-y-4 max-w-8xl mx-1" @submit="onSubmit">
          <div class="bg-emerald-600 text-white py-3 px-6 border-b flex items-center">
            <span class="text-sm font-bold">Add Employee</span>
          </div>
          <div class="p-2">
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
              <div class="w-full md:w-1/2 px-2 mb-4">
                <UFormField for="designation" label="Designation" :ui="{ label: 'font-bold' }" required />
                <UInput
                  id="designation"
                  v-model="formData.designation"
                  type="text"
                  size="lg"
                  class="w-full"
                  @blur="v$.designation.$touch()"
                />
                <div v-if="errorMessages.designation" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                  {{ errorMessages.designation }}
                </div>
              </div>
              <div class="w-full md:w-1/2 px-2 mb-4">
                <UFormField for="position_level" label="Position Level" :ui="{ label: 'font-bold' }" required />
                <UInput
                  id="position_level"
                  v-model="formData.position_level"
                  type="text"
                  size="lg"
                  class="w-full"
                  @blur="v$.position_level.$touch()"
                />
                <div v-if="errorMessages.position_level" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                  {{ errorMessages.position_level }}
                </div>
              </div>
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
                  type="text"
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
                  type="text"
                  size="lg"
                  class="w-full"
                  @blur="v$.password_confirmation.$touch()"
                />
                <div v-if="errorMessages.password_confirmation" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                  {{ errorMessages.password_confirmation }}
                </div>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <UButton
            color="primary"
            variant="solid"
            label="Daftar"
            @click="handleSubmit"
          />
        </UForm>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";


// Reactive form data
const formData = ref({
  name: "",
  nric: "",
  address_line1: "",
  address_line2: "",
  address_line3: "",
  city: "",
  state: "",
  postcode: "",
  country: "",
  office_phone: "",
  mobile_phone: "",
  email: "",
  emergency_name_1: "",
  emergency_relationship_1: "",
  emergency_phone_1: "",
  emergency_address_1: "",
  emergency_name_2: "",
  emergency_relationship_2: "",
  emergency_phone_2: "",
  emergency_address_2: "",
  children: [
    { name: "", identification_no: "", date_of_birth: "", gender:"", status:"" }, // Initial child entry
  ],
});

// Validation rules
const rules = {
  name: { required: helpers.withMessage("Nama diperlukan", required) },
  nric: { required: helpers.withMessage("No Kad Pengenalan diperlukan", required) },
  address_line1: { required: helpers.withMessage("Alamat Baris 1 diperlukan", required) },
  address_line2: {},
  address_line3: {},
  city: { required: helpers.withMessage("Bandar diperlukan", required) },
  state: { required: helpers.withMessage("Negeri diperlukan", required) },
  postcode: { required: helpers.withMessage("Poskod diperlukan", required) },
  country: { required: helpers.withMessage("Negara diperlukan", required) },
  office_phone: { required: helpers.withMessage("Telefon Pejabat diperlukan", required) },
  mobile_phone: { required: helpers.withMessage("Telefon Bimbit diperlukan", required) },
  email: {
    required: helpers.withMessage("Email diperlukan", required),
    email: helpers.withMessage("Format email tidak sah", email),
  },
  emergency_name_1: { required: helpers.withMessage("Nama kenalan kecemasan 1 diperlukan", required) },
  emergency_relationship_1: { required: helpers.withMessage("Hubungan 1 diperlukan", required) },
  emergency_phone_1: { required: helpers.withMessage("Telefon kenalan kecemasan 1 diperlukan", required) },
  emergency_address_1: {},
  emergency_name_2: { required: helpers.withMessage("Nama kenalan kecemasan 2 diperlukan", required) },
  emergency_relationship_2: { required: helpers.withMessage("Hubungan 2 diperlukan", required) },
  emergency_phone_2: { required: helpers.withMessage("Telefon kenalan kecemasan 2 diperlukan", required) },
  emergency_address_2: {},
};

// Initialize Vuelidate
const v$ = useVuelidate(rules, formData);

// Backend errors
const backendErrors = ref({});

// Error messages
const errorMessages = computed(() => ({
  name: v$.value.name.$error ? v$.value.name.$errors[0].$message : backendErrors.value.name?.[0] || "",
  nric: v$.value.nric.$error ? v$.value.nric.$errors[0].$message : backendErrors.value.nric?.[0] || "",
  address_line1: v$.value.address_line1.$error ? v$.value.address_line1.$errors[0].$message : backendErrors.value.address_line1?.[0] || "",
  address_line2: backendErrors.value.address_line2?.[0] || "",
  address_line3: backendErrors.value.address_line3?.[0] || "",
  city: v$.value.city.$error ? v$.value.city.$errors[0].$message : backendErrors.value.city?.[0] || "",
  state: v$.value.state.$error ? v$.value.state.$errors[0].$message : backendErrors.value.state?.[0] || "",
  postcode: v$.value.postcode.$error ? v$.value.postcode.$errors[0].$message : backendErrors.value.postcode?.[0] || "",
  country: v$.value.country.$error ? v$.value.country.$errors[0].$message : backendErrors.value.country?.[0] || "",
  office_phone: v$.value.office_phone.$error ? v$.value.office_phone.$errors[0].$message : backendErrors.value.office_phone?.[0] || "",
  mobile_phone: v$.value.mobile_phone.$error ? v$.value.mobile_phone.$errors[0].$message : backendErrors.value.mobile_phone?.[0] || "",
  email: v$.value.email.$error ? v$.value.email.$errors[0].$message : backendErrors.value.email?.[0] || "",
  emergency_name_1: v$.value.emergency_name_1.$error ? v$.value.emergency_name_1.$errors[0].$message : backendErrors.value.emergency_name_1?.[0] || "",
  emergency_relationship_1: v$.value.emergency_relationship_1.$error ? v$.value.emergency_relationship_1.$errors[0].$message : backendErrors.value.emergency_relationship_1?.[0] || "",
  emergency_phone_1: v$.value.emergency_phone_1.$error ? v$.value.emergency_phone_1.$errors[0].$message : backendErrors.value.emergency_phone_1?.[0] || "",
  emergency_address_1: backendErrors.value.emergency_address_1?.[0] || "",
  emergency_name_2: v$.value.emergency_name_2.$error ? v$.value.emergency_name_2.$errors[0].$message : backendErrors.value.emergency_name_2?.[0] || "",
  emergency_relationship_2: v$.value.emergency_relationship_2.$error ? v$.value.emergency_relationship_2.$errors[0].$message : backendErrors.value.emergency_relationship_2?.[0] || "",
  emergency_phone_2: v$.value.emergency_phone_2.$error ? v$.value.emergency_phone_2.$errors[0].$message : backendErrors.value.emergency_phone_2?.[0] || "",
  emergency_address_2: backendErrors.value.emergency_address_2?.[0] || "",
}));

// Methods to add and remove children
const addChild = () => {
  formData.value.children.push({ name: "", identification_no: "", date_of_birth: "" });
};

const removeChild = (index) => {
  if (formData.value.children.length > 1) {
    formData.value.children.splice(index, 1);
  } else {
    alert("At least one child entry is required.");
  }
}

// Form submission
const handleSubmit = async () => {
  v$.value.$touch();
  if (v$.value.$invalid) {
    console.log("Please fill in all required fields", errorMessages.value);
    return;
  }

  try {
    const response = await $fetch('/api/persidangan/', {
      method: 'POST',
      body: formData.value,
    });
    backendErrors.value = {};
    console.log("Data submitted:", formData.value);
  } catch (error) {
    backendErrors.value = error.response?.data?.errors || {};
    console.log("Backend validation errors:", backendErrors.value);
  }
};
</script>