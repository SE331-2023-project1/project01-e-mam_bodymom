<script setup lang="ts">
import type { StudentItem } from '@/type';
import type { PropType } from 'vue';

const props = defineProps({
    student: {
        type: Object as PropType<StudentItem>
        , require: true
    }
})
</script>


<template>
    <div class="student-class flex flex-col items-center justify-center">
        <div class="grid gap-5 grid-cols-2 p-5 w-80 h-[130px] cursor-pointer border border-gray-700 mb-4 transition-transform duration-300 transform hover:scale-105 hover:shadow-md">

            <img src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg"
                alt="" class="w-24 h-24 object-cover rounded-full ">

            <div class=" ml-4">
                <span class="" text-lg> {{ student?.name }} {{ student?.surname }}</span>
            <ul class="mt-2 list-disc list-inside">
                <li v-for="course in student?.courselist" :key="course" class="text-gray-700">{{ course }}</li>
            </ul>
            </div>

        </div> 
    </div>
</template>