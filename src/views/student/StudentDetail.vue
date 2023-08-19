<script setup lang="ts">
import { ref } from 'vue'
import type { StudentItem, TeacherItem } from '@/type'
import type { PropType } from 'vue'

defineProps({
  student: {
    type: Object as PropType<StudentItem>,
    require: true
  },
  teacher: {
    type: Object as PropType<TeacherItem>,
    require: true
  }
})

</script>

<template>
  <div v-if="student">
    <div class="student-class flex flex-col items-center justify-center">
      <div class="grid gap-5 grid-cols-2 p-3 w-3/4 h-4/5 border border-gray-700
        rounded-lg mb-4 bg-white shadow-md">
        <div class="flex justify-center items-center">
          <img :src="student?.profileimage" alt="" class="crop rounded-lg" />
        </div>
        <div class="my-auto">
          <span class="text-base text-gray-500 font-fig">ID: {{ student?.id }}</span> <br />
          <span class="font-fig name font-bold text-black"> {{ student?.name }} {{ student?.surname }}</span>
          <ul class="list-disc list-inside">
            <span class="font-fig font-bold text-xl course">Course List</span>
            <li v-for="course in student?.courselist" :key="course" class="text-xl course font-fig">
              {{ course }}
            </li>
          </ul>

          <br>
          <RouterLink :to="{ name: 'teacher-detail', params: { id: teacher?.id } }">
            <button class="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-5 rounded-xl font-fig">
              <div class="flex items-center">
                <img :src="teacher?.profileimage" class="w-10 h-10 object-cover rounded-full mr-2">
                <div class="flex flex-col">
                  <span class="teacherid font-fig text-left">{{ teacher?.name }} {{ teacher?.surname }}</span>
                  <span class="teacherid font-fig text-left">Teacher ID: {{ student.teacherID }}</span>
                </div>
              </div>
            </button>
          </RouterLink>


        </div>
      </div>
    </div>
  </div>
</template>
