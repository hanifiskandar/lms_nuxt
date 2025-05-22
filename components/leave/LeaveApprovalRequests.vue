<template>
  <div>
    <!-- Filter Bar -->
    <LeaveFilter
      :leaveTypeOptions="leaveTypeOptions"
      :durationOptions="durationOptions"
      v-model:filter="filter"
      @reset="resetFilter"
    />
    {{ data }}
    <!-- Table -->
    <LeaveRequestTable
      :dataList="data"
      :showAction="true"
      @approve="handleApprove"
      @reject="handleReject"
    />

    <!-- Pagination -->
    <div class="mt-4 flex justify-end">
      <UPagination
        v-model:page="currentPage"
        :total="totalItems"
        :items-per-page="itemsPerPage"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import LeaveRequestTable from './LeaveRequestTable.vue'
import LeaveFilter from './LeaveFilter.vue'

const filter = reactive({
  leave_type: null,
  duration: null,
  start_date: null,
  end_date: null,
})

const currentPage = ref(1)
const itemsPerPage = 6
const totalItems = ref(0)
const data = ref([])

const leaveTypeOptions = ref([])
const durationOptions = ref([
  { value: 'full_day', label: 'Full Day' },
  { value: 'half_day', label: 'Half Day' },
])

const getLeaveTypes = async () => {
  const res = await $fetch('/api/setting/leave-types')
  leaveTypeOptions.value = res.data
}

const getData = async () => {
  try {
    const response = await $fetch('/api/leave/approval/requests', {
      method: 'GET',
      query: {
        leave_type: filter.leave_type,
        duration: filter.duration,
        start_date: filter.start_date,
        end_date: filter.end_date,
        page: currentPage.value,
        per_page: itemsPerPage,
      },
    })
    data.value = response.data
    totalItems.value = response.meta.total
  } catch (error) {
    console.error('Error loading data:', error)
  }
}

const resetFilter = () => {
  filter.leave_type = null
  filter.duration = null
  filter.start_date = null
  filter.end_date = null
  currentPage.value = 1
  getData()
}

watch([() => filter.leave_type, () => filter.duration, () => filter.start_date, () => filter.end_date, currentPage], () => {
  getData()
})

const handleApprove = async (item) => {
  try {
    const response = await $fetch(`/api/leave/approval/approve/${item.id}`, {
      method: 'PATCH',
    });
    console.log('Approved:', response)
  } catch (error) {
    console.error("Approve error:", error);
  }
};

const handleReject = async (item) => {
  try {
    const response = await $fetch(`/api/leave/approval/reject/${item.id}`, {
      method: 'PATCH',
    });
    console.log('Rejected:', response)
  } catch (error) {
    console.error("Reject error:", error);
  }
};


onMounted(() => {
  getLeaveTypes()
  getData()
})
</script>
