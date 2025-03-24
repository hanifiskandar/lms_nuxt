  <template>
    <div class="flex min-h-screen bg-gray-100">
      <!-- Left side: Image/Logo -->
      <div class="hidden lg:flex w-1/2 items-center justify-center bg-gradient-to-br from-blue-900 to-indigo-800 text-white p-12">
        <div class="text-center">
          <h1 class="text-5xl font-bold mb-4">Welcome Back!</h1>
          <p class="text-xl opacity-80">We're glad to see you again</p>
        </div>
      </div>
      
      <!-- Right side: Login Form with Card -->
      <div class="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div class="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-200">
          <h2 class="text-3xl font-semibold mb-8 text-center text-gray-800">Sign In</h2>
          
          <form @submit.prevent>
            <div class="mb-6">
              <UFormField label="Email Address" name="email">
                <UInput
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  required
                  class="mt-2 w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </UFormField>
            </div>

            <div class="mb-6">
              <UFormField label="Password" name="password">
                <UInput
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  required
                  class="mt-2 w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </UFormField>
            </div>

            <div class="flex items-center justify-between mb-8">
              <label class="flex items-center">
                <UCheckbox 
                  name="stay-logged-in"
                  label="Remember me"
                  class="mr-2"
                />
              </label>
              <NuxtLink 
                to="/forgot-password" 
                class="text-blue-600 hover:underline text-sm font-medium"
              >
                Forgot Password?
              </NuxtLink>
            </div>

            <UButton
              type="submit"
              label="Sign In"
              color="primary"
              variant="solid"
              class="w-full py-3 text-lg font-medium rounded-lg hover:shadow-md transition-all duration-200"
            />

            <p class="mt-6 text-center text-sm text-gray-600">
              Don't have an account? 
              <NuxtLink 
                to="/register" 
                class="text-blue-600 hover:underline font-medium"
              >
                Sign Up
              </NuxtLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  </template>

  <style scoped>
  input:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
  </style>