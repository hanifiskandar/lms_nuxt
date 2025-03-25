<template>
  <div class="flex h-screen bg-gray-200">
    <!-- Sidebar -->
    <aside :class="['bg-emerald-700 text-white shadow-md transition-all duration-300', sidebarOpen ? 'w-64' : 'w-20']">

      <!-- Sidebar Content -->
      <div class="relative z-10">
        <div class="p-5 flex items-center justify-between">
          <!-- Logo/Icon -->
          <div class="flex items-center space-x-3">
            <!-- Leaf Icon (SVG) -->
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
              <NuxtLink to="/dashboard" class="flex items-center p-3 rounded-lg hover:bg-emerald-800">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 10l1-2m0 0a9 9 0 0116 0m-16 0a9 9 0 0016 0m-8 0v4m0 4h.01" />
                </svg>
                <span v-if="sidebarOpen" class="ml-3">Dashboard</span>
              </NuxtLink>
            </li>
            <li class="mb-2 mx-2">
              <NuxtLink to="/users" class="flex items-center p-3 rounded-lg hover:bg-emerald-800">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
                </svg>
                <span v-if="sidebarOpen" class="ml-3">Users</span>
              </NuxtLink>
            </li>
            <li class="mb-2 mx-2">
              <NuxtLink to="/settings" class="flex items-center p-3 rounded-lg hover:bg-emerald-800">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
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
      <header class="bg-white shadow p-4 flex justify-between items-center">
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
          <button @click="toggleDropdown" class="bg-emerald-500 text-white px-4 py-2 rounded-lg flex items-center">
            <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A4 4 0 0112 14a4 4 0 016.879 3.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Profile
          </button>
          <div v-if="dropdownOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
            <NuxtLink to="/profile" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</NuxtLink>
            <button @click="logout" class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Sign Out</button>
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
  currentTime.value = now.toLocaleTimeString(); // e.g., "2:35:47 PM"
  currentDate.value = now.toLocaleDateString('en-US', { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }); // e.g., "Tue, Mar 25, 2025"
};

// Update every second
let timeInterval;
onMounted(() => {
  updateTimeAndDate(); // Set initial time and date
  timeInterval = setInterval(updateTimeAndDate, 1000); // Update every second
});

onUnmounted(() => {
  clearInterval(timeInterval); // Clean up interval when component unmounts
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