<!-- pages/profile.vue -->
<template>
  <div class="bg-white p-4 rounded-lg shadow-md">
    <!-- Tabs Navigation -->
    <div class="border-b border-gray-200">
      <nav class="flex space-x-4">
        <button
          @click="activeTab = 'personal'"
          :class="[
            'py-2 px-4 font-medium',
            activeTab === 'personal'
              ? 'border-b-2 border-emerald-600 text-emerald-600'
              : 'text-gray-500 hover:text-emerald-600',
          ]"
        >
          Personal
        </button>
        <button
          @click="activeTab = 'family'"
          :class="[
            'py-2 px-4 font-medium',
            activeTab === 'family'
              ? 'border-b-2 border-emerald-600 text-emerald-600'
              : 'text-gray-500 hover:text-emerald-600',
          ]"
        >
          Family
        </button>
      </nav>
    </div>

    <!-- Tab Content -->
    <div class="mt-4">
      <!-- personal Information Tab -->
      <div v-if="activeTab === 'personal'">
        <UForm
          :state="formData"
          class="space-y-4 max-w-8xl mx-1"
          @submit="onSubmit"
        >
          <!-- Maklumat Pegawai Section -->
          <div
            class="bg-emerald-600 text-white py-3 px-6 border-b flex items-center"
          >
            <span class="text-sm font-bold">Personal Information</span>
          </div>
          <div class="p-2">
            <div class="flex flex-wrap -mx-2">
              <div class="w-full md:w-1/2 px-2 mb-4">
                <UFormField
                  for="name"
                  label="Name"
                  :ui="{ label: 'font-bold' }"
                  required
                />
                <UInput
                  id="name"
                  v-model="formData.name"
                  type="text"
                  size="lg"
                  class="w-full"
                  @blur="v$.name.$touch()"
                />
                <div
                  v-if="errorMessages.name"
                  class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1"
                >
                  {{ errorMessages.name }}
                </div>
              </div>
              <div class="w-full md:w-1/2 px-2 mb-4">
                <UFormField
                  for="identification_no"
                  label="Identification No"
                  :ui="{ label: 'font-bold' }"
                  required
                />
                <UInput
                  id="identification_no"
                  v-model="formData.identification_no"
                  type="text"
                  size="lg"
                  class="w-full"
                  @blur="v$.identification_no.$touch()"
                />
                <div
                  v-if="errorMessages.identification_no"
                  class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1"
                >
                  {{ errorMessages.identification_no }}
                </div>
              </div>
              <div class="w-full px-2 mb-4">
                <UFormField
                  for="address_line1"
                  label="Address 1"
                  :ui="{ label: 'font-bold' }"
                  required
                />
                <UInput
                  id="address_line1"
                  v-model="formData.address_line1"
                  type="text"
                  size="lg"
                  class="w-full"
                  @blur="v$.address_line1.$touch()"
                />
                <div
                  v-if="errorMessages.address_line1"
                  class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1"
                >
                  {{ errorMessages.address_line1 }}
                </div>
              </div>
              <div class="w-full px-2 mb-4">
                <UFormField
                  for="address_line2"
                  label="Address 2"
                  :ui="{ label: 'font-bold' }"
                />
                <UInput
                  id="address_line2"
                  v-model="formData.address_line2"
                  type="text"
                  size="lg"
                  class="w-full"
                  @blur="v$.address_line2.$touch()"
                />
              </div>
              <div class="w-full px-2 mb-4">
                <UFormField
                  for="address_line3"
                  label="Address 3"
                  :ui="{ label: 'font-bold' }"
                />
                <UInput
                  id="address_line3"
                  v-model="formData.address_line3"
                  type="text"
                  size="lg"
                  class="w-full"
                  @blur="v$.address_line3.$touch()"
                />
              </div>
              <div class="w-full md:w-1/3 px-2 mb-4">
                <UFormField
                  for="city"
                  label="City"
                  :ui="{ label: 'font-bold' }"
                  required
                />
                <UInput
                  id="city"
                  v-model="formData.city"
                  type="text"
                  size="lg"
                  class="w-full"
                  @blur="v$.city.$touch()"
                />
                <div
                  v-if="errorMessages.city"
                  class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1"
                >
                  {{ errorMessages.city }}
                </div>
              </div>
              <div class="w-full md:w-1/3 px-2 mb-4">
                <UFormField
                  for="state"
                  label="State"
                  :ui="{ label: 'font-bold' }"
                  required
                />
                <USelect
                  id="state"
                  v-model="formData.state"
                  :items="stateOptions"
                  class="w-full"
                  @blur="v$.state.$touch()"
                />
                <div
                  v-if="errorMessages.state"
                  class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1"
                >
                  {{ errorMessages.state }}
                </div>
              </div>
              <div class="w-full md:w-1/3 px-2 mb-4">
                <UFormField
                  for="postcode"
                  label="Postcode"
                  :ui="{ label: 'font-bold' }"
                  required
                />
                <UInput
                  id="postcode"
                  v-model="formData.postcode"
                  type="text"
                  size="lg"
                  class="w-full"
                  @blur="v$.postcode.$touch()"
                />
                <div
                  v-if="errorMessages.postcode"
                  class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1"
                >
                  {{ errorMessages.postcode }}
                </div>
              </div>
              <div class="w-full md:w-1/2 px-2 mb-4">
                <UFormField
                  for="country"
                  label="Country"
                  :ui="{ label: 'font-bold' }"
                  required
                />
                <USelect
                  id="country"
                  v-model="formData.country"
                  :items="countryOptions"
                  class="w-full"
                  @blur="v$.country.$touch()"
                />
                <div
                  v-if="errorMessages.country"
                  class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1"
                >
                  {{ errorMessages.country }}
                </div>
              </div>
              <div class="w-full md:w-1/2 px-2 mb-4">
                <UFormField
                  for="office_phone"
                  label="Office Phone"
                  :ui="{ label: 'font-bold' }"
                  required
                />
                <UInput
                  id="office_phone"
                  v-model="formData.office_phone"
                  type="text"
                  size="lg"
                  class="w-full"
                  @blur="v$.office_phone.$touch()"
                />
                <div
                  v-if="errorMessages.office_phone"
                  class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1"
                >
                  {{ errorMessages.office_phone }}
                </div>
              </div>
              <div class="w-full md:w-1/2 px-2 mb-4">
                <UFormField
                  for="mobile_phone"
                  label="Mobile Phone"
                  :ui="{ label: 'font-bold' }"
                  required
                />
                <UInput
                  id="mobile_phone"
                  v-model="formData.mobile_phone"
                  type="text"
                  size="lg"
                  class="w-full"
                  @blur="v$.mobile_phone.$touch()"
                />
                <div
                  v-if="errorMessages.mobile_phone"
                  class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1"
                >
                  {{ errorMessages.mobile_phone }}
                </div>
              </div>
              <div class="w-full md:w-1/2 px-2 mb-4">
                <UFormField
                  for="email"
                  label="Email"
                  :ui="{ label: 'font-bold' }"
                  required
                />
                <UInput
                  id="email"
                  v-model="formData.email"
                  type="email"
                  size="lg"
                  class="w-full"
                  @blur="v$.email.$touch()"
                  icon="i-lucide-at-sign"
                />
                <div
                  v-if="errorMessages.email"
                  class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1"
                >
                  {{ errorMessages.email }}
                </div>
              </div>
              <div class="w-full md:w-1/3 px-2 mb-4">
                <UFormField
                  for="martial_status"
                  label="Martial Status"
                  :ui="{ label: 'font-bold' }"
                  required
                />
                <USelect
                  id="martial_status"
                  v-model="formData.martial_status"
                  :items="martialStatusOptions"
                  class="w-full"
                  @blur="v$.martial_status.$touch()"
                />
                <div
                  v-if="errorMessages.martial_status"
                  class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1"
                >
                  {{ errorMessages.martial_status }}
                </div>
              </div>
              <div class="w-full md:w-1/3 px-2 mb-4">
                <UFormField
                  for="race"
                  label="Race"
                  :ui="{ label: 'font-bold' }"
                  required
                />
                <USelect
                  id="race"
                  v-model="formData.race"
                  :items="raceOptions"
                  class="w-full"
                  @blur="v$.race.$touch()"
                />
                <div
                  v-if="errorMessages.race"
                  class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1"
                >
                  {{ errorMessages.race }}
                </div>
              </div>
              <div class="w-full md:w-1/3 px-2 mb-4">
                <UFormField
                  for="religion"
                  label="Religion"
                  :ui="{ label: 'font-bold' }"
                  required
                />
                <USelect
                  id="religion"
                  v-model="formData.religion"
                  :items="religionOptions"
                  class="w-full"
                  @blur="v$.religion.$touch()"
                />
                <div
                  v-if="errorMessages.religion"
                  class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1"
                >
                  {{ errorMessages.religion }}
                </div>
              </div>
            </div>
          </div>

          <!-- Emergency Contact Section -->
          <div
            class="bg-emerald-600 text-white py-3 px-6 border-b flex items-center"
          >
            <span class="text-sm font-bold">Emergency Contact</span>
          </div>

          <!-- Emergency Contact-->
          <div class="p-2">
            <div
              v-for="(emerg, index) in formData.emergency_contacts"
              :key="index"
              class="mb-6 border-b border-gray-300 pb-4 flex"
            >
              <!-- Content (90% width) -->
              <div class="w-[90%] pr-4">
                <div class="flex flex-wrap -mx-2">
                  <div class="w-full md:w-1/3 px-2 mb-4">
                    <UFormField
                      :for="`emerg_name_${index}`"
                      :label="`Emergency Name`"
                      :ui="{ label: 'font-bold' }"
                      required
                    />
                    <UInput
                      :id="`emerg_name_${index}`"
                      v-model="emerg.name"
                      type="text"
                      size="lg"
                      class="w-full"
                      @blur="v$.emergency_contacts[index].name.$touch()"
                    />
                    <div
                      v-if="errorMessages.emergency_contacts[index]?.name"
                      class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1"
                    >
                      {{ errorMessages.emergency_contacts[index].name }}
                    </div>
                  </div>

                  <div class="w-full md:w-1/3 px-2 mb-4">
                    <UFormField
                      :for="`emerg_relation_${index}`"
                      label="Relation"
                      :ui="{ label: 'font-bold' }"
                      required
                    />
                    <USelect
                      :id="`emerg_relation_${index}`"
                      v-model="emerg.relation"
                      :items="relationOptions"
                      size="lg"
                      class="w-full"
                      @blur="v$.emergency_contacts[index].relation.$touch()"
                    />
                    <div
                      v-if="errorMessages.emergency_contacts[index]?.relation"
                      class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1"
                    >
                      {{ errorMessages.emergency_contacts[index].relation }}
                    </div>
                  </div>

                  <div class="w-full md:w-1/3 px-2 mb-4">
                    <UFormField
                      :for="`emerg_phone_number_${index}`"
                      label="Phone Number"
                      :ui="{ label: 'font-bold' }"
                      required
                    />
                    <UInput
                      :id="`emerg_phone_number_${index}`"
                      v-model="emerg.phone_number"
                      type="text"
                      size="lg"
                      class="w-full"
                      @blur="v$.emergency_contacts[index].phone_number.$touch()"
                    />
                    <div
                      v-if="errorMessages.emergency_contacts[index]?.phone_number"
                      class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1"
                    >
                      {{ errorMessages.emergency_contacts[index].phone_number }}
                    </div>
                  </div>

                </div>
              </div>

              <!-- Actions (10% width) -->
              <div
                class="w-[10%] flex flex-row items-center justify-center space-x-2"
              >
                <UButton
                  color="error"
                  variant="solid"
                  icon="i-heroicons-trash"
                  @click="removeEmergencyContact(index)"
                />
                <UButton
                  v-if="index === formData.emergency_contacts.length - 1"
                  color="secondary"
                  variant="solid"
                  icon="i-heroicons-plus"
                  @click="addEmergencyContact"
                />
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <UButton
            color="primary"
            variant="solid"
            label="Submit"
            @click="handleSubmit"
          />
        </UForm>
      </div>

      <!-- Family Information Tab (Emergency Contacts) -->
      <div v-if="activeTab === 'family'">
        <UForm :state="formData" class="space-y-4" @submit="onSubmit">
          <div
            class="bg-emerald-600 text-white py-3 px-6 border-b flex items-center"
          >
            <span class="text-sm font-bold"
              >Parent and Sibling Information</span
            >
          </div>
          <div class="p-2">
            <div
              v-for="(fam, index) in formData.family_members"
              :key="index"
              class="mb-6 border-b border-gray-300 pb-4 flex"
            >
              <!-- Content (90% width) -->
              <div class="w-[90%] pr-4">
                <div class="flex flex-wrap -mx-2">
                  <div class="w-full md:w-1/5 px-2 mb-4">
                    <UFormField
                      :for="`fam_name_${index}`"
                      label="Name"
                      :ui="{ label: 'font-bold' }"
                      required
                    />
                    <UInput
                      :id="`fam_name_${index}`"
                      v-model="fam.name"
                      type="text"
                      size="lg"
                      class="w-full"
                      @blur="v$.family_members[index].name.$touch()"
                    />
                    <div v-if="errorMessages.family_members[index]?.name" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                      {{ errorMessages.family_members[index].name }}
                    </div>
                  </div>
                  <div class="w-full md:w-1/5 px-2 mb-4">
                    <UFormField
                      :for="`fam_nric_${index}`"
                      label="Nric"
                      :ui="{ label: 'font-bold' }"
                      required
                    />
                    <UInput
                      :id="`fam_nric_${index}`"
                      v-model="fam.nric"
                      type="text"
                      size="lg"
                      class="w-full"
                      @blur="v$.family_members[index].nric.$touch()"
                    />
                    <div v-if="errorMessages.family_members[index]?.nric" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                      {{ errorMessages.family_members[index].nric }}
                    </div>
                  </div>
                  <div class="w-full md:w-1/5 px-2 mb-4">
                    <UFormField
                      :for="`fam_gender_${index}`"
                      label="Gender"
                      :ui="{ label: 'font-bold' }"
                      required
                    />
                    <USelect
                      :id="`fam_gender_${index}`"
                      v-model="fam.gender"
                      :items="genderOptions"
                      size="lg"
                      class="w-full"
                      @blur="v$.family_members[index].gender.$touch()"
                    />
                    <div v-if="errorMessages.family_members[index]?.gender" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                      {{ errorMessages.family_members[index].gender }}
                    </div>
                  </div>
                  <div class="w-full md:w-1/5 px-2 mb-4">
                    <UFormField
                      :for="`fam_dob_${index}`"
                      label="Dob"
                      :ui="{ label: 'font-bold' }"
                      required
                    />
                    <UInput
                      :id="`fam_dob_${index}`"
                      v-model="fam.dob"
                      type="date"
                      size="lg"
                      class="w-full"
                      @blur="v$.family_members[index].dob.$touch()"
                    />
                    <div v-if="errorMessages.family_members[index]?.dob" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                      {{ errorMessages.family_members[index].dob }}
                    </div>
                  </div>
                  <div class="w-full md:w-1/5 px-2 mb-4">
                    <UFormField
                      :for="`fam_phone_number_${index}`"
                      label="Phone Number"
                      :ui="{ label: 'font-bold' }"
                      required
                    />
                    <UInput
                      :id="`fam_phone_number_${index}`"
                      v-model="fam.phone_number"
                      type="text"
                      size="lg"
                      class="w-full"
                      @blur="v$.family_members[index].phone_number.$touch()"
                    />
                    <div v-if="errorMessages.family_members[index]?.phone_number" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                      {{ errorMessages.family_members[index].phone_number }}
                    </div>
                  </div>
                  <div class="w-full md:w-1/5 px-2 mb-4">
                    <UFormField
                      :for="`fam_relation_${index}`"
                      label="Relation"
                      :ui="{ label: 'font-bold' }"
                      required
                    />
                    <USelect
                      :id="`fam_relation_${index}`"
                      v-model="fam.relation"
                      :items="relationOptions"
                      size="lg"
                      class="w-full"
                      @blur="v$.family_members[index].relation.$touch()"
                    />
                    <div v-if="errorMessages.family_members[index]?.relation" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                      {{ errorMessages.family_members[index].relation }}
                    </div>
                  </div>
                  <div class="w-full md:w-1/5 px-2 mb-4">
                    <UFormField
                      :for="`fam_martial_status_${index}`"
                      label="Martial Status"
                      :ui="{ label: 'font-bold' }"
                      required
                    />
                    <USelect
                      :id="`fam_martial_status_${index}`"
                      v-model="fam.martial_status"
                      :items="martialStatusOptions"
                      size="lg"
                      class="w-full"
                      @blur="v$.family_members[index].martial_status.$touch()"
                    />
                    <div v-if="errorMessages.family_members[index]?.martial_status" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                      {{ errorMessages.family_members[index].martial_status }}
                    </div>
                  </div>
                  <div class="w-full md:w-1/5 px-2 mb-4">
                    <UFormField
                      :for="`fam_activity_${index}`"
                      label="Activity"
                      :ui="{ label: 'font-bold' }"
                      required
                    />
                    <USelect
                      :id="`fam_activity_${index}`"
                      v-model="fam.activity"
                      :items="activityOptions"
                      size="lg"
                      class="w-full"
                      @blur="v$.family_members[index].activity.$touch()"
                    />
                    <div v-if="errorMessages.family_members[index]?.activity" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                      {{ errorMessages.family_members[index].activity }}
                    </div>
                  </div>
                  <div class="w-full md:w-1/5 px-2 mb-4">
                    <UFormField
                      :for="`fam_organization_${index}`"
                      label="Organization"
                      :ui="{ label: 'font-bold' }"
                      required
                    />
                    <UInput
                      :id="`fam_organization_${index}`"
                      v-model="fam.organization"
                      type="text"
                      size="lg"
                      class="w-full"
                      @blur="v$.family_members[index].organization.$touch()"
                    />
                    <div v-if="errorMessages.family_members[index]?.organization" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                      {{ errorMessages.family_members[index].organization }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Actions (10% width) -->
              <div
                class="w-[10%] flex flex-row items-center justify-center space-x-2"
              >
                <UButton
                  color="error"
                  variant="solid"
                  icon="i-heroicons-trash"
                  @click="removeFamilyMember(index)"
                />
                <UButton
                  v-if="index === formData.family_members.length - 1"
                  color="secondary"
                  variant="solid"
                  icon="i-heroicons-plus"
                  @click="addFamilyMember"
                />
              </div>
            </div>
          </div>
          <div
            class="bg-emerald-600 text-white py-3 px-6 border-b flex items-center"
          >
            <span class="text-sm font-bold">Spouse Information</span>
          </div>
          <div class="p-2">
            <div class="flex flex-wrap -mx-2">
              <div class="w-full md:w-1/2 px-2 mb-4">
                <UFormField
                  for="spouse_name"
                  label="Name"
                  :ui="{ label: 'font-bold' }"
                  required
                />
                <UInput
                  id="spouse_name"
                  v-model="formData.spouse_name"
                  type="text"
                  size="lg"
                  class="w-full"
                  @blur="v$.spouse_name.$touch()"
                />
                <div
                  v-if="errorMessages.spouse_name"
                  class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1"
                >
                  {{ errorMessages.spouse_name }}
                </div>
              </div>
              <div class="w-full md:w-1/2 px-2 mb-4">
                <UFormField
                  for="spouse_nric"
                  label="Nric"
                  :ui="{ label: 'font-bold' }"
                  required
                />
                <UInput
                  id="spouse_nric"
                  v-model="formData.spouse_nric"
                  type="text"
                  size="lg"
                  class="w-full"
                  @blur="v$.spouse_nric.$touch()"
                />
                <div
                  v-if="errorMessages.spouse_nric"
                  class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1"
                >
                  {{ errorMessages.spouse_nric }}
                </div>
              </div>
            </div>
            <div class="flex flex-wrap -mx-2">
              <div class="w-full md:w-1/2 px-2 mb-4">
                <UFormField
                  for="spouse_job"
                  label="Job"
                  :ui="{ label: 'font-bold' }"
                  required
                />
                <UInput
                  id="spouse_job"
                  v-model="formData.spouse_job"
                  type="text"
                  size="lg"
                  class="w-full"
                  @blur="v$.spouse_job.$touch()"
                />
                <div
                  v-if="errorMessages.spouse_job"
                  class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1"
                >
                  {{ errorMessages.spouse_job }}
                </div>
              </div>
              <div class="w-full md:w-1/2 px-2 mb-4">
                <UFormField
                  for="spouse_mobile_phone"
                  label="Mobile Phone"
                  :ui="{ label: 'font-bold' }"
                  required
                />
                <UInput
                  id="spouse_mobile_phone"
                  v-model="formData.spouse_mobile_phone"
                  type="text"
                  size="lg"
                  class="w-full"
                  @blur="v$.spouse_mobile_phone.$touch()"
                />
                <div
                  v-if="errorMessages.spouse_mobile_phone"
                  class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1"
                >
                  {{ errorMessages.spouse_mobile_phone }}
                </div>
              </div>
            </div>
          </div>
          <div
            class="bg-emerald-600 text-white py-3 px-6 border-b flex items-center"
          >
            <span class="text-sm font-bold">Children Information</span>
          </div>
          <div class="p-2">
            <div
              v-for="(child, index) in formData.children"
              :key="index"
              class="mb-6 border-b border-gray-300 pb-4 flex"
            >
              <!-- Content (90% width) -->
              <div class="w-[90%] pr-4">
                <div class="flex flex-wrap -mx-2">
                  <div class="w-full md:w-1/6 px-2 mb-4">
                    <UFormField
                      :for="`child_name_${index}`"
                      label="Child Name"
                      :ui="{ label: 'font-bold' }"
                      required
                    />
                    <UInput
                      :id="`child_name_${index}`"
                      v-model="child.name"
                      type="text"
                      size="lg"
                      class="w-full"
                      @blur="v$.children[index].name.$touch()"
                    />
                    <div v-if="errorMessages.children[index]?.name" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                      {{ errorMessages.children[index].name }}
                    </div>
                  </div>
                  <div class="w-full md:w-1/6 px-2 mb-4">
                    <UFormField
                      :for="`child_nric_${index}`"
                      label="Nric"
                      :ui="{ label: 'font-bold' }"
                      required
                    />
                    <UInput
                      :id="`child_nric_${index}`"
                      v-model="child.nric"
                      type="text"
                      size="lg"
                      class="w-full"
                      @blur="v$.children[index].nric.$touch()"
                    />
                    <div v-if="errorMessages.children[index]?.nric" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                      {{ errorMessages.children[index].nric }}
                    </div>
                  </div>
                  <div class="w-full md:w-1/6 px-2 mb-4">
                    <UFormField
                      :for="`child_gender_${index}`"
                      label="Gender"
                      :ui="{ label: 'font-bold' }"
                      required
                    />
                    <USelect
                      :id="`child_gender_${index}`"
                      v-model="child.gender"
                      :items="genderOptions"
                      size="lg"
                      class="w-full"
                      @blur="v$.children[index].gender.$touch()"
                    />
                    <div v-if="errorMessages.children[index]?.gender" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                      {{ errorMessages.children[index].gender }}
                    </div>
                  </div>
                  <div class="w-full md:w-1/6 px-2 mb-4">
                    <UFormField
                      :for="`child_dob_${index}`"
                      label="Dob"
                      :ui="{ label: 'font-bold' }"
                      required
                    />
                    <UInput
                      :id="`child_dob_${index}`"
                      v-model="child.dob"
                      type="date"
                      size="lg"
                      class="w-full"
                      @blur="v$.children[index].dob.$touch()"
                    />
                    <div v-if="errorMessages.children[index]?.dob" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                      {{ errorMessages.children[index].dob }}
                    </div>
                  </div>
                  <div class="w-full md:w-1/6 px-2 mb-4">
                    <UFormField
                      :for="`child_martial_status_${index}`"
                      label="Martial Status"
                      :ui="{ label: 'font-bold' }"
                      required
                    />
                    <USelect
                      :id="`child_martial_status_${index}`"
                      v-model="child.martial_status"
                      :items="martialStatusOptions"
                      size="lg"
                      class="w-full"
                      @blur="v$.children[index].martial_status.$touch()"
                    />
                    <div v-if="errorMessages.children[index]?.martial_status" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                      {{ errorMessages.children[index].martial_status }}
                    </div>
                  </div>
                  <div class="w-full md:w-1/6 px-2 mb-4">
                    <UFormField
                      :for="`child_activity_${index}`"
                      label="Activity"
                      :ui="{ label: 'font-bold' }"
                      required
                    />
                    <USelect
                      :id="`child_activity_${index}`"
                      v-model="child.activity"
                      :items="activityOptions"
                      size="lg"
                      class="w-full"
                      @blur="v$.children[index].activity.$touch()"
                    />
                    <div v-if="errorMessages.children[index]?.activity" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                      {{ errorMessages.children[index].activity }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Actions (10% width) -->
              <div
                class="w-[10%] flex flex-row items-center justify-center space-x-2"
              >
                <UButton
                  color="error"
                  variant="solid"
                  icon="i-heroicons-trash"
                  @click="removeChild(index)"
                />
                <UButton
                  v-if="index === formData.children.length - 1"
                  color="secondary"
                  variant="solid"
                  icon="i-heroicons-plus"
                  @click="addChild"
                />
              </div>
            </div>
          </div>

          <UButton
            color="primary"
            variant="solid"
            label="Submit"
            @click="handleSubmit"
          />
        </UForm>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed,nextTick } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";

// Reactive tab state
const activeTab = ref("personal"); // Default to Profile Information tab

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
  spouse_name: "",
  spouse_nric: "",
  spouse_job: "",
  spouse_mobile_phone: "",
  emergency_contacts: [{ name: "", relation: "", phone_number: "" }],
  family_members: [
    {
      name: "",
      nric: "",
      gender: "",
      dob: "",
      phone_number: "",
      relation: "father",
      martial_status: "",
      activity: "",
      organization: "",
    }, // Father
    {
      name: "",
      nric: "",
      gender: "",
      dob: "",
      phone_number: "",
      relation: "mother",
      martial_status: "",
      activity: "",
      organization: "",
    }, // Mother
  ],
  children: [
    {
      name: "",
      nric: "",
      gender: "",
      dob: "",
      martial_status: "",
      status: "",
    }, 
  ],
});

