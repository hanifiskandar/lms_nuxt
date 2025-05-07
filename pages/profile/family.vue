<!-- pages/profile/family.vue -->
<template>
  <div>
    <UForm :state="formData" class="space-y-4 max-w-8xl mx-1" @submit="handleSubmit">
      <!-- Parent and Sibling Information -->
      <div class="bg-emerald-600 text-white py-3 px-6 border-b flex items-center">
        <span class="text-sm font-bold">Parent and Sibling Information</span>
      </div>
      <div class="p-2">
        <div v-for="(fam, index) in formData.family_members" :key="index" class="mb-6 border-b border-gray-300 pb-4 flex">
          <!-- Content (90% width) -->
          <div class="w-[90%] pr-4">
            <div class="flex flex-wrap -mx-2">
              <!-- Name Field -->
              <div class="w-full md:w-1/5 px-2 mb-4">
                <UFormField :for="`fam_name_${index}`" label="Name" :ui="{ label: 'font-bold' }" required />
                <UInput
                  :id="`fam_name_${index}`"
                  v-model="fam.name"
                  type="text"
                  size="lg"
                  class="w-full"
                  @blur="v$.family_members[index].name.$touch()" />
                <div v-if="errorMessages.family_members[index]?.name" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                  {{ errorMessages.family_members[index].name }}
                </div>
              </div>

              <!-- NRIC Field -->
              <div class="w-full md:w-1/5 px-2 mb-4">
                <UFormField :for="`fam_nric_${index}`" label="NRIC" :ui="{ label: 'font-bold' }" required />
                <UInput
                  :id="`fam_nric_${index}`"
                  v-model="fam.nric"
                  type="text"
                  size="lg"
                  class="w-full"
                  @blur="v$.family_members[index].nric.$touch()" />
                <div v-if="errorMessages.family_members[index]?.nric" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                  {{ errorMessages.family_members[index].nric }}
                </div>
              </div>

              <!-- Gender Field -->
              <div class="w-full md:w-1/5 px-2 mb-4">
                <UFormField :for="`fam_gender_${index}`" label="Gender" :ui="{ label: 'font-bold' }" required />
                <USelect
                  :id="`fam_gender_${index}`"
                  v-model="fam.gender"
                  :items="genderOptions"
                  class="w-full"
                  @blur="v$.family_members[index].gender.$touch()" />
                <div v-if="errorMessages.family_members[index]?.gender" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                  {{ errorMessages.family_members[index].gender }}
                </div>
              </div>

              <!-- Date of Birth Field -->
              <div class="w-full md:w-1/5 px-2 mb-4">
                <UFormField :for="`fam_dob_${index}`" label="Date of Birth" :ui="{ label: 'font-bold' }" />
                <UInput
                  :id="`fam_dob_${index}`"
                  v-model="fam.dob"
                  type="date"
                  size="lg"
                  class="w-full" />
              </div>

              <!-- Mobile Phone Field -->
              <div class="w-full md:w-1/5 px-2 mb-4">
                <UFormField :for="`fam_mobile_phone_${index}`" label="Mobile Phone" :ui="{ label: 'font-bold' }" required />
                <UInput
                  :id="`fam_mobile_phone_${index}`"
                  v-model="fam.mobile_phone"
                  type="text"
                  size="lg"
                  class="w-full"
                  @blur="v$.family_members[index].mobile_phone.$touch()" />
                <div v-if="errorMessages.family_members[index]?.mobile_phone" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                  {{ errorMessages.family_members[index].mobile_phone }}
                </div>
              </div>

              <!-- Relation Field -->
              <div class="w-full md:w-1/5 px-2 mb-4">
                <UFormField :for="`fam_relation_${index}`" label="Relation" :ui="{ label: 'font-bold' }" required />
                <USelect
                  :id="`fam_relation_${index}`"
                  v-model="fam.relation"
                  :items="relationOptions"
                  class="w-full"
                  @blur="v$.family_members[index].relation.$touch()" />
                <div v-if="errorMessages.family_members[index]?.relation" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                  {{ errorMessages.family_members[index].relation }}
                </div>
              </div>

              <!-- Martial Status Field -->
              <div class="w-full md:w-1/5 px-2 mb-4">
                <UFormField :for="`fam_martial_status_${index}`" label="Martial Status" :ui="{ label: 'font-bold' }" required />
                <USelect
                  :id="`fam_martial_status_${index}`"
                  v-model="fam.martial_status"
                  :items="martialStatusOptions"
                  class="w-full"
                  @blur="v$.family_members[index].martial_status.$touch()" />
                <div v-if="errorMessages.family_members[index]?.martial_status" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                  {{ errorMessages.family_members[index].martial_status }}
                </div>
              </div>

              <!-- Activity Field -->
              <div class="w-full md:w-1/5 px-2 mb-4">
                <UFormField :for="`fam_activity_${index}`" label="Activity" :ui="{ label: 'font-bold' }" required />
                <USelect
                  :id="`fam_activity_${index}`"
                  v-model="fam.activity"
                  :items="activityOptions"
                  class="w-full"
                  @blur="v$.family_members[index].activity.$touch()" />
                <div v-if="errorMessages.family_members[index]?.activity" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                  {{ errorMessages.family_members[index].activity }}
                </div>
              </div>

              <!-- Organization Field -->
              <div class="w-full md:w-1/5 px-2 mb-4">
                <UFormField :for="`fam_organization_${index}`" label="Organization" :ui="{ label: 'font-bold' }" />
                <UInput
                  :id="`fam_organization_${index}`"
                  v-model="fam.organization"
                  type="text"
                  size="lg"
                  class="w-full" />
              </div>
            </div>
          </div>

          <!-- Actions (10% width) -->
          <div class="w-[10%] flex flex-row items-center justify-center space-x-2">
            <UButton color="error" variant="solid" icon="i-heroicons-trash" @click="removeFamilyMember(index)" />
            <UButton v-if="index === formData.family_members.length - 1" color="secondary" variant="solid" icon="i-heroicons-plus" @click="addFamilyMember" />
          </div>
        </div>
      </div>

      <!-- Spouse Information -->
      <div class="bg-emerald-600 text-white py-3 px-6 border-b flex items-center">
        <span class="text-sm font-bold">Spouse Information</span>
      </div>
      <div class="p-2">
        <div class="flex flex-wrap -mx-2">
          <div class="w-full md:w-1/2 px-2 mb-4">
            <UFormField for="spouse_name" label="Name" :ui="{ label: 'font-bold' }" />
            <UInput
              id="spouse_name"
              v-model="formData.spouse_name"
              type="text"
              size="lg"
              class="w-full"
              @blur="v$.spouse_name.$touch()" />
            <div v-if="errorMessages.spouse_name" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
              {{ errorMessages.spouse_name }}
            </div>
          </div>

          <div class="w-full md:w-1/2 px-2 mb-4">
            <UFormField for="spouse_nric" label="NRIC" :ui="{ label: 'font-bold' }" />
            <UInput
              id="spouse_nric"
              v-model="formData.spouse_nric"
              type="text"
              size="lg"
              class="w-full"
              @blur="v$.spouse_nric.$touch()" />
            <div v-if="errorMessages.spouse_nric" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
              {{ errorMessages.spouse_nric }}
            </div>
          </div>

          <div class="w-full md:w-1/2 px-2 mb-4">
            <UFormField for="spouse_job" label="Job" :ui="{ label: 'font-bold' }" />
            <UInput
              id="spouse_job"
              v-model="formData.spouse_job"
              type="text"
              size="lg"
              class="w-full"
              @blur="v$.spouse_job.$touch()" />
            <div v-if="errorMessages.spouse_job" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
              {{ errorMessages.spouse_job }}
            </div>
          </div>

          <div class="w-full md:w-1/2 px-2 mb-4">
            <UFormField for="spouse_mobile_phone" label="Mobile Phone" :ui="{ label: 'font-bold' }" />
            <UInput
              id="spouse_mobile_phone"
              v-model="formData.spouse_mobile_phone"
              type="text"
              size="lg"
              class="w-full"
              @blur="v$.spouse_mobile_phone.$touch()" />
            <div v-if="errorMessages.spouse_mobile_phone" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
              {{ errorMessages.spouse_mobile_phone }}
            </div>
          </div>
        </div>
      </div>

      <!-- Children Information -->
      <div class="bg-emerald-600 text-white py-3 px-6 border-b flex items-center">
        <span class="text-sm font-bold">Children Information</span>
      </div>
      <div class="p-2">
        <div v-for="(child, index) in formData.children" :key="index" class="mb-6 border-b border-gray-300 pb-4 flex">
          <!-- Content (90% width) -->
          <div class="w-[90%] pr-4">
            <div class="flex flex-wrap -mx-2">
              <div class="w-full md:w-1/6 px-2 mb-4">
                <UFormField :for="`child_name_${index}`" label="Child Name" :ui="{ label: 'font-bold' }" />
                <UInput
                  :id="`child_name_${index}`"
                  v-model="child.name"
                  type="text"
                  size="lg"
                  class="w-full"
                  @blur="v$.children[index].name.$touch()" />
                <div v-if="errorMessages.children[index]?.name" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                  {{ errorMessages.children[index].name }}
                </div>
              </div>

              <div class="w-full md:w-1/6 px-2 mb-4">
                <UFormField :for="`child_nric_${index}`" label="NRIC" :ui="{ label: 'font-bold' }" />
                <UInput
                  :id="`child_nric_${index}`"
                  v-model="child.nric"
                  type="text"
                  size="lg"
                  class="w-full"
                  @blur="v$.children[index].nric.$touch()" />
                <div v-if="errorMessages.children[index]?.nric" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                  {{ errorMessages.children[index].nric }}
                </div>
              </div>

              <div class="w-full md:w-1/6 px-2 mb-4">
                <UFormField :for="`child_gender_${index}`" label="Gender" :ui="{ label: 'font-bold' }" />
                <USelect
                  :id="`child_gender_${index}`"
                  v-model="child.gender"
                  :items="genderOptions"
                  class="w-full"
                  @blur="v$.children[index].gender.$touch()" />
                <div v-if="errorMessages.children[index]?.gender" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                  {{ errorMessages.children[index].gender }}
                </div>
              </div>

              <div class="w-full md:w-1/6 px-2 mb-4">
                <UFormField :for="`child_dob_${index}`" label="Date of Birth" :ui="{ label: 'font-bold' }" />
                <UInput
                  :id="`child_dob_${index}`"
                  v-model="child.dob"
                  type="date"
                  size="lg"
                  class="w-full" />
              </div>

              <div class="w-full md:w-1/6 px-2 mb-4">
                <UFormField :for="`child_martial_status_${index}`" label="Martial Status" :ui="{ label: 'font-bold' }" />
                <USelect
                  :id="`child_martial_status_${index}`"
                  v-model="child.martial_status"
                  :items="martialStatusOptions"
                  class="w-full"
                  @blur="v$.children[index].martial_status.$touch()" />
                <div v-if="errorMessages.children[index]?.martial_status" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                  {{ errorMessages.children[index].martial_status }}
                </div>
              </div>

              <div class="w-full md:w-1/6 px-2 mb-4">
                <UFormField :for="`child_activity_${index}`" label="Activity" :ui="{ label: 'font-bold' }" />
                <USelect
                  :id="`child_activity_${index}`"
                  v-model="child.activity"
                  :items="activityOptions"
                  class="w-full"
                  @blur="v$.children[index].activity.$touch()" />
                <div v-if="errorMessages.children[index]?.activity" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                  {{ errorMessages.children[index].activity }}
                </div>
              </div>
            </div>
          </div>
          <!-- Actions (10% width) -->
          <div class="w-[10%] flex flex-row items-center justify-center space-x-2">
            <UButton color="error" variant="solid" icon="i-heroicons-trash" @click="removeChild(index)" />
            <UButton v-if="index === formData.children.length - 1" color="secondary" variant="solid" icon="i-heroicons-plus" @click="addChild" />
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
import { required, helpers } from '@vuelidate/validators';

