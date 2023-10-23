<script setup lang="ts">
import { ref } from 'vue'
import { useTeacherStore } from '@/stores/teacher'
import { useStudentStore } from '@/stores/student'
import { type TeacherItem } from '@/type'
import { type StudentItem } from '@/type'
import { storeToRefs } from 'pinia'
import StudentService from "@/services/StudentService";

const props = defineProps({
  id: {
    type: String
  }
})

const teachers = ref<TeacherItem | null>(null)
const students = ref<StudentItem[]>([])

const teacherStore = useTeacherStore()
const storeStudent = useStudentStore()

teacherStore.getTeacherById(props.id!).then((response) => {
  teachers.value = response
})

StudentService.getStudentsByTeacher(props.id!).then((response) => {
  students.value = response
  // console.log(response)
})
// console.log(students.value)
</script>

<template>
  <div v-if="students">
    <div class="text-lg text-center text-black font-sans hover:font-serif flex flex-col p-4">
      <!-- <RouterLink :to="{name: 'teacher-detail', params: { id }}">Details</RouterLink> -->
    </div>
    <RouterView :teacher="teachers" :students="students"></RouterView>
  </div>
</template>