// Validation rules
const rules = computed(() => ({
  // Personal Info
  name: { required: helpers.withMessage("Name is required", required),},
  nric: { required: helpers.withMessage("NRIC is required", required),},
  address_line1: { required: helpers.withMessage("Address Line 1 is required", required),},
  address_line2: {}, // Optional
  address_line3: {}, // Optional
  city: { required: helpers.withMessage("City is required", required),},
  state: { required: helpers.withMessage("State is required", required),},
  postcode: { required: helpers.withMessage("Postcode is required", required),},
  country: { required: helpers.withMessage("Country is required", required),},
  office_phone: { required: helpers.withMessage("Office Phone is required", required),},
  mobile_phone: { required: helpers.withMessage("Mobile Phone is required", required),},
  email: { required: helpers.withMessage("Email is required", required), email: helpers.withMessage("Invalid email format", email),},

  emergency_contacts: formData.value.emergency_contacts.map(() => ({
    name: { required: helpers.withMessage("Name is required", required) },
    relation: { required: helpers.withMessage("Relation is required", required) },
    phone_number: { required: helpers.withMessage("Phone number is required", required) },
  })),

  family_members: formData.value.family_members.map(() => ({
    name: { required: helpers.withMessage("Name is required", required) },
    nric: { required: helpers.withMessage("Nric is required", required) },
    gender: { required: helpers.withMessage("Gender is required", required) },
    dob: {},
    phone_number: { required: helpers.withMessage("Phone number is required", required) },
    relation: { required: helpers.withMessage("Relation is required", required) },
    martial_status: { required: helpers.withMessage("Martial status is required", required) },
    activity: { required: helpers.withMessage("Activity is required", required) },
    organization: {},
  })),

  children: formData.value.children.map(() => ({
    name: {},
    nric: {},
    gender: {},
    dob: {},
    martial_status: {},
    activity: {},
  })),

}));


