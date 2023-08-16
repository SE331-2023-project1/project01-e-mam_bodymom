<script setup lang="ts">
import { type TeacherItem } from '@/type';
import { computed, ref, type Ref } from 'vue';
import TeacherService from '@/services/TeacherService';
import TeacherCard from '@/components/TeacherCard.vue';
import NProgress from 'nprogress'
import { onBeforeRouteUpdate, useRouter } from 'vue-router'
import type { AxiosResponse } from 'axios';

const router = useRouter()

const teachers: Ref<Array<TeacherItem>> = ref([])


const totalTeacher = ref<number>(0)

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
TeacherService.getTeachers(3, props.page).then((response) => {
    teachers.value = response.data
    totalTeacher.value = response.headers['x-total-count']
    console.log(teachers.value)
})



onBeforeRouteUpdate((to, from, next) => {
    const toPage = Number(to.query.page)
    TeacherService.getTeachers(3, toPage).then((response: AxiosResponse<TeacherItem[]>) => {
        teachers.value = response.data
        totalTeacher.value = response.headers['x-total-count']
        next()
    }).catch(() => {
        next({ name: 'NetworkError' })
    })
})
const hasNextPage = computed(() => {
    const totalPages = Math.ceil(totalTeacher.value / 4)
    return props.page.valueOf() < totalPages
})

</script>

<template>
    <div class="my-5">
        <main class="flex flex-col items-center justify-center">

            <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">

                <TeacherCard v-for="teacher in teachers" :key="teacher.teacherID" :teacher="teacher"></TeacherCard>
            </div>

            <div class="flex flex-col items-center">

                <div class="pagination flex">
                    <RouterLink :to="{ name: 'teacher-list', query: { page: page - 1, limit: limit } }" rel="prev"
                        v-if="page != 1"
                        class="flex items-center justify-center px-3 h-8 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        id="page-prev">
                        <svg class="w-3.5 h-3.5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 5H1m0 0 4 4M1 5l4-4" />
                        </svg>
                        Prev Page
                    </RouterLink>
                    <RouterLink :to="{ name: 'teacher-list', query: { page: page + 1, limit: limit } }" rel="next"
                        v-if="hasNextPage"
                        class="flex items-center justify-center px-3 h-8 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
