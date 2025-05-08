<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Left side: Image/Logo with very faint image and strong gradient -->
    <div 
      class="hidden lg:flex w-1/2 text-white p-12 bg-gradient-to-br from-emerald-700 to-emerald-900 bg-cover bg-center relative overflow-hidden"
    >
      <!-- Background image with very low opacity -->
      <div 
        class="absolute inset-0 bg-cover bg-center" 
        style="background-image: url('/images/login-bg.jpg'); opacity: 0.15; filter: blur(10px);"
      ></div>
      <!-- Content -->
      <div class="relative z-10 flex flex-col h-full w-full">
        <!-- LeafSync with Leaf Icon at Top-Left -->
        <div class="flex items-center mb-8">
          <!-- Leaf Icon (SVG) -->
          <svg class="w-10 h-10 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            <path d="M12 3C9 3 6 6 6 9c0 4 6 9 6 9s6-5 6-9c0-3-3-6-6-6zm0 2c2 0 4 2 4 4s-2 4-4 4-4-2-4-4 2-4 4-4z"></path>
          </svg>
          <h1 class="text-4xl font-bold drop-shadow-md">LeafSync</h1>
        </div>
        <!-- Three Key Points Centered -->
        <div class="flex-1 flex items-center justify-center">
          <ul class="text-lg opacity-80 space-y-4 text-center">
            <li class="flex items-center justify-center drop-shadow-sm">
              <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
              Fast and easy scheduling
            </li>
            <li class="flex items-center justify-center drop-shadow-sm">
              <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
              Access from anywhere
            </li>
            <li class="flex items-center justify-center drop-shadow-sm">
              <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
              Hassle-free leave tracking
            </li>
          </ul>
        </div>
      </div>
    </div>
    
    <!-- Right side: Login Form with Card -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
      <div class="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <h2 class="text-3xl font-semibold mb-4 text-center text-gray-800">Login</h2>
        
        <UForm :state="formData" class="space-y-4 max-w-8xl mx-1" @submit="onSubmit">
          <div class="mb-4">
            <UFormField label="Username" name="username" required/>
              <UInput
                v-model="formData.username"
                type="text"
                id="username"
                placeholder="Enter your username"
                class="mt-2 w-full py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                @blur="v$.username.$touch()"
              />
              <div v-if="errorMessages.username" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                {{ errorMessages.username }}
              </div>
          </div>

          <div class="mb-4">
            <UFormField label="Password" name="password" required/>
              <UInput
                v-model="formData.password"
                type="password"
                id="password"
                placeholder="Enter your password"
                class="mt-2 w-full py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                @blur="v$.password.$touch()"
              />
              <div v-if="errorMessages.password" class="text-red-500 text-xs font-medium tracking-wide px-3 pt-1">
                {{ errorMessages.password }}
              </div>
          </div>

          <div class="flex items-center justify-between mb-8">
            <UCheckbox 
                name="stay-logged-in"
                label="Remember me"
                class="mr-2"
            />
            <NuxtLink 
              to="/forgot-password" 
              class="text-emerald-600 hover:underline text-sm font-medium"
            >
              Forgot Password?
            </NuxtLink>
          </div>

          <UButton
            type="submit"
            color="primary"
            variant="solid"
            class="w-full py-3 text-lg font-medium rounded-lg hover:shadow-md transition-all duration-200 flex justify-center items-center"
          >Login</UButton>
        </UForm>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers, sameAs } from "@vuelidate/validators";

// definePageMeta({
//     middleware: ['$guest'],
// });

const { login } = useSanctum();

const formData = ref({
  username: "",
  password: "",
});

const rules = {
  username: { required: helpers.withMessage("Username is required", required) },
  password: { required: helpers.withMessage("Password is required", required) },
}

const v$ = useVuelidate(rules, formData);

const backendErrors = ref({});

const errorMessages = computed(() => ({
  username: v$.value.username.$error ? v$.value.username.$errors[0].$message : backendErrors.value.username?.[0] || "",
  password: v$.value.password.$error ? v$.value.password.$errors[0].$message : backendErrors.value.password?.[0] || "",
}));

const onSubmit = async () => {
  v$.value.$touch();

  if (v$.value.$invalid) {
    console.log("Please fill in all required fields", errorMessages.value);
    return;
  }

  try {
    await login(formData.value);

    backendErrors.value = {};
  } catch (error) {
    backendErrors.value = error.response?.data?.errors || {};
    console.error("Submission error:", backendErrors.value);
  }
};

</script>

<style scoped>
input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2); /* Updated to emerald-500 with opacity */
}
</style>