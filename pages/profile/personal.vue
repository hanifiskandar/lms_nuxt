<!-- pages/profile/personal.vue -->
<template>
  <div>
    <UForm :state="formData" class="space-y-4 max-w-8xl mx-1" @submit="handleSubmit">
      <!-- Personal Information Section -->
      <div class="bg-emerald-600 text-white py-3 px-6 border-b flex items-center">
        <span class="text-sm font-bold">Personal Information</span>
      </div>
      <div class="p-2">
        <div class="flex flex-wrap -mx-2">
          <div class="w-full px-2 mb-4">
            <UFormField for="address_line1" label="Address 1" :ui="{ label: 'font-bold' }" required />
            <UInput 
              id="address_line1"
              v-model="formData.address_line1"
              type="text"
              size="lg"
              class="w-full"
              @blur="v$.address_line1.$touch()" />
            <div v-if="errorMessages.address_line1" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
              {{ errorMessages.address_line1 }}
            </div>
          </div>
          <div class="w-full px-2 mb-4">
            <UFormField for="address_line2" label="Address 2" :ui="{ label: 'font-bold' }" required />
            <UInput 
              id="address_line2"
              v-model="formData.address_line2"
              type="text"
              size="lg"
              class="w-full"
              @blur="v$.address_line2.$touch()" />
            <div v-if="errorMessages.address_line2" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
              {{ errorMessages.address_line2 }}
            </div>
          </div>
          <div class="w-full px-2 mb-4">
            <UFormField for="address_line3" label="Address 3" :ui="{ label: 'font-bold' }" required />
            <UInput 
              id="address_line3"
              v-model="formData.address_line3"
              type="text"
              size="lg"
              class="w-full"
              @blur="v$.address_line3.$touch()" />
            <div v-if="errorMessages.address_line3" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
              {{ errorMessages.address_line3 }}
            </div>
          </div>
        </div>

        <div class="flex flex-wrap -mx-2">
          <div class="w-full md:w-1/3 px-2 mb-4">
            <UFormField for="city" label="City" :ui="{ label: 'font-bold' }" required />
            <UInput 
              id="city"
              v-model="formData.city"
              type="text"
              size="lg"
              class="w-full"
              @blur="v$.city.$touch()" />
            <div v-if="errorMessages.city" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
              {{ errorMessages.city }}
            </div>
          </div>
          <div class="w-full md:w-1/3 px-2 mb-4">
            <UFormField for="state" label="State" :ui="{ label: 'font-bold' }" required />
            <USelect
                id="state"
                v-model="formData.state"
                :items="statesOptions"
                class="w-full"
                size="lg"
                label-key="name"
                value-key="id"
                @blur="v$.state.$touch()"
              />
            <div v-if="errorMessages.state" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
              {{ errorMessages.state }}
            </div>
          </div>
          <div class="w-full md:w-1/3 px-2 mb-4">
            <UFormField for="postcode" label="Postcode" :ui="{ label: 'font-bold' }" required />
            <UInput 
              id="postcode"
              v-model="formData.postcode"
              type="text"
              size="lg"
              class="w-full"
              @blur="v$.postcode.$touch()" />
            <div v-if="errorMessages.postcode" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
              {{ errorMessages.postcode }}
            </div>
          </div>
        </div>

        <div class="flex flex-wrap -mx-2">
          <div class="w-full md:w-1/3 px-2 mb-4">
            <UFormField for="mobile_phone" label="Mobile Phone" :ui="{ label: 'font-bold' }" required />
            <UInput 
              id="mobile_phone"
              v-model="formData.mobile_phone"
              type="text"
              size="lg"
              class="w-full"
              @blur="v$.mobile_phone.$touch()" />
            <div v-if="errorMessages.mobile_phone" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
              {{ errorMessages.mobile_phone }}
            </div>
          </div>
          <div class="w-full md:w-1/3 px-2 mb-4">
            <UFormField for="office_phone" label="Office Phone" :ui="{ label: 'font-bold' }" required />
            <UInput 
              id="office_phone"
              v-model="formData.office_phone"
              type="text"
              size="lg"
              class="w-full"
              @blur="v$.office_phone.$touch()" />
            <div v-if="errorMessages.office_phone" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
              {{ errorMessages.office_phone }}
            </div>
          </div>
          <div class="w-full md:w-1/3 px-2 mb-4">
            <UFormField for="email" label="Email" :ui="{ label: 'font-bold' }" required />
            <UInput 
              id="email"
              v-model="formData.email"
              type="email"
              size="lg"
              class="w-full"
              @blur="v$.email.$touch()"
              icon="i-lucide-at-sign" />
            <div v-if="errorMessages.email" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
              {{ errorMessages.email }}
            </div>
          </div>
        </div>
      </div>

      <!-- Emergency Contact Section -->
      <div class="bg-emerald-600 text-white py-3 px-6 border-b flex items-center">
        <span class="text-sm font-bold">Emergency Contact</span>
      </div>
      <div class="p-2">
        <div v-for="(emerg, index) in formData.emergency_contacts" :key="index" class="mb-6 border-b border-gray-300 pb-4 flex">
          <div class="w-[90%] pr-4">
            <div class="flex flex-wrap -mx-2">
              <div class="w-full md:w-1/3 px-2 mb-4">
                <UFormField :for="`emerg_name_${index}`" label="Emergency Name" :ui="{ label: 'font-bold' }" required />
                <UInput 
                  :id="`emerg_name_${index}`"
                  v-model="emerg.name"
                  type="text"
                  size="lg"
                  class="w-full"
                  @blur="v$.emergency_contacts[index].name.$touch()" />
                <div v-if="errorMessages.emergency_contacts[index]?.name" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                  {{ errorMessages.emergency_contacts[index].name }}
                </div>
              </div>
              <div class="w-full md:w-1/3 px-2 mb-4">
                <UFormField :for="`emerg_relation_${index}`" label="Relation" :ui="{ label: 'font-bold' }" required />
                <USelect 
                  :id="`emerg_relation_${index}`"
                  v-model="emerg.relation"
                  :items="relationOptions"
                  class="w-full"
                  @blur="v$.emergency_contacts[index].relation.$touch()" />
                <div v-if="errorMessages.emergency_contacts[index]?.relation" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                  {{ errorMessages.emergency_contacts[index].relation }}
                </div>
              </div>
              <div class="w-full md:w-1/3 px-2 mb-4">
                <UFormField :for="`emerg_mobile_phone_${index}`" label="Mobile Phone" :ui="{ label: 'font-bold' }" required />
                <UInput 
                  :id="`emerg_mobile_phone_${index}`"
                  v-model="emerg.mobile_phone"
                  type="text"
                  size="lg"
                  class="w-full"
                  @blur="v$.emergency_contacts[index].mobile_phone.$touch()" />
                <div v-if="errorMessages.emergency_contacts[index]?.mobile_phone" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                  {{ errorMessages.emergency_contacts[index].mobile_phone }}
                </div>
              </div>
            </div>
          </div>
          <div class="w-[10%] flex flex-row items-center justify-center space-x-2">
            <UButton color="error" variant="solid" icon="i-heroicons-trash" @click="removeEmergencyContact(index)" />
            <UButton v-if="index === formData.emergency_contacts.length - 1" color="secondary" variant="solid" icon="i-heroicons-plus" @click="addEmergencyContact" />
          </div>
        </div>
      </div>

      <UButton color="primary" variant="solid" label="Submit" type="submit" />
    </UForm>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email, helpers } from '@vuelidate/validators';

