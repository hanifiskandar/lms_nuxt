<!-- pages/profile/personal.vue -->
<template>
  <div>
    <UForm :state="personalData" class="space-y-4 max-w-8xl mx-1" @submit="handleSubmit">
      <!-- Personal Information Section -->
      <div class="bg-emerald-600 text-white py-3 px-6 border-b flex items-center">
        <span class="text-sm font-bold">Personal Information</span>
      </div>
      <div class="p-2">
        <div class="flex flex-wrap -mx-2">
          <div class="w-full md:w-1/2 px-2 mb-4">
            <UFormField for="name" label="Name" :ui="{ label: 'font-bold' }" required />
            <UInput id="name" v-model="personalData.name" type="text" size="lg" class="w-full" @blur="v$.name.$touch()" />
            <div v-if="errorMessages.name" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
              {{ errorMessages.name }}
            </div>
          </div>
          <div class="w-full md:w-1/2 px-2 mb-4">
            <UFormField for="identification_no" label="Identification No" :ui="{ label: 'font-bold' }" required />
            <UInput id="identification_no" v-model="personalData.identification_no" type="text" size="lg" class="w-full" @blur="v$.identification_no.$touch()" />
            <div v-if="errorMessages.identification_no" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
              {{ errorMessages.identification_no }}
            </div>
          </div>
          <div class="w-full px-2 mb-4">
            <UFormField for="address_line1" label="Address 1" :ui="{ label: 'font-bold' }" required />
            <UInput id="address_line1" v-model="personalData.address_line1" type="text" size="lg" class="w-full" @blur="v$.address_line1.$touch()" />
            <div v-if="errorMessages.address_line1" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
              {{ errorMessages.address_line1 }}
            </div>
          </div>
          <div class="w-full px-2 mb-4">
            <UFormField for="address_line2" label="Address 2" :ui="{ label: 'font-bold' }" />
            <UInput id="address_line2" v-model="personalData.address_line2" type="text" size="lg" class="w-full" />
          </div>
          <div class="w-full px-2 mb-4">
            <UFormField for="address_line3" label="Address 3" :ui="{ label: 'font-bold' }" />
            <UInput id="address_line3" v-model="personalData.address_line3" type="text" size="lg" class="w-full" />
          </div>
          <div class="w-full md:w-1/3 px-2 mb-4">
            <UFormField for="city" label="City" :ui="{ label: 'font-bold' }" required />
            <UInput id="city" v-model="personalData.city" type="text" size="lg" class="w-full" @blur="v$.city.$touch()" />
            <div v-if="errorMessages.city" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
              {{ errorMessages.city }}
            </div>
          </div>
          <div class="w-full md:w-1/3 px-2 mb-4">
            <UFormField for="state" label="State" :ui="{ label: 'font-bold' }" required />
            <USelect id="state" v-model="personalData.state" :items="stateOptions" class="w-full" @blur="v$.state.$touch()" />
            <div v-if="errorMessages.state" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
              {{ errorMessages.state }}
            </div>
          </div>
          <div class="w-full md:w-1/3 px-2 mb-4">
            <UFormField for="postcode" label="Postcode" :ui="{ label: 'font-bold' }" required />
            <UInput id="postcode" v-model="personalData.postcode" type="text" size="lg" class="w-full" @blur="v$.postcode.$touch()" />
            <div v-if="errorMessages.postcode" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
              {{ errorMessages.postcode }}
            </div>
          </div>
          <div class="w-full md:w-1/2 px-2 mb-4">
            <UFormField for="country" label="Country" :ui="{ label: 'font-bold' }" required />
            <USelect id="country" v-model="personalData.country" :items="countryOptions" class="w-full" @blur="v$.country.$touch()" />
            <div v-if="errorMessages.country" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
              {{ errorMessages.country }}
            </div>
          </div>
          <div class="w-full md:w-1/2 px-2 mb-4">
            <UFormField for="office_phone" label="Office Phone" :ui="{ label: 'font-bold' }" required />
            <UInput id="office_phone" v-model="personalData.office_phone" type="text" size="lg" class="w-full" @blur="v$.office_phone.$touch()" />
            <div v-if="errorMessages.office_phone" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
              {{ errorMessages.office_phone }}
            </div>
          </div>
          <div class="w-full md:w-1/2 px-2 mb-4">
            <UFormField for="mobile_phone" label="Mobile Phone" :ui="{ label: 'font-bold' }" required />
            <UInput id="mobile_phone" v-model="personalData.mobile_phone" type="text" size="lg" class="w-full" @blur="v$.mobile_phone.$touch()" />
            <div v-if="errorMessages.mobile_phone" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
              {{ errorMessages.mobile_phone }}
            </div>
          </div>
          <div class="w-full md:w-1/2 px-2 mb-4">
            <UFormField for="email" label="Email" :ui="{ label: 'font-bold' }" required />
            <UInput id="email" v-model="personalData.email" type="email" size="lg" class="w-full" @blur="v$.email.$touch()" icon="i-lucide-at-sign" />
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
        <div v-for="(emerg, index) in personalData.emergency_contacts" :key="index" class="mb-6 border-b border-gray-300 pb-4 flex">
          <!-- Content (90% width) -->
          <div class="w-[90%] pr-4">
            <div class="flex flex-wrap -mx-2">
              <div class="w-full md:w-1/3 px-2 mb-4">
                <UFormField :for="`emerg_name_${index}`" label="Emergency Name" :ui="{ label: 'font-bold' }" required />
                <UInput :id="`emerg_name_${index}`" v-model="emerg.name" type="text" size="lg" class="w-full" @blur="v$.emergency_contacts[index].name.$touch()" />
                <div v-if="errorMessages.emergency_contacts[index]?.name" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                  {{ errorMessages.emergency_contacts[index].name }}
                </div>
              </div>
              <div class="w-full md:w-1/3 px-2 mb-4">
                <UFormField :for="`emerg_relation_${index}`" label="Relation" :ui="{ label: 'font-bold' }" required />
                <USelect :id="`emerg_relation_${index}`" v-model="emerg.relation" :items="relationOptions" class="w-full" @blur="v$.emergency_contacts[index].relation.$touch()" />
                <div v-if="errorMessages.emergency_contacts[index]?.relation" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                  {{ errorMessages.emergency_contacts[index].relation }}
                </div>
              </div>
              <div class="w-full md:w-1/3 px-2 mb-4">
                <UFormField :for="`emerg_phone_number_${index}`" label="Phone Number" :ui="{ label: 'font-bold' }" required />
                <UInput :id="`emerg_phone_number_${index}`" v-model="emerg.phone_number" type="text" size="lg" class="w-full" @blur="v$.emergency_contacts[index].phone_number.$touch()" />
                <div v-if="errorMessages.emergency_contacts[index]?.phone_number" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                  {{ errorMessages.emergency_contacts[index].phone_number }}
                </div>
              </div>
            </div>
          </div>
          <!-- Actions (10% width) -->
          <div class="w-[10%] flex flex-row items-center justify-center space-x-2">
            <UButton color="error" variant="solid" icon="i-heroicons-trash" @click="removeEmergencyContact(index)" />
            <UButton v-if="index === personalData.emergency_contacts.length - 1" color="secondary" variant="solid" icon="i-heroicons-plus" @click="addEmergencyContact" />
          </div>
        </div>
      </div>

      <UButton color="primary" variant="solid" label="Submit" type="submit" :disabled="v$.$invalid" />
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

