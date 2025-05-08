<template>
  <div class="flex min-h-screen bg-gray-200">
    <!-- Sidebar -->
    <aside :class="['bg-emerald-700 text-white shadow-md transition-all duration-300 sticky top-0 min-h-screen', sidebarOpen ? 'w-64' : 'w-20']">
      <div class="relative z-10">
        <div class="p-5 flex items-center justify-between">
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
              <NuxtLink to="/" class="flex items-center p-3 rounded-lg hover:bg-emerald-800" exact-active-class="bg-emerald-900 text-white">
                <UIcon name="mdi:view-dashboard" class="w-5 h-5 mr-2" />
                <span v-if="sidebarOpen" class="ml-3">Dashboard</span>
              </NuxtLink>
            </li>
            <li class="mb-2 mx-2">
              <NuxtLink to="/profile/personal" class="flex items-center p-3 rounded-lg hover:bg-emerald-800" exact-active-class="bg-emerald-900 text-white">
                <UIcon name="mdi:account" class="w-5 h-5 mr-2" />
                <span v-if="sidebarOpen" class="ml-3">Profile</span>
              </NuxtLink>
            </li>
            <!-- Leave Management -->
            <li class="mb-2 mx-2">
              <button @click="toggleLeaveMenu" class="flex items-center w-full p-3 rounded-lg hover:bg-emerald-800 text-left" :class="{ 'bg-emerald-900': leaveMenuOpen }">
                <UIcon name="mdi:calendar-clock" class="w-5 h-5 mr-2" />
                <span v-if="sidebarOpen" class="ml-3">Leave Management</span>
                <UIcon :name="leaveMenuOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'" class="w-5 h-5 ml-auto" v-if="sidebarOpen" />
              </button>
              <ul v-if="leaveMenuOpen && sidebarOpen" class="pl-10 mt-1 space-y-1">
                <li><NuxtLink to="/leave/apply" class="flex items-center p-2 rounded-lg hover:bg-emerald-800" exact-active-class="bg-emerald-900 text-white"><UIcon name="mdi:calendar-plus" class="w-5 h-5 mr-2" /><span>Apply Leave</span></NuxtLink></li>
                <li><NuxtLink to="/leave/requests" class="flex items-center p-2 rounded-lg hover:bg-emerald-800" exact-active-class="bg-emerald-900 text-white"><UIcon name="mdi:calendar-question" class="w-5 h-5 mr-2" /><span>Leave Requests</span></NuxtLink></li>
                <li><NuxtLink to="/leave/balance" class="flex items-center p-2 rounded-lg hover:bg-emerald-800" exact-active-class="bg-emerald-900 text-white"><UIcon name="mdi:calendar-check" class="w-5 h-5 mr-2" /><span>Leave Balance</span></NuxtLink></li>
                <li><NuxtLink to="/leave/approvals" class="flex items-center p-2 rounded-lg hover:bg-emerald-800" exact-active-class="bg-emerald-900 text-white"><UIcon name="mdi:calendar-edit" class="w-5 h-5 mr-2" /><span>Leave Approvals</span></NuxtLink></li>
                <li><NuxtLink to="/leave/limits" class="flex items-center p-2 rounded-lg hover:bg-emerald-800" exact-active-class="bg-emerald-900 text-white"><UIcon name="mdi:calendar-range" class="w-5 h-5 mr-2" /><span>Leave Limits</span></NuxtLink></li>
              </ul>
            </li>
            <!-- Employee Management -->
            <li class="mb-2 mx-2">
              <button @click="toggleEmployeeMenu" class="flex items-center w-full p-3 rounded-lg hover:bg-emerald-800 text-left" :class="{ 'bg-emerald-900': employeeMenuOpen }">
                <UIcon name="mdi:account-group" class="w-5 h-5 mr-2" />
                <span v-if="sidebarOpen" class="ml-3">Manage Employee</span>
                <UIcon :name="employeeMenuOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'" class="w-5 h-5 ml-auto" v-if="sidebarOpen" />
              </button>
              <ul v-if="employeeMenuOpen && sidebarOpen" class="pl-10 mt-1 space-y-1">
                <li><NuxtLink to="/employee/new" class="flex items-center p-2 rounded-lg hover:bg-emerald-800" exact-active-class="bg-emerald-900 text-white"><UIcon name="mdi:account-plus" class="w-5 h-5 mr-2" /><span>Add Employee</span></NuxtLink></li>
                <li><NuxtLink to="/employee" class="flex items-center p-2 rounded-lg hover:bg-emerald-800" exact-active-class="bg-emerald-900 text-white"><UIcon name="mdi:account-details" class="w-5 h-5 mr-2" /><span>List Employee</span></NuxtLink></li>
              </ul>
            </li>
            <!-- Payslip Module -->
            <li class="mb-2 mx-2">
              <NuxtLink to="/payslip" class="flex items-center p-3 rounded-lg hover:bg-emerald-800" exact-active-class="bg-emerald-900 text-white">
                <UIcon name="mdi:currency-usd" class="w-5 h-5 mr-2" />
                <span v-if="sidebarOpen" class="ml-3">Payslip</span>
              </NuxtLink>
            </li>
            <!-- Settings -->
            <!-- <li class="mb-2 mx-2">
              <NuxtLink to="/setting" class="flex items-center p-3 rounded-lg hover:bg-emerald-800" exact-active-class="bg-emerald-900 text-white">
                <UIcon name="ic:sharp-settings" class="w-5 h-5 mr-2" />
                <span v-if="sidebarOpen" class="ml-3">Settings</span>
              </NuxtLink>
            </li> -->
            <li class="mb-2 mx-2">
              <button 
                @click="toggleSettingsMenu" 
                class="flex items-center w-full p-3 rounded-lg hover:bg-emerald-800 text-left"
                :class="{ 'bg-emerald-900': settingsMenuOpen }"
              >
                <UIcon name="ic:sharp-settings" class="w-5 h-5 mr-2" />
                <span v-if="sidebarOpen" class="ml-3">Settings</span>
                <UIcon 
                  :name="settingsMenuOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'" 
                  class="w-5 h-5 ml-auto" 
                  v-if="sidebarOpen" 
                />
              </button>
              <ul v-if="settingsMenuOpen && sidebarOpen" class="pl-10 mt-1 space-y-1">
                <li>
                  <NuxtLink to="/setting/reset-password" class="flex items-center p-2 rounded-lg hover:bg-emerald-800" exact-active-class="bg-emerald-900 text-white">
                    <UIcon name="mdi:lock-reset" class="w-5 h-5 mr-2" />
                    <span>Reset Password</span>
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/setting/company-info" class="flex items-center p-2 rounded-lg hover:bg-emerald-800" exact-active-class="bg-emerald-900 text-white">
                    <UIcon name="mdi:office-building" class="w-5 h-5 mr-2" />
                    <span>Company Info</span>
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/setting/notifications" class="flex items-center p-2 rounded-lg hover:bg-emerald-800" exact-active-class="bg-emerald-900 text-white">
                    <UIcon name="mdi:bell-settings" class="w-5 h-5 mr-2" />
                    <span>Notifications</span>
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/setting/payslip-config" class="flex items-center p-2 rounded-lg hover:bg-emerald-800" exact-active-class="bg-emerald-900 text-white">
                    <UIcon name="mdi:file-document-edit" class="w-5 h-5 mr-2" />
                    <span>Payslip Config</span>
                  </NuxtLink>
                </li>
              </ul>
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
        <div class="flex items-center space-x-6">
          <!-- Notification Icon -->
          <div class="relative">
            <button 
              @click="toggleNotifications" 
              class="focus:outline-none p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Toggle notifications"
            >
              <UIcon 
                name="mdi:bell" 
                class="size-6 text-gray-600" 
              />
              <span 
                v-if="unreadNotifications > 0" 
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center"
              >
                {{ unreadNotifications > 9 ? '9+' : unreadNotifications }}
              </span>
            </button>
            <div 
              v-if="notificationsOpen" 
              class="absolute right-0 mt-3 w-96 bg-white border border-gray-200 rounded-xl shadow-lg py-3 z-20"
            >
              <!-- Notification Header -->
              <div class="flex items-center justify-between px-4 py-2 border-b border-gray-200">
                <span class="text-sm font-semibold text-gray-800">Notifications</span>
                <button 
                  v-if="notifications.length > 0" 
                  @click="markAllAsRead" 
                  class="text-xs text-emerald-600 hover:text-emerald-800 transition-colors"
                >
                  Mark All as Read
                </button>
              </div>
              <!-- Notification List -->
              <div v-if="notifications.length === 0" class="px-4 py-3 text-gray-500 text-sm">
                No new notifications
              </div>
              <template v-else>
                <div 
                  v-for="(notification, index) in notifications" 
                  :key="notification.id" 
                  class="px-4 py-3 hover:bg-gray-50 transition-colors duration-150"
                >
                  <div class="flex items-start space-x-3">
                    <UIcon 
                      :name="notification.icon || 'mdi:information'" 
                      class="w-5 h-5 text-emerald-500 mt-0.5" 
                    />
                    <div class="flex-1">
                      <p class="text-sm text-gray-800">{{ notification.message }}</p>
                      <p class="text-xs text-gray-500 mt-1">{{ notification.timestamp }}</p>
                    </div>
                  </div>
                  <hr v-if="index < notifications.length - 1" class="border-t border-gray-200 mt-3 -mx-4" />
                </div>
              </template>
            </div>
          </div>
          <!-- Profile Dropdown -->
          <div class="relative">
            <button 
              @click="toggleDropdown" 
              class="focus:outline-none p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Toggle profile menu"
            >
              <UIcon 
                name="mdi:account-circle" 
                class="size-8 bg-emerald-500 text-white rounded-full" 
              />
            </button>
            <div 
              v-if="dropdownOpen" 
              class="absolute right-0 mt-3 w-56 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-20"
            >
              <div class="px-4 py-2 text-sm text-gray-700">
                <p class="font-semibold">Muhammad Hanif</p>
                <p class="text-xs text-gray-500">hanif@example.com</p>
              </div>
              <hr class="border-t border-gray-200 my-1" />
              <NuxtLink 
                to="/profile" 
                class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-emerald-600 transition-colors duration-150"
              >
                <UIcon name="mdi:account" class="w-5 h-5 mr-2" />
                Profile
              </NuxtLink>
              <button 
                @click="signOut" 
                class="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-emerald-600 transition-colors duration-150"
              >
                <UIcon name="mdi:logout" class="w-5 h-5 mr-2" />
                Sign Out
              </button>
            </div>
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