definePageMeta({
  layout: 'default',
});

const page = "Family";
const formData = ref({
  family_members: [],
  children: [],
});
const route = useRoute();
const userId = 2;


const rules = computed(() => ({
  family_members: formData.value.family_members.map(() => ({
    name: { required: helpers.withMessage('Name is required', required) },
    nric: { required: helpers.withMessage('NRIC is required', required) },
    gender: { required: helpers.withMessage('Gender is required', required) },
    dob: {},
    mobile_phone: { required: helpers.withMessage('Mobile number is required', required) },
    relation: { required: helpers.withMessage('Relation is required', required) },
    martial_status: { required: helpers.withMessage('Martial status is required', required) },
    activity: { required: helpers.withMessage('Activity is required', required) },
    organization: {},
  })),
  spouse_name: {},
  spouse_nric: {},
  spouse_job: {},
  spouse_mobile_phone: {},
  children: formData.value.children.map(() => ({
    name: {},
    nric: {},
    gender: {},
    dob: {},
    martial_status: {},
    activity: {},
  })),
}));

const v$ = useVuelidate(rules, formData);

const errorMessages = computed(() => ({
  family_members: formData.value.family_members.map((_, index) => ({
    name: v$.value.family_members[index]?.name.$error ? v$.value.family_members[index].name.$errors[0].$message : '',
    nric: v$.value.family_members[index]?.nric.$error ? v$.value.family_members[index].nric.$errors[0].$message : '',
    gender: v$.value.family_members[index]?.gender.$error ? v$.value.family_members[index].gender.$errors[0].$message : '',
    dob: v$.value.family_members[index]?.dob.$error ? v$.value.family_members[index].dob.$errors[0].$message : '',
    mobile_phone: v$.value.family_members[index]?.mobile_phone.$error ? v$.value.family_members[index].mobile_phone.$errors[0].$message : '',
    relation: v$.value.family_members[index]?.relation.$error ? v$.value.family_members[index].relation.$errors[0].$message : '',
    martial_status: v$.value.family_members[index]?.martial_status.$error ? v$.value.family_members[index].martial_status.$errors[0].$message : '',
    activity: v$.value.family_members[index]?.activity.$error ? v$.value.family_members[index].activity.$errors[0].$message : '',
    organization: v$.value.family_members[index]?.organization.$error ? v$.value.family_members[index].organization.$errors[0].$message : '',
  })),
  spouse_name: v$.value.spouse_name.$error ? v$.value.spouse_name.$errors[0].$message : '',
  spouse_nric: v$.value.spouse_nric.$error ? v$.value.spouse_nric.$errors[0].$message : '',
  spouse_job: v$.value.spouse_job.$error ? v$.value.spouse_job.$errors[0].$message : '',
  spouse_mobile_phone: v$.value.spouse_mobile_phone.$error ? v$.value.spouse_mobile_phone.$errors[0].$message : '',
  children: formData.value.children.map((_, index) => ({
    name: v$.value.children[index]?.name.$error ? v$.value.children[index].name.$errors[0].$message : '',
    nric: v$.value.children[index]?.nric.$error ? v$.value.children[index].nric.$errors[0].$message : '',
    gender: v$.value.children[index]?.gender.$error ? v$.value.children[index].gender.$errors[0].$message : '',
    dob: v$.value.children[index]?.dob.$error ? v$.value.children[index].dob.$errors[0].$message : '',
    martial_status: v$.value.children[index]?.martial_status.$error ? v$.value.children[index].martial_status.$errors[0].$message : '',
    activity: v$.value.children[index]?.activity.$error ? v$.value.children[index].activity.$errors[0].$message : '',
  })),
}));

