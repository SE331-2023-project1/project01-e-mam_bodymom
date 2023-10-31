<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth.ts'
import { useStudentStore } from '@/stores/student'
import { useTeacherStore } from '@/stores/teacher'

const store = useMessageStore()
const { message } = storeToRefs(store)
const authStore = useAuthStore()
const router = useRouter()
const token = localStorage.getItem('access_token')
const userRole = localStorage.getItem('user_role')
const id = localStorage.getItem('id')
const teacherStore = useTeacherStore()
const studentStore = useStudentStore()


function logout() {
  authStore.logout()
  router.push({ name: 'login' })
}

if (token && userRole && id) {
  authStore.reload(token, JSON.parse(userRole), id)
} else {
  authStore.logout()
}
</script>

<template>
  <nav class="bg-white shadow-md border-gray-200 font-display">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="/" class="flex items-center">
        <img src="../assets/bodymomb.png" class="h-[40px]">
      </a>
      <button data-collapse-toggle="navbar-default" type="button"
        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M1 1h15M1 7h15M1 13h15" />
        </svg>
      </button>
      <div class="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul
          class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-500 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white text-black">
          <li v-if="authStore.userRole == 'ROLE_ADMIN' || authStore.userRole == 'ROLE_TEACHER'"
            class="font-dm mb-2 hover:bg-blue-100 p-3 rounded-md flex items-center">
            <img src="../assets/student.png" class="h-[20px] mr-2">
            <RouterLink to="/students">Students</RouterLink>
          </li>

          <li v-if="authStore.userRole == 'ROLE_ADMIN'"
            class="font-dm mb-2 hover:bg-blue-100 p-3 rounded-md flex items-center">
            <img src="../assets/teacher.png" class="h-[20px] mr-2">
            <RouterLink to="/teachers">Teachers</RouterLink>
          </li>
          <li v-if="authStore.userRole == 'ROLE_ADMIN'"
            class="font-dm mb-2 hover:bg-blue-100 p-3 rounded-md flex items-center">
            <img src="../assets/add.png" class="h-[12px] ml-1 mr-2">
            <RouterLink to="/add">Add Person</RouterLink>
          </li>
          <li v-if="!authStore.userRole" class="font-dm mb-2 hover:bg-blue-100 p-3 rounded-md flex items-center">
            <img src="../assets/login.png" class="h-[12px] ml-1 mr-2">
            <RouterLink to="/Login">Login</RouterLink>
          </li>
          <li v-if="authStore.userRole == 'ROLE_STUDENT'" 
          class="font-dm mb-2 hover:bg-blue-100 p-3 rounded-md flex items-center">
            <img src="../assets/announce.png" class="h-[18px] ml-1 mr-2 items-center">
            <RouterLink to="/comment">Comment</RouterLink>
          </li>
          <li v-if="authStore.userRole == 'ROLE_STUDENT' || authStore.userRole == 'ROLE_TEACHER'" 
          class="font-dm mb-2 hover:bg-blue-100 p-3 rounded-md flex items-center">
            <img src="../assets/announce.png" class="h-[18px] ml-1 mr-2 items-center">
            <RouterLink to="/announcements">Announcements</RouterLink>
          </li>
          <li v-if="authStore.userRole == 'ROLE_TEACHER'" class="font-dm mb-2 hover:bg-blue-100 p-3 rounded-md flex items-center">
            <img src="../assets/addpost.png" class="h-[18px] ml-1 mr-2 items-center">
            <RouterLink to="/createpost">Add Announcement</RouterLink>
          </li>
          <li v-if="authStore.userRole == 'ROLE_STUDENT'"
            class="font-dm mb-2 hover:bg-blue-100 p-3 rounded-md flex items-center">
            <img :src="studentStore.students[0].images[0]" class="ml-1 mr-2 items-center object-cover w-[25px] h-[25px]  rounded-full ring-2 ring-pink-500">
            <RouterLink to="/studentprofile">Profile</RouterLink>
          </li>
          <li v-if="authStore.userRole == 'ROLE_TEACHER'"
            class="font-dm mb-2 hover:bg-blue-100 p-3 rounded-md flex items-center">
            <img :src="teacherStore.teachers[0].images[0]" class="h-[21px] ml-1 mr-2 items-center">
            <RouterLink to="/teacherprofile">Profile</RouterLink>
          </li>
          <li v-if="authStore.userRole" class="font-dm mb-2 hover:bg-blue-100 p-3 rounded-md flex items-center">
            <a href="/" class="nav-link hover:cursor-pointer" @click="logout">

              LogOut
            </a>
          </li>


        </ul>
      </div>
    </div>
</nav>

<RouterView /></template>