const personalData = ref({
  name: '',
  identification_no: '',
  address_line1: '',
  address_line2: '',
  address_line3: '',
  city: '',
  state: '',
  postcode: '',
  country: '',
  office_phone: '',
  mobile_phone: '',
  email: '',
  emergency_contacts: [{ name: '', relation: '', phone_number: '' }],
});

const rules = computed(() => ({
  name: { required: helpers.withMessage('Name is required', required) },
  identification_no: { required: helpers.withMessage('Identification No is required', required) },
  address_line1: { required: helpers.withMessage('Address Line 1 is required', required) },
  address_line2: {},
  address_line3: {},
  city: { required: helpers.withMessage('City is required', required) },
  state: { required: helpers.withMessage('State is required', required) },
  postcode: { required: helpers.withMessage('Postcode is required', required) },
  country: { required: helpers.withMessage('Country is required', required) },
  office_phone: { required: helpers.withMessage('Office Phone is required', required) },
  mobile_phone: { required: helpers.withMessage('Mobile Phone is required', required) },
  email: { required: helpers.withMessage('Email is required', required), email: helpers.withMessage('Invalid email format', email) },
  emergency_contacts: personalData.value.emergency_contacts.map(() => ({
    name: { required: helpers.withMessage('Name is required', required) },
    relation: { required: helpers.withMessage('Relation is required', required) },
    phone_number: { required: helpers.withMessage('Phone number is required', required) },
  })),
}));

