<script setup lang="ts">
import type { StudentItem } from '@/type'
import type { PropType } from 'vue'
import { useAuthStore } from '@/stores/auth.ts'

const authStore = useAuthStore()

defineProps({
  student: {
    type: Object as PropType<StudentItem>,
    require: true
  }
})
</script>

<template>
  <RouterLink :to="{name: 'student-detail', params: {id: student?.id}}">
    <div class="student-class flex flex-col items-center justify-center">
      <div
        class="grid gap-5 grid-cols-2 p-3 w-80 h-[120px] cursor-pointer border border-gray-700 rounded-lg mb-4 transition-transform duration-300 transform hover:scale-105 hover:shadow-md hover:bg-gray-100 bg-white"
      >
        <div class="flex justify-center items-center">
          
          <img :src="student?.images" alt="" class="w-24 h-24 object-cover rounded-full" />
        </div>
        <div class="">
          <span class="font-fig text-xs text-gray-500">StudentID: {{ student?.username }}</span> <br />
          <span class="font-fig font-bold text-black"> {{ student?.name }} {{ student?.surname }}</span> <br />
          <span v-if="authStore.userRole == 'ROLE_ADMIN'" class="font-fig font-bold text-gray-400">Advisor: {{student?.teacher?.name}}</span>

          <ul class="list-disc list-inside">
            <li v-for="course in student?.courselist" :key="course" class="text-gray-700 text-sm font-fig">
              {{ course }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </RouterLink>
</template>