// Options for dropdowns
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

const martialStatusOptions = ref([
  { value: "Single", label: "Single" },
  { value: "Married", label: "Married" },
  { value: "Divorced", label: "Divorced" },
  { value: "Widowed", label: "Widowed" },
  { value: "Separated", label: "Separated" },
]);

const activityOptions = ref([
  { value: "Employed", label: "Employed" },
  { value: "Unemployed", label: "Unemployed" },
  { value: "Study", label: "Study" },
]);

const relationOptions = ref([
  { value: "Father", label: "Father" },
  { value: "Mother", label: "Mother" },
  { value: "Brother", label: "Brother" },
  { value: "Sister", label: "Sister" },
]);

const genderOptions = ref([
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
]);

const religionOptions = ref([
  { value: "Islam", label: "Islam" },
  { value: "Christian", label: "Christian" },
  { value: "Buddha", label: "Buddha" },
]);

const raceOptions = ref([
  { value: "Malay", label: "Malay" },
  { value: "Chinese", label: "Chinese" },
  { value: "Indian", label: "Indian" },
  { value: "Bumiputera Sabah", label: "Bumiputera Sabah" },
  { value: "Bumiputera Sarawak", label: "Bumiputera Sarawak" },
  { value: "Orang Asli", label: "Orang Asli" },
  { value: "Other", label: "Other" },
]);

