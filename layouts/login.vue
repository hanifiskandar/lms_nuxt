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
        
        <form @submit.prevent>
          <div class="mb-4">
            <UFormField label="Email Address" name="email">
              <UInput
                type="email"
                id="email"
                placeholder="Enter your email"
                required
                class="mt-2 w-full py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </UFormField>
          </div>

          <div class="mb-4">
            <UFormField label="Password" name="password">
              <UInput
                type="password"
                id="password"
                placeholder="Enter your password"
                required
                class="mt-2 w-full py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </UFormField>
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
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2); /* Updated to emerald-500 with opacity */
}
</style>