definePageMeta({
  layout: 'default',
});

const formData = ref({
    emergency_contacts: []
});
const page = "Personal";
const statesOptions = ref([]);
const route = useRoute();
const userId = 2;

const rules = computed(() => ({
  // name: { required: helpers.withMessage('Name is required', required) },
  // identification_no: { required: helpers.withMessage('Identification No is required', required) },
  address_line1: { required: helpers.withMessage('Address Line 1 is required', required) },
  address_line2: {},
  address_line3: {},
  city: { required: helpers.withMessage('City is required', required) },
  state: { required: helpers.withMessage('State is required', required) },
  postcode: { required: helpers.withMessage('Postcode is required', required) },
  office_phone: { required: helpers.withMessage('Office Phone is required', required) },
  mobile_phone: { required: helpers.withMessage('Mobile Phone is required', required) },
  email: { required: helpers.withMessage('Email is required', required), email: helpers.withMessage('Invalid email format', email) },
  emergency_contacts: formData.value.emergency_contacts.map(() => ({
    name: { required: helpers.withMessage('Name is required', required) },
    relation: { required: helpers.withMessage('Relation is required', required) },
    mobile_phone: { required: helpers.withMessage('Mobile Phone is required', required) },
  })),
}));

const v$ = useVuelidate(rules, formData);

