<script setup lang="ts">
import { type StudentItem } from '@/type';
import { computed, ref, watchEffect, type Ref , onMounted } from 'vue';
import StudentService from '@/services/StudentService';
import StudentCard from '@/components/StudentCard.vue';
import NProgress from 'nprogress'
import { onBeforeRouteUpdate, useRouter,useRoute  } from 'vue-router'
import type { AxiosResponse } from 'axios';
import { useStudentStore } from '@/stores/student';


const router = useRouter()
const store = useStudentStore();
const route = useRoute();

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

const fetchStudents = async () => {
    // const response = await StudentService.getStudents(6, props.page);
    students.value = store.getStudentByPage(6, props.page)
    totalStudent.value = store.getStudent.length
    // console.log(students.value);
};

// console.log(students)

onBeforeRouteUpdate((to, from, next) => {
    const toPage = to.query.page ? Number(to.query.page) : 1
    students.value = store.getStudentByPage(6, toPage)
    totalStudent.value = store.getStudent.length
    next()
    // StudentService.getStudents(6, toPage)
    //     .then((response: AxiosResponse<StudentItem[]>) => {
    //         students.value = response.data;
    //         totalStudent.value = response.headers['x-total-count'];
    //         next();
    //     })
    //     .catch(() => {
    //         next({ name: 'NetworkError' });
    //     });
});

const hasNextPage = computed(() => {
    const totalPages = Math.ceil(totalStudent.value / 6);
    return props.page < totalPages;
});

onMounted(() => {
    fetchStudents();
});

</script>

<template> 
    <div class="my-5">
        <main class="flex flex-col items-center justify-center">

            <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 -z-10">
                <StudentCard v-for="student in students" :key="student.id" :student="student"></StudentCard>
            </div>

            <div class="flex flex-col items-center">
                <div class="pagination flex">
                    <RouterLink :to="{ name: 'student-list', query: { page: page - 1, limit: limit } }" rel="prev"
                        v-if="page != 1"
                        class="font-fig-base font-base flex items-center justify-center px-3 h-8 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 "
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
                        class="font-fig-base flex items-center justify-center px-3 h-8 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 "
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
