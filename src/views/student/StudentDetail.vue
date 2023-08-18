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
      <div
        class="grid gap-5 grid-cols-2 p-3 w-3/4 h-4/5 border border-gray-700
        rounded-lg mb-4 bg-white shadow-md">
        <div class="flex justify-center items-center">
          <img :src="student?.profileimage" alt="" class="crop rounded-lg" />
        </div>
        <div class="my-auto">
          <span class="text-base text-gray-500 font-fig">ID: {{ student?.id }}</span> <br />
          <span class="font-fig name font-bold text-black"> {{ student?.name }} {{ student?.surname }}</span>
          <ul class="list-disc list-inside">
            <li v-for="course in student?.courselist" :key="course" class="text-xl font-fig">
              {{ course }}
            </li>
          </ul>

          <div>
            <br><button class="bg-gray-400 hover:bg-gray-500 text-white font-bold py-1 px-2 rounded-xl font-fig">Teacher ID: {{ student.teacherID }}</button>          
          </div>

          <span class="text-base text-gray-500">TeacherID: {{ teacher?.id }}</span> <br />

        </div>
      </div>
    </div>
  </div>
</template>