// Initialize Vuelidate
const v$ = useVuelidate(rules, formData);

// Backend errors
const backendErrors = ref({});

// Error messages
const errorMessages = computed(() => ({
  name: v$.value.name.$error
    ? v$.value.name.$errors[0].$message
    : backendErrors.value.name?.[0] || "",
  nric: v$.value.nric.$error
    ? v$.value.nric.$errors[0].$message
    : backendErrors.value.nric?.[0] || "",
  address_line1: v$.value.address_line1.$error
    ? v$.value.address_line1.$errors[0].$message
    : backendErrors.value.address_line1?.[0] || "",
  address_line2: backendErrors.value.address_line2?.[0] || "",
  address_line3: backendErrors.value.address_line3?.[0] || "",
  city: v$.value.city.$error
    ? v$.value.city.$errors[0].$message
    : backendErrors.value.city?.[0] || "",
  state: v$.value.state.$error
    ? v$.value.state.$errors[0].$message
    : backendErrors.value.state?.[0] || "",
  postcode: v$.value.postcode.$error
    ? v$.value.postcode.$errors[0].$message
    : backendErrors.value.postcode?.[0] || "",
  country: v$.value.country.$error
    ? v$.value.country.$errors[0].$message
    : backendErrors.value.country?.[0] || "",
  office_phone: v$.value.office_phone.$error
    ? v$.value.office_phone.$errors[0].$message
    : backendErrors.value.office_phone?.[0] || "",
  mobile_phone: v$.value.mobile_phone.$error
    ? v$.value.mobile_phone.$errors[0].$message
    : backendErrors.value.mobile_phone?.[0] || "",
  email: v$.value.email.$error
    ? v$.value.email.$errors[0].$message
    : backendErrors.value.email?.[0] || "",

  // Emergency Contacts (Handle errors dynamically for each index)
  emergency_contacts: formData.value.emergency_contacts.map((_, index) => ({
    name: v$.value.emergency_contacts[index]?.name.$error
      ? v$.value.emergency_contacts[index]?.name.$errors[0].$message
      : backendErrors.value?.emergency_contacts?.[index]?.name?.[0] || "",
    relation: v$.value.emergency_contacts[index]?.relation.$error
      ? v$.value.emergency_contacts[index]?.relation.$errors[0].$message
      : backendErrors.value?.emergency_contacts?.[index]?.relation?.[0] || "",
    phone_number: v$.value.emergency_contacts[index]?.phone_number.$error
      ? v$.value.emergency_contacts[index]?.phone_number.$errors[0].$message
      : backendErrors.value?.emergency_contacts?.[index]?.phone_number?.[0] || "",
  })),

  // Family Members (Handle errors dynamically for each index)
  family_members: formData.value.family_members.map((_, index) => ({
    name: v$.value.family_members[index]?.name.$error
      ? v$.value.family_members[index]?.name.$errors[0].$message
      : backendErrors.value?.family_members?.[index]?.name?.[0] || "",
    nric: v$.value.family_members[index]?.nric.$error
      ? v$.value.family_members[index]?.nric.$errors[0].$message
      : backendErrors.value?.family_members?.[index]?.nric?.[0] || "",
    gender: v$.value.family_members[index]?.gender.$error
      ? v$.value.family_members[index]?.gender.$errors[0].$message
      : backendErrors.value?.family_members?.[index]?.gender?.[0] || "",
    dob: v$.value.family_members[index]?.dob.$error
      ? v$.value.family_members[index]?.dob.$errors[0].$message
      : backendErrors.value?.family_members?.[index]?.dob?.[0] || "",
    phone_number: v$.value.family_members[index]?.phone_number.$error
      ? v$.value.family_members[index]?.phone_number.$errors[0].$message
      : backendErrors.value?.family_members?.[index]?.phone_number?.[0] || "",
    relation: v$.value.family_members[index]?.relation.$error
      ? v$.value.family_members[index]?.relation.$errors[0].$message
      : backendErrors.value?.family_members?.[index]?.relation?.[0] || "",
    martial_status: v$.value.family_members[index]?.martial_status.$error
      ? v$.value.family_members[index]?.martial_status.$errors[0].$message
      : backendErrors.value?.family_members?.[index]?.martial_status?.[0] || "",
    activity: v$.value.family_members[index]?.activity.$error
      ? v$.value.family_members[index]?.activity.$errors[0].$message
      : backendErrors.value?.family_members?.[index]?.activity?.[0] || "",
    organization: v$.value.family_members[index]?.organization.$error
      ? v$.value.family_members[index]?.organization.$errors[0].$message
      : backendErrors.value?.family_members?.[index]?.organization?.[0] || "",                  
  })),

  // Children (Handle errors dynamically for each index)
  children: formData.value.children.map((_, index) => ({
    name: v$.value.children[index]?.name.$error
      ? v$.value.children[index]?.name.$errors[0].$message
      : backendErrors.value?.children?.[index]?.name?.[0] || "",
    nric: v$.value.children[index]?.nric.$error
      ? v$.value.children[index]?.nric.$errors[0].$message
      : backendErrors.value?.children?.[index]?.nric?.[0] || "",
    gender: v$.value.children[index]?.gender.$error
      ? v$.value.children[index]?.gender.$errors[0].$message
      : backendErrors.value?.children?.[index]?.gender?.[0] || "",
    dob: v$.value.children[index]?.dob.$error
      ? v$.value.children[index]?.dob.$errors[0].$message
      : backendErrors.value?.children?.[index]?.dob?.[0] || "",
    martial_status: v$.value.children[index]?.martial_status.$error
      ? v$.value.children[index]?.martial_status.$errors[0].$message
      : backendErrors.value?.children?.[index]?.martial_status?.[0] || "",       
    activity: v$.value.children[index]?.activity.$error
      ? v$.value.children[index]?.activity.$errors[0].$message
      : backendErrors.value?.children?.[index]?.activity?.[0] || "",   
  })),

}));