definePageMeta({
  middleware: ['$auth'],
});

const sidebarOpen = ref(true);
const dropdownOpen = ref(false);
const employeeMenuOpen = ref(false);
const leaveMenuOpen = ref(false);
const notificationsOpen = ref(false);
const settingsMenuOpen = ref(false);
const currentTime = ref('');
const currentDate = ref('');
const { logout } = useSanctum();


// Dummy notification data
const notifications = ref([
  { id: 1, message: "Leave request #123 approved by HR", timestamp: "2 mins ago", icon: "mdi:calendar-check" },
  { id: 2, message: "Your leave application submitted", timestamp: "10 mins ago", icon: "mdi:calendar-plus" },
]);
const unreadNotifications = computed(() => notifications.value.length);

// Update time and date
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
  if (notificationsOpen.value) notificationsOpen.value = false; // Close notifications if open
};

const toggleEmployeeMenu = () => {
  employeeMenuOpen.value = !employeeMenuOpen.value;
};

const toggleLeaveMenu = () => {
  leaveMenuOpen.value = !leaveMenuOpen.value;
};

const toggleNotifications = () => {
  notificationsOpen.value = !notificationsOpen.value;
  if (dropdownOpen.value) dropdownOpen.value = false; // Close profile dropdown if open
};

const toggleSettingsMenu = () => {
  settingsMenuOpen.value = !settingsMenuOpen.value;
};

const markAllAsRead = () => {
  notifications.value = []; // Simulate marking all as read (replace with API logic later)
  console.log("All notifications marked as read");
};


const signOut = async () => {
  await logout();
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