const v$ = useVuelidate(rules, personalData);

const errorMessages = computed(() => ({
  name: v$.value.name.$error ? v$.value.name.$errors[0].$message : '',
  identification_no: v$.value.identification_no.$error ? v$.value.identification_no.$errors[0].$message : '',
  address_line1: v$.value.address_line1.$error ? v$.value.address_line1.$errors[0].$message : '',
  city: v$.value.city.$error ? v$.value.city.$errors[0].$message : '',
  state: v$.value.state.$error ? v$.value.state.$errors[0].$message : '',
  postcode: v$.value.postcode.$error ? v$.value.postcode.$errors[0].$message : '',
  country: v$.value.country.$error ? v$.value.country.$errors[0].$message : '',
  office_phone: v$.value.office_phone.$error ? v$.value.office_phone.$errors[0].$message : '',
  mobile_phone: v$.value.mobile_phone.$error ? v$.value.mobile_phone.$errors[0].$message : '',
  email: v$.value.email.$error ? v$.value.email.$errors[0].$message : '',
  emergency_contacts: personalData.value.emergency_contacts.map((_, index) => ({
    name: v$.value.emergency_contacts[index]?.name.$error ? v$.value.emergency_contacts[index].name.$errors[0].$message : '',
    relation: v$.value.emergency_contacts[index]?.relation.$error ? v$.value.emergency_contacts[index].relation.$errors[0].$message : '',
    phone_number: v$.value.emergency_contacts[index]?.phone_number.$error ? v$.value.emergency_contacts[index].phone_number.$errors[0].$message : '',
  })),
}));

const stateOptions = ref([
  { value: "Johor", label: "Johor" },
  { value: "Kedah", label: "Kedah" },
  { value: "Kelantan", label: "Kelantan" },
  { value: "Kuala Lumpur", label: "Kuala Lumpur" },
  { value: "Labuan", label: "Labuan" },
  { value: "Melaka", label: "Melaka" },
  { value: "Negeri Sembilan", label: "Negeri Sembilan" },
  { value: "Pahang", label: "Pahang" },
  { value: "Penang", label: "Penang" },
  { value: "Perak", label: "Perak" },
  { value: "Perlis", label: "Perlis" },
  { value: "Putrajaya", label: "Putrajaya" },
  { value: "Sabah", label: "Sabah" },
  { value: "Sarawak", label: "Sarawak" },
  { value: "Selangor", label: "Selangor" },
  { value: "Terengganu", label: "Terengganu" },
]);

const countryOptions = ref([
  { value: "Australia", label: "Australia" },
  { value: "Brunei", label: "Brunei" },
  { value: "Canada", label: "Canada" },
  { value: "Indonesia", label: "Indonesia" },
  { value: "Japan", label: "Japan" },
  { value: "Malaysia", label: "Malaysia" },
  { value: "Philippines", label: "Philippines" },
  { value: "Singapore", label: "Singapore" },
  { value: "Thailand", label: "Thailand" },
  { value: "United Kingdom", label: "United Kingdom" },
]);

const relationOptions = ref([
  { value: "Father", label: "Father" },
  { value: "Mother", label: "Mother" },
  { value: "Brother", label: "Brother" },
  { value: "Sister", label: "Sister" },
]);

const addEmergencyContact = () => {
  personalData.value.emergency_contacts.push({ name: '', relation: '', phone_number: '' });
};

const removeEmergencyContact = (index) => {
  if (personalData.value.emergency_contacts.length > 1) {
    personalData.value.emergency_contacts.splice(index, 1);
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
    await $fetch('/api/profile/personal', {
      method: 'POST',
      body: personalData.value,
    });
    alert('Personal info updated successfully!');
    v$.value.$reset();
  } catch (error) {
    console.error('Error submitting personal info:', error);
    alert('Failed to update personal info. Please try again.');
  }
};
</script>