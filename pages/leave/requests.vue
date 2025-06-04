<template>
  <div class="bg-white p-4 rounded-lg shadow-md">
    <!-- My Requests -->
    <div class="mt-2">
      <div class="bg-emerald-600 text-white py-3 px-6 border-b flex items-center">
        <span class="text-sm font-bold">My Leave Requests</span>
            <!-- <div v-if="auth.isCEO">CEO Dashboard</div> -->
      </div>
      <MyLeaveRequests @loading="isLoading = $event" />
    </div>
  </div>
  <div v-if="auth.isHeadOfDepartment" class="bg-white p-4 rounded-lg shadow-md mt-10">
    <!-- Requests To Approve -->
    <div class="mt-2">
      <div class="bg-orange-500 text-white py-3 px-6 border-b flex items-center">
        <span class="text-sm font-bold">Leave Approval Requests</span>
      </div>
      <LeaveApprovalRequests @loading="isLoading = $event" />
    </div>
  </div>
</template>

<script setup>

import MyLeaveRequests from '~/components/leave/MyLeaveRequests.vue'
import LeaveApprovalRequests from '~/components/leave/LeaveApprovalRequests.vue'

definePageMeta({
  middleware: ['auth'],
});
const auth = useAuth();
const isLoading = ref(false)
</script>
