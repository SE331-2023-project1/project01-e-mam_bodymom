<script setup lang="ts">
    import { type TeacherItem } from '@/type';
    import { computed,ref, type Ref } from 'vue';
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
    TeacherService.getTeachers(4, props.page).then((response) => {
        teachers.value = response.data
        totalTeacher.value = response.headers['x-total-count']
    console.log(teachers.value)
})



    onBeforeRouteUpdate((to, from, next) => {
    const toPage = Number(to.query.page)
    TeacherService.getTeachers(4, toPage).then((response: AxiosResponse<TeacherItem[]>) => {
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

    <TeacherCard v-for="teacher in teachers" :key="teacher.teacherID" :teacher="teacher"></TeacherCard>

    <div class="pagination">
        <RouterLink :to="{ name: 'teacher-list', query: { page: page - 1, limit: limit } }" rel="prev" v-if="page != 1"
            id="page-prev"> Prev
            Page
        </RouterLink>
        <RouterLink :to="{ name: 'teacher-list', query: { page: page + 1, limit: limit } }" rel="next" v-if="hasNextPage"
            id="page-next">
            Next Page
        </RouterLink>
    </div>

</template>
