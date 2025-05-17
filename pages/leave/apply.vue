<!-- pages/leave/apply.vue -->
<template>
  <div class="bg-white p-4 rounded-lg shadow-md">
    <div class="mt-2">
      <UForm :state="formData" class="space-y-4 max-w-8xl mx-1" @submit="onSubmit">
        <div class="bg-emerald-600 text-white py-3 px-6 border-b flex items-center">
          <span class="text-sm font-bold">Apply Leave</span>
        </div>
        <div class="p-2">
          <div class="flex flex-wrap -mx-2">
            <div class="w-full md:w-1/2 px-2 mb-4">
              <UFormField for="leave_type_id" label="Type" :ui="{ label: 'font-bold' }" required />
              <USelect
                id="leave_type_id"
                v-model="formData.leave_type_id"
                :items="leaveTypeOptions"
                class="w-full"
                size="lg"
                label-key="name"
                value-key="id"
                @blur="v$.leave_type_id.$touch()"
              />
              <div v-if="errorMessages.leave_type_id" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                {{ errorMessages.leave_type_id }}
              </div>
            </div>
            <div class="w-full md:w-1/2 px-2 mb-4">
              <UFormField for="duration" label="Duration" :ui="{ label: 'font-bold' }" required />
              <USelect
                id="duration"
                v-model="formData.duration"
                :items="durationOptions"
                class="w-full"
                size="lg"
                @blur="v$.duration.$touch()"
              />
              <div v-if="errorMessages.duration" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                {{ errorMessages.duration }}
              </div>
            </div>
            <div class="w-full md:w-1/2 px-2 mb-4">
              <UFormField for="start_date" label="Start Date" :ui="{ label: 'font-bold' }" required />
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
            <div class="w-full md:w-1/2 px-2 mb-4">
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
            <div class="w-full px-2 mb-4">
              <UFormField for="reason" label="Reason" :ui="{ label: 'font-bold' }" required />
              <UTextarea
                id="reason"
                v-model="formData.reason"
                placeholder="Please provide the reason for your leave..."
                size="lg"
                class="w-full"
                :rows="4"
                @blur="v$.reason.$touch()"
              />
              <div v-if="errorMessages.reason" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                {{ errorMessages.reason }}
              </div>
            </div>
            <div v-if="formData.leave_type_id === 2" class="w-full md:w-1/2 px-2 mb-4">
              <UFormField for="attachment" label="Attachment (PDF or Image)" :ui="{ label: 'font-bold' }" />
              <UInput
                id="attachment"
                type="file"
                ref="fileInput"
                accept=".pdf,.jpg,.jpeg,.png"
                size="lg"
                class="w-full"
                @change="handleFileChange"
              />
              <div v-if="errorMessages.attachment" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                {{ errorMessages.attachment }}
              </div>
            </div>
          </div>
        </div>
        <UButton
          color="primary"
          variant="solid"
          label="Submit"
          type="submit"
        />
      </UForm>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { prepareFormData } from "~/utils/formData";

definePageMeta({
  middleware: ['auth'],
});
const auth = useAuth();
const router = useRouter();
const userId = computed(() => auth.user.id);

// Reactive form data
const formData = ref({
  leave_type_id: null,
  duration: null,
  start_date: null,
  end_date: null,
  reason: '',
  attachment: null,
});
const leaveTypeOptions = ref([]);

const durationOptions = ref([
  { value: 'full_day', label: "Full Day" },
  { value: 'half_day', label: "Half Day" },
]);

// Validation rules matching the form fields
const rules = {
  leave_type_id: { required: helpers.withMessage("Leave type is required", required) },
  duration: { required: helpers.withMessage("Duration is required", required) },
  start_date: { required: helpers.withMessage("Start date is required", required) },
  end_date: { required: helpers.withMessage("End date is required", required) },
  reason: { required: helpers.withMessage("Reason is required", required) },
  attachment: {
    requiredIfSick: helpers.withMessage("Attachment is required for sick leave", (value, vm) => {
      return vm.leave_type_id !== 2 || (vm.leave_type_id === 2 && value !== null);
    }),
    validFileType: helpers.withMessage("Only PDF or image files are allowed", (value) => {
      if (!value) return true; // Skip if no file
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      return allowedTypes.includes(value.type);
    }),
    validFileSize: helpers.withMessage("File size must not exceed 5MB", (value) => {
      if (!value) return true; // Skip if no file
      return value.size <= 5 * 1024 * 1024; // 5MB limit
    })
  }
};

const v$ = useVuelidate(rules, formData);
const backendErrors = ref({});

const errorMessages = computed(() => ({
  leave_type_id: v$.value.leave_type_id.$error ? v$.value.leave_type_id.$errors[0].$message : backendErrors.value.type?.[0] || "",
  duration: v$.value.duration.$error ? v$.value.duration.$errors[0].$message : backendErrors.value.duration?.[0] || "",
  start_date: v$.value.start_date.$error ? v$.value.start_date.$errors[0].$message : backendErrors.value.start_date?.[0] || "",
  end_date: v$.value.end_date.$error ? v$.value.end_date.$errors[0].$message : backendErrors.value.end_date?.[0] || "",
  reason: v$.value.reason.$error ? v$.value.reason.$errors[0].$message : backendErrors.value.reason?.[0] || "",
  attachment: v$.value.attachment.$error ? v$.value.attachment.$errors[0].$message : backendErrors.value.attachment?.[0] || "",
}));

const handleFileChange = (event) => {
  formData.value.attachment = event.target.files[0];
  v$.value.attachment.$touch();
};

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

const onSubmit = async () => {
  v$.value.$touch();
  if (v$.value.$invalid) {
    console.log("Form validation failed", errorMessages.value);
    return;
  }

  try {
    const newFormData = prepareFormData(formData.value, 'attachment'); // Use the helper
    console.log(newFormData);
    
    const response = await $fetch('/api/leave-requests/', {
      method: 'POST',
      body: newFormData,
      credentials: "include",
    });
    
    backendErrors.value = {};
    console.log("Leave submitted successfully:", response);
    v$.value.$reset();
    router.push('/leave/requests');

  } catch (error) {
    backendErrors.value = error.response?.data?.errors || {};
    console.error("Submission error:", backendErrors.value);
  }
};

onMounted(() => {
  getLeaveTypes()
})

</script>