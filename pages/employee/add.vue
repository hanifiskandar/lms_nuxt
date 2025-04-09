<!-- pages/profile.vue -->
<template>
  <div class="bg-white p-4 rounded-lg shadow-md">
    <div class="mt-2">
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
              <UFormField for="nric" label="NRIC" :ui="{ label: 'font-bold' }" required />
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
            <!-- Leave Balances -->
            <div class="w-full md:w-1/3 px-2 mb-4">
              <UFormField for="annual_leave" label="Annual Leave (AL)" :ui="{ label: 'font-bold' }" required />
              <UInput
                id="annual_leave"
                v-model="formData.annual_leave"
                type="number"
                size="lg"
                class="w-full"
                min="0"
                @blur="v$.annual_leave.$touch()"
              />
              <div v-if="errorMessages.annual_leave" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                {{ errorMessages.annual_leave }}
              </div>
            </div>
            <div class="w-full md:w-1/3 px-2 mb-4">
              <UFormField for="medical_leave" label="Medical Leave (MC)" :ui="{ label: 'font-bold' }" required />
              <UInput
                id="medical_leave"
                v-model="formData.medical_leave"
                type="number"
                size="lg"
                class="w-full"
                min="0"
                @blur="v$.medical_leave.$touch()"
              />
              <div v-if="errorMessages.medical_leave" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                {{ errorMessages.medical_leave }}
              </div>
            </div>
            <div class="w-full md:w-1/3 px-2 mb-4">
              <UFormField for="emergency_leave" label="Emergency Leave (EL)" :ui="{ label: 'font-bold' }" required />
              <UInput
                id="emergency_leave"
                v-model="formData.emergency_leave"
                type="number"
                size="lg"
                class="w-full"
                min="0"
                @blur="v$.emergency_leave.$touch()"
              />
              <div v-if="errorMessages.emergency_leave" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                {{ errorMessages.emergency_leave }}
              </div>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <UButton
          color="primary"
          variant="solid"
          label="Daftar"
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
const formData = ref({
  name: "",
  nric: "",
  designation: "",
  position_level: "",
  mobile_phone: "",
  email: "",
  username: "",
  password: "",
  password_confirmation: "",
  annual_leave: null,
  medical_leave: null,
  emergency_leave: null,
});

// Validation rules
const rules = {
  name: { required: helpers.withMessage("Name is required", required) },
  nric: { required: helpers.withMessage("NRIC is required", required) },
  designation: { required: helpers.withMessage("Designation is required", required) },
  position_level: { required: helpers.withMessage("Position Level is required", required) },
  mobile_phone: { required: helpers.withMessage("Mobile Phone is required", required) },
  email: {
    required: helpers.withMessage("Email is required", required),
    email: helpers.withMessage("Invalid email format", email),
  },
  username: { required: helpers.withMessage("Username is required", required) },
  password: { required: helpers.withMessage("Password is required", required) },
  password_confirmation: {
    required: helpers.withMessage("Password Confirmation is required", required),
    sameAs: helpers.withMessage("Passwords do not match", sameAs(ref(() => formData.value.password))),
  },
  annual_leave: { required: helpers.withMessage("Annual Leave is required", required) },
  medical_leave: { required: helpers.withMessage("Medical Leave is required", required) },
  emergency_leave: { required: helpers.withMessage("Emergency Leave is required", required) },
};

// Initialize Vuelidate
const v$ = useVuelidate(rules, formData);

// Backend errors
const backendErrors = ref({});

// Error messages
const errorMessages = computed(() => ({
  name: v$.value.name.$error ? v$.value.name.$errors[0].$message : backendErrors.value.name?.[0] || "",
  nric: v$.value.nric.$error ? v$.value.nric.$errors[0].$message : backendErrors.value.nric?.[0] || "",
  designation: v$.value.designation.$error ? v$.value.designation.$errors[0].$message : backendErrors.value.designation?.[0] || "",
  position_level: v$.value.position_level.$error ? v$.value.position_level.$errors[0].$message : backendErrors.value.position_level?.[0] || "",
  mobile_phone: v$.value.mobile_phone.$error ? v$.value.mobile_phone.$errors[0].$message : backendErrors.value.mobile_phone?.[0] || "",
  email: v$.value.email.$error ? v$.value.email.$errors[0].$message : backendErrors.value.email?.[0] || "",
  username: v$.value.username.$error ? v$.value.username.$errors[0].$message : backendErrors.value.username?.[0] || "",
  password: v$.value.password.$error ? v$.value.password.$errors[0].$message : backendErrors.value.password?.[0] || "",
  password_confirmation: v$.value.password_confirmation.$error ? v$.value.password_confirmation.$errors[0].$message : backendErrors.value.password_confirmation?.[0] || "",
  annual_leave: v$.value.annual_leave.$error ? v$.value.annual_leave.$errors[0].$message : backendErrors.value.annual_leave?.[0] || "",
  medical_leave: v$.value.medical_leave.$error ? v$.value.medical_leave.$errors[0].$message : backendErrors.value.medical_leave?.[0] || "",
  emergency_leave: v$.value.emergency_leave.$error ? v$.value.emergency_leave.$errors[0].$message : backendErrors.value.emergency_leave?.[0] || "",
}));

// Form submission
const onSubmit = async () => {
  v$.value.$touch();
  if (v$.value.$invalid) {
    console.log("Please fill in all required fields", errorMessages.value);
    return;
  }

  try {
    const response = await $fetch('/api/employees', {
      method: 'POST',
      body: formData.value,
    });
    backendErrors.value = {};
    console.log("Employee added successfully:", response);
    // Reset form after successful submission
    formData.value = {
      name: "",
      nric: "",
      designation: "",
      position_level: "",
      mobile_phone: "",
      email: "",
      username: "",
      password: "",
      password_confirmation: "",
      annual_leave: null,
      medical_leave: null,
      emergency_leave: null,
    };
    v$.value.$reset();
  } catch (error) {
    backendErrors.value = error.response?.data?.errors || {};
    console.error("Submission error:", backendErrors.value);
  }
};
</script>