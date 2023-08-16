<script setup lang="ts">
import { type StudentItem } from '@/type';
import { computed, ref, type Ref } from 'vue';
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



onBeforeRouteUpdate((to, from, next) => {
    const toPage = Number(to.query.page)
    StudentService.getStudents(4, toPage).then((response: AxiosResponse<StudentItem[]>) => {
        students.value = response.data
        totalStudent.value = response.headers['x-total-count']
        next()
    }).catch(() => {
        next({ name: 'NetworkError' })
    })
})
const hasNextPage = computed(() => {
    const totalPages = Math.ceil(totalStudent.value / 4)
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
                    <div class="pagination">
                        <RouterLink :to="{ name: 'student-list', query: { page: page - 1, limit: limit } }" rel="prev"
                            v-if="page != 1" id="page-prev"> Prev Page |
                        </RouterLink>
                        <RouterLink :to="{ name: 'student-list', query: { page: page + 1, limit: limit } }" rel="next"
                            v-if="hasNextPage" id="page-next">
                            Next Page
                        </RouterLink>
                    </div>
                </div>
        </main>
    </div>
</template>
