<script setup lang="ts">
import { type StudentItem, type TeacherItem } from '@/type'
import type { PropType } from 'vue'

defineProps({
    teacher: {
        type: Object as PropType<TeacherItem>,
        require: true
    },
    student: {
      type: Object as PropType<StudentItem>,
        reqiure: true
    }
})

</script>

<template>

  <div v-if="teacher">
    <div class="student-class flex flex-col items-center justify-center">
      <div
        class="grid gap-5 grid-cols-2 p-3 w-3/4 h-4/5 border border-gray-700
        rounded-lg mb-4 bg-white shadow-md">
        <div class="flex justify-center items-center">
          <img :src="teacher?.profileimage" alt="" class="crop rounded-lg" />
        </div>
        <div class="my-auto">
          <span class="font-fig text-base text-gray-500">ID: {{ teacher?.id }}</span> <br />
          <span class="font-fig text-5xl font-bold text-black"> {{ teacher?.name }} {{ teacher?.surname }}</span>
        </div>
        <!-- <b class="text-black">Student id list</b> -->
        <!-- <li v-for="studentId in teacher.studentsId" :key="studentId" class="text-xl font-fig">
          {{ studentId }}
        </li> -->
        <div v-for="studentId in teacher.studentsId" :key="studentId">
          <RouterLink :to="{ name: 'student-detail', params: { id: studentId } }">
            <button class="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-5 rounded-xl font-fig">
              <div class="flex items-center">
                <!-- <img :src="student?.profileimage" class="w-10 h-10 object-cover rounded-full mr-2"> -->
                <span>Student ID: {{ studentId }}</span>
              </div>
            </button>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
