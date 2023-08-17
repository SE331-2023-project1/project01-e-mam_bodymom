<script setup lang="ts">
import {ref} from 'vue'
import { type StudentItem } from '@/type';
import type { PropType } from 'vue'
import StudentService from '@/services/StudentService';
import { useRouter } from 'vue-router';
// defineProps({
//     student: {
//         type: Object as PropType<StudentItem>,
//         require: true
//     }
// })

const student = ref<StudentItem | null>(null)
const props = defineProps({
    id: String
})

const router = useRouter()

StudentService.getStudentById(Number(props.id))
.then((response) => {
    student.value = response.data
    console.log(student.value)
}).catch(error =>{
    console.log(error)
})
</script>

<template>
    <div v-if="student">
        <RouterLink :to="{name: 'student-detail', params: { id }}">Details</RouterLink>
        <RouterView :student="student" ></RouterView>
    </div>
</template>