const errorMessages = computed(() => ({
  // name: v$.value.name.$error ? v$.value.name.$errors[0].$message : '',
  // identification_no: v$.value.identification_no.$error ? v$.value.identification_no.$errors[0].$message : '',
  address_line1: v$.value.address_line1.$error ? v$.value.address_line1.$errors[0].$message : '',
  city: v$.value.city.$error ? v$.value.city.$errors[0].$message : '',
  state: v$.value.state.$error ? v$.value.state.$errors[0].$message : '',
  postcode: v$.value.postcode.$error ? v$.value.postcode.$errors[0].$message : '',
  office_phone: v$.value.office_phone.$error ? v$.value.office_phone.$errors[0].$message : '',
  mobile_phone: v$.value.mobile_phone.$error ? v$.value.mobile_phone.$errors[0].$message : '',
  email: v$.value.email.$error ? v$.value.email.$errors[0].$message : '',
  emergency_contacts: formData.value.emergency_contacts.map((_, index) => ({
    name: v$.value.emergency_contacts[index]?.name.$error ? v$.value.emergency_contacts[index].name.$errors[0].$message : '',
    relation: v$.value.emergency_contacts[index]?.relation.$error ? v$.value.emergency_contacts[index].relation.$errors[0].$message : '',
    mobile_phone: v$.value.emergency_contacts[index]?.mobile_phone.$error ? v$.value.emergency_contacts[index].mobile_phone.$errors[0].$message : '',
  })),
}));

const relationOptions = ref([
  { value: "Father", label: "Father" },
  { value: "Mother", label: "Mother" },
  { value: "Brother", label: "Brother" },
  { value: "Sister", label: "Sister" },
]);

const addEmergencyContact = () => {
  formData.value.emergency_contacts.push({ name: '', relation: '', mobile_phone: '' });
};

const removeEmergencyContact = (index) => {
  if (formData.value.emergency_contacts.length > 1) {
    formData.value.emergency_contacts.splice(index, 1);
  } else {
    alert('At least one emergency contact is required.');
  }
};

const handleSubmit = async () => {
  v$.value.$touch();
  if (v$.value.$invalid) {
    console.log('Validation errors:', errorMessages.value);
    return;
  }

  try {
    const response = await $fetch(`/api/employee/${userId}`, {
      method: 'PATCH',
      body: formData.value,
      query: {
        page: page,
      }
    });
    alert('Personal info updated successfully!');
    v$.value.$reset();
  } catch (error) {
    console.error('Error submitting personal info:', error);
    alert('Failed to update personal info. Please try again.');
  }
};

const getStates = async () => {
    try {
        const response = await $fetch('/api/setting/states')
        if (response) {
            statesOptions.value = response.data;
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

    const data = response.data;

    if(!data.emergency_contacts || data.emergency_contacts.length === 0){
      data.emergency_contacts = [
        { name: '', relation: '', mobile_phone: ''}
      ];
    }

    formData.value = {...data};

  } catch (error) {
    console.error('Failed to fetch user', error)
  }
};

onMounted(() => {
  getData();
  getStates();
})

</script>