// Methods to add and remove children
const addChild = () => {
  formData.value.children.push({
    name: "",
    identification_no: "",
    date_of_birth: "",
  });
};

const removeChild = (index) => {
  if (formData.value.children.length > 1) {
    formData.value.children.splice(index, 1);
  } else {
    alert("At least one child entry is required.");
  }
};

// Methods to add and remove emergency contacts
const addEmergencyContact = () => {
  formData.value.emergency_contacts.push({
    name: "",
    relation: "",
    phone_number: "",
  });
};


const removeEmergencyContact = (index) => {
  if (formData.value.emergency_contacts.length > 1) {
    formData.value.emergency_contacts.splice(index, 1);
  } else {
    alert("At least one emergency contact is required.");
  }
};

// Methods to add and remove emergency contacts
const addFamilyMember = () => {
  formData.value.family_members.push({
    name: "",
    nric: "",
    gender: "",
    dob: "",
    phone_number: "",
    relation: "",
    marital_status: "",
    status: "",
    organization: "",
  });
};

const removeFamilyMember = (index) => {
  if (formData.value.family_members.length > 1) {
    formData.value.family_members.splice(index, 1);
  } else {
    alert("At least one emergency contact is required.");
  }
};

// Form submission
const handleSubmit = async () => {
  v$.value.$touch();
  if (v$.value.$invalid) {
    console.log("Please fill in all required fields", errorMessages.value);
    return;
  }

  try {
    const response = await $fetch("/api/persidangan/", {
      method: "POST",
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
