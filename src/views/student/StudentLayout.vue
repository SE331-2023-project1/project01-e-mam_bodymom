<script setup lang="ts">
import {ref} from 'vue'
import { type StudentItem } from '@/type';
import type { PropType } from 'vue'
import StudentService from '@/services/StudentService';
import { useRouter } from 'vue-router';
import { useStudentStore } from '@/stores/student'
import { storeToRefs } from 'pinia'

const store = useStudentStore()

const students = storeToRefs(store).students

const id = ref(students?.value?.id)


// console.log(students.value)
// console.log(students.value?.surname)
</script>

<template>
    <div v-if="students">
        <div class="text-lg text-center text-black font-sans hover:font-serif flex flex-col p-4">
            <!-- <RouterLink :to="{name: 'student-detail', params: { id }}">Details</RouterLink> -->
        </div>
        <RouterView :student="students"></RouterView>

    </div>
</template>