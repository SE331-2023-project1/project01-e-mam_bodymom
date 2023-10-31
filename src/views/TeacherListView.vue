<script setup lang="ts">
import { type TeacherItem } from '@/type';
import { computed, ref, type Ref , onMounted} from 'vue';
import TeacherService from '@/services/TeacherService';
import TeacherCard from '@/components/TeacherCard.vue';
import NProgress from 'nprogress'
import { onBeforeRouteUpdate, useRouter,useRoute } from 'vue-router'
import type { AxiosResponse } from 'axios';
import { useTeacherStore } from '@/stores/teacher';
import BaseInput from '@/components/BaseInput.vue';
const router = useRouter();
const route = useRoute();
const store = useTeacherStore();

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

const fetchTeachers = () => {
    console.log(store.getTeachers)
    teachers.value = store.getTeacherByPage(6, props.page)
    totalTeacher.value = store.getTeachers.length
};

onBeforeRouteUpdate((to, from, next) => {
    const toPage = to.query.page ? Number(to.query.page) : 1
    teachers.value = store.getTeacherByPage(6, toPage)
    totalTeacher.value = store.getTeachers.length
    next()
});

const hasNextPage = computed(() => {
    const totalPages = Math.ceil(totalTeacher.value / 6);
    return props.page < totalPages;
});

onMounted(() => {
    fetchTeachers();
});


const keyword = ref('')
function updateKeyword (value: string) {
    console.log(keyword.value)
  let queryFunction;
  if (keyword.value === '') {
    queryFunction = TeacherService.getTeachers(5, 1)
  } else {
    queryFunction = TeacherService.getTeacherByKeyword(keyword.value, 5, 1)
  }
  queryFunction.then((response: AxiosResponse<TeacherItem[]>) => {
    teachers.value = response.data
    console.log('events', teachers.value)
    totalTeacher.value = response.headers['x-total-count']
    console.log('totalStudent', totalTeacher.value)
  }).catch(() => {
    router.push({name: 'NetworkError'})
  })
}

</script>

<template>
    <div class="my-5">
        <main class="flex flex-col items-center justify-center">


            <div class="flex justify-center w-full p-3 sm:w-2/4 ">
             <BaseInput 
              v-model="keyword"
              type="text"
              placeholder="Search..."
              class="w-full h-10  border rounded-md text-gray-900"
              @input="updateKeyword"/>
            </div>

            <div class="flex justify-center w-full p-3 sm:w-2/4 text-gray-900">
                <h1>Total teacher: {{totalTeacher}}</h1>
            </div>

            <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">

                <TeacherCard v-for="teacher in teachers" :key="teacher.id" :teacher="teacher"></TeacherCard>
            </div>

            <div class="flex flex-col items-center">

                <div class="pagination flex">
                    <RouterLink :to="{ name: 'teacher-list', query: { page: page - 1, limit: limit } }" rel="prev"
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
                    <RouterLink :to="{ name: 'teacher-list', query: { page: page + 1, limit: limit } }" rel="next"
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
