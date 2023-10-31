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
    teacherStore.getTeacherById(response?.teacher.id)
    .then((responseT) => {
        teacher.value = responseT
    })
})

</script>

<template>
    <div v-if="student">
        <div class="text-lg text-center text-black font-sans hover:font-serif flex flex-col p-4">
        </div>
        <RouterView :student="student" :teacher="teacher"></RouterView>

    </div>
</template>