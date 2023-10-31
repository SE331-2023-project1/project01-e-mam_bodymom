<script setup lang="ts">
import type { TeacherItem } from '@/type'
import type { PropType } from 'vue'

defineProps({
  teacher: {
    type: Object as PropType<TeacherItem>,
    require: true
  }
})


</script>

<template>
  <RouterLink :to="{ name: 'teacher-detail', params: { id: teacher?.id } }">
    <div class="teacher-class flex flex-col items-center justify-center">
      <div
        class="grid gap-5 grid-cols-2 p-5 w-100 h-[160px] cursor-pointer border border-gray-700 rounded-lg mb-4 transition-transform duration-300 transform hover:scale-105 hover:shadow-md hover:bg-gray-100 bg-white"
      >
        <div class="flex justify-center items-center">
          <img :src="teacher?.images" alt="" class="w-24 h-24 object-cover rounded-full" />

        </div>
        <div class="">
          <span class="font-fig text-lg font-bold text-black"> {{ teacher?.name }} {{ teacher?.surname }}</span> <br>
          <span class="font-fig font-semibold text-sm text-gray-500"> {{ teacher?.department }} </span> <br>
          <span class="font-fig font-semibold text-sm text-gray-500"> {{ teacher?.academicposition }} </span>
          <!-- <span class="font-fig font-semibold text-sm text-gray-500">Advisee: {{ teacher?.ownStudent?.name }} </span> -->
          <div v-for="student in teacher?.ownStudent" :key="student.id">
            <span class="font-fig font-semibold text-sm text-gray-500">Advisee: {{ student?.name }}</span>
          </div>
          <span class="font-fig font-semibold text-sm text-gray-500">Total Advisee: {{ teacher?.ownStudent?.length }}</span>

        </div>
      </div>
    </div>
  </RouterLink>
</template>
