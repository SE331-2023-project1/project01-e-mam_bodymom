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
    <!-- <div class="teacher-class flex flex-col items-center justify-center ">
        <div
            class="grid gap-5 grid-cols-2 p-5 w-80 h-[130px] cursor-pointer
        border border-gray-700 rounded-lg mb-4 transition-transform duration-300 transform hover:scale-105 
        hover:shadow-md hover:bg-gray-100 bg-white">

            <div class="flex justify-center items-center">
                <img :src="teacher?.profileimage" alt="" class="w-24 h-24 object-cover rounded-full ">
            </div>
            <div class="">
                <span class="text-xs text-gray-500 font-fig">ID: {{ teacher?.teacherID }}</span> <br>

                <span class="font-bold font-fig"> {{ teacher?.name }} {{ teacher?.surname }}</span>
            </div> -->


  <RouterLink :to="{ name: 'teacher-detail', params: { id: teacher?.id } }">
    <div class="teacher-class flex flex-col items-center justify-center">
      <div
        class="grid gap-5 grid-cols-2 p-5 w-80 h-[130px] cursor-pointer border border-gray-700 rounded-lg mb-4 transition-transform duration-300 transform hover:scale-105 hover:shadow-md hover:bg-gray-100 bg-white"
      >
        <div class="flex justify-center items-center">
          <img :src="teacher?.profileimage" alt="" class="w-24 h-24 object-cover rounded-full" />

        </div>
        <div class="">
          <span class="text-xs text-gray-500">ID: {{ teacher?.id }}</span> <br />

          <span class="font-bold text-black"> {{ teacher?.name }} {{ teacher?.surname }}</span>
        </div>
      </div>
    </div>
  </RouterLink>
</template>
