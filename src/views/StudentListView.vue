<script setup lang="ts">
import { type StudentItem } from '@/type';
import { computed, ref, watchEffect, type Ref } from 'vue';
import StudentService from '@/services/StudentService';
import StudentCard from '@/components/StudentCard.vue';
import NProgress from 'nprogress'
import { onBeforeRouteUpdate, useRouter } from 'vue-router'
import type { AxiosResponse } from 'axios';

const router = useRouter()

const students: Ref<Array<StudentItem>> = ref([])


const totalStudent = ref<number>(0)

const props = defineProps({
    page: {
        type: Number,
        required: true
    }
    ,
    limit: {
        type: Number,
        required: true
    }
})
StudentService.getStudents(6, props.page).then((response) => {
    students.value = response.data
    totalStudent.value = response.headers['x-total-count']
    console.log(students.value)
})

console.log(students)

onBeforeRouteUpdate((to, from, next) => {
    const toPage = Number(to.query.page)
    StudentService.getStudents(6, toPage).then((response: AxiosResponse<StudentItem[]>) => {
        students.value = response.data
        totalStudent.value = response.headers['x-total-count']
        next()
    }).catch(() => {
        next({ name: 'NetworkError' })
    })
})
const hasNextPage = computed(() => {
    const totalPages = Math.ceil(totalStudent.value / 6)
    return props.page.valueOf() < totalPages
})

</script>

<template> 
    <div class="my-5">
        <main class="flex flex-col items-center justify-center">

            <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                <StudentCard v-for="student in students" :key="student.studentid" :student="student"></StudentCard>
            </div>

            <div class="flex flex-col items-center">
                <div class="pagination flex">
                    <RouterLink :to="{ name: 'student-list', query: { page: page - 1, limit: limit } }" rel="prev"
                        v-if="page != 1"
                        class="flex items-center justify-center px-3 h-8 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 "
                        id="page-prev">
                        <svg class="w-3.5 h-3.5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 5H1m0 0 4 4M1 5l4-4" />
                        </svg>
                        Prev Page
                    </RouterLink>
                    <RouterLink :to="{ name: 'student-list', query: { page: page + 1, limit: limit } }" rel="next"
                        v-if="hasNextPage"
                        class="flex items-center justify-center px-3 h-8 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 "
                        id="page-next">
                        Next Page
                        <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </RouterLink>
                </div>
            </div>
        </main>
    </div>
</template>
