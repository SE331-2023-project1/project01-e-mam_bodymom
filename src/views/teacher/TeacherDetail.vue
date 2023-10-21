<script setup lang="ts">
import { type StudentItem, type TeacherItem } from '@/type'
import { computed, type PropType } from 'vue'
import { useStudentStore } from '@/stores/student'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.ts'

const authStore = useAuthStore()

defineProps({
  teacher: {
    type: Object as PropType<TeacherItem>
  },
  students: {
    type: Object as PropType<StudentItem[]>
  }
})
</script>

<template>
  <div v-if="teacher">
    <div class="student-class flex flex-col items-center justify-center">
      <div
        class="grid gap-5 grid-cols-2 p-3 w-3/4 h-4/5 border border-gray-700 rounded-lg mb-4 bg-white shadow-md"
      >
        <div class="flex justify-center">
          <img :src="teacher?.images" alt="" class="crop rounded-lg" />
        </div>
        <div class="justify-center padding-top">
          <span class="font-fig name font-bold text-black">
            {{ teacher?.name }} {{ teacher?.surname }}</span
          > <br>
          <span class="font-fig text-base text-gray-500">Department: {{ teacher?.department }}</span> <br />
          <span class="font-fig text-base text-gray-500">Academic Position: {{ teacher?.academicposition }}</span>

        </div>
        <!-- <b class="text-black">Student id list</b> -->
        <!-- <li v-for="studentId in teacher.studentsId" :key="studentId" class="text-xl font-fig">
          {{ studentId }}
        </li> -->
      </div>
    </div>
    <div class="student-class flex flex-col mb-2 items-center justify-center" v-if="authStore.userRole == 'ROLE_TEACHER' || authStore.userRole == 'ROLE_ADMIN'">
      <div
        class="grid gap-1 p-3 w-3/4 h-4/5 border border-gray-700 rounded-lg bg-white shadow-md mb-3"
      >
        <div class="flex items-center">
          <img src="../../assets/list.png" class="list mr-1" />
          <span class="detail text-list text-black font-fig font-bold">Student List</span>
        </div>

        <div class="justify-center items-center">
          <div v-for="(student, i) in students.data" :key="i">
            <RouterLink :to="{ name: 'student-detail', params: { id: student.id } }">
              <button class="w-full bg-amber-200 shadow-lg hover:bg-amber-300 text-white font-bold py-2 px-5 rounded-xl font-fig my-2 hover:transform hover:scale-[1.01] transition-transform duration-300">
                <div class="flex items-center mx-auto">
                  <!-- Picture on the left -->
                  <img :src="student?.images" class="w-10 h-10 object-cover rounded-full mr-2">

                  <!-- Text on the right in a flex column -->
                  <div class="flex flex-col ml-1">
                    
                    <!-- Create separation and place Student ID on a new line -->
                    <p class="font-fig detail text-left text-black">{{ student?.name }} {{ student?.surname }}</p>
                    <p class="font-fig text-left text-black text-xs"> Student ID: {{ student?.id }}</p>
                    <!-- <p class="font-fig text-left text-black">{{ student?.name }}</p> -->
                  </div>
                </div>
              </button>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.padding-top{
  padding-top: 20%;
}
</style>
