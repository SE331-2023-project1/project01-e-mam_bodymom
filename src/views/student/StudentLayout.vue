<script setup lang="ts">
import {ref} from 'vue'
import { useStudentStore } from '@/stores/student'
import { useTeacherStore } from '@/stores/teacher';
import { storeToRefs } from 'pinia'
import type { TeacherItem, StudentItem } from '@/type';

const props = defineProps({
    id: String
})

const student = ref<StudentItem | null>(null)
const teacher = ref<TeacherItem | null>(null)

const studentStore = useStudentStore()
const teacherStore = useTeacherStore()

studentStore.getStudentById(props.id!)
.then((response) =>{
    student.value = response
    // console.log(response?.teacherID)
    teacherStore.getTeacherById(response?.teacherID!)
    .then((responseT) => {
        teacher.value = responseT
    })
})

// teacherStore.getTeacherById(student.value?.teacherID!)
// .then((response) => {
//     teacher.value = response
// })

// console.log(student.value)

// const students = storeToRefs(studentStore).students
// const teachers = storeToRefs(teacherStore).teachers
// const id = ref(students?.value?.id)


// console.log(students.value)
// console.log(students.value?.surname)
</script>

<template>
    <div v-if="student">
        <div class="text-lg text-center text-black font-sans hover:font-serif flex flex-col p-4">
            <!-- <RouterLink :to="{name: 'student-detail', params: { id }}">Details</RouterLink> -->
        </div>
        <RouterView :student="student" :teacher="teacher"></RouterView>

    </div>
</template>