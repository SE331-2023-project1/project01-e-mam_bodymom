<script setup lang="ts">
import { type StudentItem, type TeacherItem } from '@/type'
import { computed, type PropType } from 'vue'
import { useStudentStore } from '@/stores/student'
import { useMessageStore } from '@/stores/message';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.ts'

const authStore = useAuthStore()
const student = useStudentStore().fetchStudents()
var allStudents
student.then((response) => {
  console.log(response)
  allStudents = response
})

const store = useMessageStore()
const { message } = storeToRefs(store)

defineProps({
  teacher: {
    type: Object as PropType<TeacherItem>
  },
  students: {
    type: Object as PropType<StudentItem[]>
  }
})

const relationSet = () => {
  store.updateMessage('Relation Setting has been saved successfully.')
  setTimeout(() => {
    store.resetMessage()
  }, 4000)
};
</script>

<template>
  <div v-if="teacher">
    <div class="student-class flex flex-col items-center justify-center">
      <div class="grid gap-5 grid-cols-2 p-3 w-3/4 h-4/5 border border-gray-700 rounded-lg mb-4 bg-white shadow-md">
        <div class="flex justify-center">
          <img :src="teacher?.images" alt="" class="crop rounded-lg" />
        </div>
        <div class="my-auto">
          <span class="font-fig name font-bold text-black">
            {{ teacher?.name }} {{ teacher?.surname }}</span> <br>
          <span class="font-fig text-base text-gray-500">Department: {{ teacher?.department }}</span> <br />
          <span class="font-fig text-base text-gray-500">Academic Position: {{ teacher?.academic }}</span>

          <div class="mt-3">
            <RouterLink v-if="authStore.userRole?.includes('ROLE_ADMIN')"
              :to="{ name: 'teacherprofile-admin', params: { id: teacher?.id } }">
              <button
                class=" bg-gray-300 hover:bg-gray-400 text-black shadow-md
            font-bold py-2 px-5 rounded-xl font-fig hover:transform hover:scale-[1.05] transition-transform duration-300">
                <div class="flex justify-center items-center">
                  <!-- <img :src="student?.images" class="w-10 h-10 object-cover rounded-full mr-2"> -->
                  <div class="flex flex-col">
                    <span class="teacherid font-fig text-left">Edit Profile</span>
                    <!-- <span class="teacherid font-fig text-left">Teacher ID: {{ student.teacher.id }}</span> -->
                  </div>
                </div>
              </button>
            </RouterLink>
          </div>

        </div>


        <!-- <b class="text-black">Student id list</b> -->
        <!-- <li v-for="studentId in teacher.studentsId" :key="studentId" class="text-xl font-fig">
          {{ studentId }}
        </li> -->
      </div>
    </div>
    <div class="student-class flex flex-col mb-2 items-center justify-center"
      v-if="authStore.userRole == 'ROLE_TEACHER' || authStore.userRole == 'ROLE_ADMIN'">
      <div class="grid gap-1 p-3 w-3/4 h-4/5 border border-gray-700 rounded-lg bg-white shadow-md mb-3">
        <div class="flex items-center justify-between"> <!-- Add this container -->
          <div class="flex items-center mx-2"> <!-- Add this container to keep the image and span on the same line -->
            <img src="../../assets/list.png" class="list mr-1" />
            <span class="detail text-list text-black font-fig font-bold">Student List</span>
          </div>
          <div v-if="authStore.userRole == 'ROLE_ADMIN'"
            class="flex text-gray-900 mr-2 item-center text-md font-semibold">
            <h1>Total advisee: {{ students?.data?.length }}</h1>
          </div>
        </div>
        <div class="justify-center items-center">
          <div v-for="(student, i) in students.data" :key="i">
            <RouterLink :to="{ name: 'student-detail', params: { id: student.id } }">
              <button
                class="w-full bg-amber-200 shadow-lg hover:bg-amber-300 text-white font-bold py-2 px-5 rounded-xl font-fig my-2 hover:transform hover:scale-[1.01] transition-transform duration-300">
                <div class="flex items-center mx-auto">
                  <!-- Picture on the left -->
                  <img :src="student?.images" class="w-10 h-10 object-cover rounded-full mr-2">
                  <!-- Text on the right in a flex column -->
                  <div class="flex flex-col ml-1">
                    <!-- Create separation and place Student ID on a new line -->
                    <p class="font-fig detail text-left text-black">{{ student?.name }} {{ student?.surname }}</p>
                    <p class="font-fig text-left text-black text-xs"> Student ID: {{ student?.username }}</p>
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

  <div class="flex flex-col mb-2 items-center justify-center" v-if="authStore.userRole == 'ROLE_ADMIN'">
    <div class="grid gap-1 p-3 w-3/4 h-4/5 border border-gray-700
      rounded-lg bg-white shadow-md mb-8">

      <div class="flex items-center mx-2">
        <img src="../../assets/setting.png" class="list mr-1" />
        <span class="detail text-list text-black font-fig font-bold">Relation Setting</span>
      </div>

      <!-- Dropdown for selecting a student -->
      <label for="studentDropdown" class="block text-sm font-semibold text-indigo-900 mt-2">Select a advisee:</label>
      <select id="studentDropdown"
        class="block w-full mt-1 p-2 border border-indigo-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
        <option value="">Select a advisee</option>
        <option v-for="stu in allStudents" :value="stu.id" :key="stu.id">{{ stu?.name }} {{ stu?.surname }}</option>
      </select>

      <div id="flashMessage" class="animate-pulse text-center text-base font-fig mt-2 bg-green-500 font-fig text-white"
        v-if="message">
        <h4>{{ message }}</h4>
      </div>
      <FlashMessage />

      <!-- relation setting button -->
      <div class="flex justify-center mt-3">
        <button type="submit" @click="relationSet" class="submit-btn shadow-sm bg-emerald-300 hover:bg-emerald-400 hover:text-emerald-800
               text-black py-1 px-2 rounded-xl font-fig font-semibold">Done</button>
      </div>

    </div>
  </div>
</template>

<style scoped>
.padding-top {
  padding-top: 20%;
}</style>