const martialStatusOptions = ref([
  { value: "single", label: "Single" },
  { value: "married", label: "Married" },
  { value: "divorced", label: "Divorced" },
]);

const activityOptions = ref([
  { value: "employed", label: "Employed" },
  { value: "unemployed", label: "Unemployed" },
  { value: "study", label: "Study" },
]);

const relationOptions = ref([
  { value: "father", label: "Father" },
  { value: "mother", label: "Mother" },
  { value: "brother", label: "Brother" },
  { value: "sister", label: "Sister" },
]);

const genderOptions = ref([
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
]);

const addFamilyMember = () => {
  formData.value.family_members.push({
    name: '', nric: '', gender: '', dob: '', mobile_phone: '', relation: '', martial_status: '', activity: '', organization: '',
  });
};

const removeFamilyMember = (index) => {
  if (formData.value.family_members.length > 1) {
    formData.value.family_members.splice(index, 1);
  } else {
    alert('At least one family member is required.');
  }
};

const addChild = () => {
  formData.value.children.push({ name: '', nric: '', gender: '', dob: '', martial_status: '', activity: '' });
};

const removeChild = (index) => {
  if (formData.value.children.length > 1) {
    formData.value.children.splice(index, 1);
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
    alert('Family info updated successfully!');
    v$.value.$reset();
  } catch (error) {
    console.error('Error submitting family info:', error);
    alert('Failed to update family info. Please try again.');
  }
};

const getData = async () => {

  try {
    const response = await $fetch(`/api/employee/${userId}`,{
      method: 'GET',
    })

    const data = response.data;

    if(!data.family_members || data.family_members.length === 0){
      data.family_members = [
        { name: '', nric: '', gender: '', dob: '', mobile_phone: '', relation: '', martial_status: '', activity: '', organization: ''}
      ];
    }

    if(!data.children || data.children.length === 0){
      data.children = [
        { name: '', nric: '', gender: '', dob: '', martial_status: '', activity: ''}
      ];
    }

    formData.value = {...data};

  } catch (error) {
    console.error('Failed to fetch user', error)
  }
};

onMounted(() => {
  getData();
})
</script>