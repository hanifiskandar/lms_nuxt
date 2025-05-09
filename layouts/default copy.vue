<template>
  <div class="flex min-h-screen bg-gray-200">
    <!-- Sidebar -->
    <aside :class="['bg-emerald-700 text-white shadow-md transition-all duration-300 sticky top-0 min-h-screen', sidebarOpen ? 'w-64' : 'w-20']">
      <!-- Sidebar Content -->
      <div class="relative z-10">
        <div class="p-5 flex items-center justify-between">
          <!-- Logo/Icon -->
          <div class="flex items-center space-x-3">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              <path d="M12 3C9 3 6 6 6 9c0 4 6 9 6 9s6-5 6-9c0-3-3-6-6-6zm0 2c2 0 4 2 4 4s-2 4-4 4-4-2-4-4 2-4 4-4z"></path>
            </svg>
            <h2 v-if="sidebarOpen" class="text-xl font-bold drop-shadow-md">LeafSync</h2>
          </div>
        </div>
       <nav>
          <ul>
            <li class="mb-2 mx-2">
              <NuxtLink 
                to="/" 
                class="flex items-center p-3 rounded-lg hover:bg-emerald-800"
                exact-active-class="bg-emerald-900 text-white"
              >
                <UIcon name="mdi:view-dashboard" class="w-5 h-5 mr-2" />
                <span v-if="sidebarOpen" class="ml-3">Dashboard</span>
              </NuxtLink>
            </li>
            <li class="mb-2 mx-2">
              <NuxtLink 
                to="/profile" 
                class="flex items-center p-3 rounded-lg hover:bg-emerald-800"
                exact-active-class="bg-emerald-900 text-white"
              >
                <UIcon name="mdi:account" class="w-5 h-5 mr-2" />
                <span v-if="sidebarOpen" class="ml-3">Profile</span>
              </NuxtLink>
            </li>
            <li class="mb-2 mx-2">
              <NuxtLink 
                to="/setting" 
                class="flex items-center p-3 rounded-lg hover:bg-emerald-800"
                exact-active-class="bg-emerald-900 text-white"
              >
                <UIcon name="ic:sharp-settings" class="w-5 h-5 mr-2" />
                <span v-if="sidebarOpen" class="ml-3">Settings</span>
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Navbar -->
      <header class="bg-white shadow p-4 flex justify-between items-center sticky top-0 z-10">
        <button @click="toggleSidebar" class="focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button> 
        <div class="flex-1 ml-4">
          <h1 class="text-xl font-semibold animated-gradient">
            Welcome, <span class="font-bold">Muhammad Hanif Bin Iskandar</span>
          </h1>
          <div class="flex items-center space-x-2">
            <p class="text-sm text-gray-600">{{ currentTime }}</p>
            <p class="text-sm text-gray-600">{{ currentDate }}</p>
          </div>
        </div>
        <div class="relative">
          <button @click="toggleDropdown">
            <UIcon name="mdi:account-circle" class="size-10 bg-emerald-500 text-white rounded-full" />
          </button>
          <div v-if="dropdownOpen" class="absolute right-0 mt-2 w-48 bg-white border border-gray-500 rounded-lg shadow-md py-2 ring-1 ring-emerald-200">
            <NuxtLink to="/profile" class="flex items-center px-4 py-1 font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors duration-200">
              <UIcon name="mdi:account" class="w-5 h-5 mr-2" />
              Profile
            </NuxtLink>
            <hr class="border-t border-gray-200 my-1" />
            <button @click="logout" class="flex items-center w-full text-left px-4 py-1 font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors duration-200">
              <UIcon name="mdi:logout" class="w-5 h-5 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const sidebarOpen = ref(true);
const dropdownOpen = ref(false);
const currentTime = ref('');
const currentDate = ref('');

// Function to update the time and date
const updateTimeAndDate = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString();
  currentDate.value = now.toLocaleDateString('en-US', { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

const organizationOptions = ref([
  { value: "agensi1", label: "Agensi 1" },
  { value: "agensi2", label: "Agensi 2" },
]);

let timeInterval;
onMounted(() => {
  updateTimeAndDate();
  timeInterval = setInterval(updateTimeAndDate, 1000);
});

onUnmounted(() => {
  clearInterval(timeInterval);
});

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const logout = () => {
  console.log("Logging out...");
};
</script>

<style scoped>
.animated-gradient {
  background: linear-gradient(90deg, #10b981, #047857, #10b981);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: gradientShift 3s ease infinite;
}
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>