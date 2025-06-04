<template>
  <div>
    <!-- Filter Bar -->
    <LeaveFilter
      :leaveTypeOptions="leaveTypeOptions"
      :durationOptions="durationOptions"
      v-model:filter="filter"
      @reset="resetFilter"
    />
    <!-- {{ data }} -->
    <!-- Table -->
    <LeaveRequestTable :dataList="data" :showActions="false" />

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

const emit = defineEmits(['loading'])

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
  emit('loading', true)
  try {
    const response = await $fetch('/api/leave/requests', {
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
  } finally {
    emit('loading', false)
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

onMounted(() => {
  getLeaveTypes()
  getData()
})
</script>
