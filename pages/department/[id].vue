<template>
  <div class="bg-white p-4 rounded-lg shadow-md">
    <div class="mt-2">
      <UForm :state="formData" class="space-y-4 max-w-8xl mx-1" @submit="onSubmit">
        <div class="bg-emerald-600 text-white py-3 px-6 border-b flex items-center">
          <span class="text-sm font-bold">Edit Deparment</span>
        </div>
        <div class="p-2">
          <div class="flex flex-col mx-2">
            <!-- <div class="flex flex-wrap -mx-2"> -->
              <div class="w-1/2 px-2 mb-4">
                <UFormField for="name" label="Name" :ui="{ label: 'font-bold' }" required />
                <UInput
                  id="name"
                  :value="formData.name"
                  type="text"
                  size="lg"
                  class="w-full"
                  readonly
                />
              </div>
              <div class="w-1/2 px-2 mb-4">
                <UFormField for="head_id" label="Head Department" :ui="{ label: 'font-bold' }" required />
                <USelect
                  id="head_id"
                  v-model="formData.head_id"
                  :items="usersOptions"
                  class="w-full"
                  size="lg"
                  label-key="name"
                  value-key="id"
                  @blur="v$.head_id.$touch()"
                />
                <div v-if="errorMessages.head_id" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                  {{ errorMessages.head_id }}
                </div>
              </div>
            <!-- </div> -->
          </div>
        </div>

        <UButton color="primary" variant="solid" label="Update" type="submit"/>
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
const usersOptions = ref([]);
const route = useRoute();
const departmentId = route.params.id;

// Validation rules
const rules = {
  head_id: { required: helpers.withMessage("Head Department Name is required", required) },
};

const v$ = useVuelidate(rules, formData);

const backendErrors = ref({});

const errorMessages = computed(() => ({
  head_id: v$.value.head_id.$error ? v$.value.head_id.$errors[0].$message : backendErrors.value.head_id?.[0] || "",
}));

const onSubmit = async () => {
  v$.value.$touch();

  if (v$.value.$invalid) {
    console.log("Please fill in all required fields", errorMessages.value);
    return;
  }

  try {
    const response = await $fetch(`/api/departments/${departmentId}`, {
      method: 'PATCH',
      body: formData.value,
    });

    await getData();
  } catch (error) {
    backendErrors.value = error.response?.data?.errors || {};
    console.error("Submission error:", backendErrors.value);
  }
};


const getUsers = async () => {
    try {
        const response = await $fetch('/api/setting/users')
        if (response) {
            usersOptions.value = response.data
        }
    } catch (error) {
        console.error('Failed to fetch data', error)
    }
}

const getData = async () => {

  try {
    const response = await $fetch(`/api/departments/${departmentId}`,{
      method: 'GET',
    })

    formData.value = {
      ...response.data,
    };

  } catch (error) {
    console.error('Failed to fetch data', error)
  }
};

onMounted(() => {
  getData();
  getUsers();
})
</script>