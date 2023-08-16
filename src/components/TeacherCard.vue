<script setup lang="ts">
import type { TeacherItem } from '@/type';
import type { PropType } from 'vue';

const props = defineProps({
    teacher: {
        type: Object as PropType<TeacherItem>
        , require: true
    }
})
</script>


<template>
    <div class="teacher-class flex flex-col items-center justify-center ">
        <div class="grid gap-5 grid-cols-2 p-5 w-80 h-[130px] cursor-pointer
        border border-gray-700 rounded-lg mb-4 transition-transform duration-300 transform hover:scale-105 hover:shadow-md hover:bg-blue-100">

            <img :src="teacher?.profileimage"
                alt="" class="w-24 h-24 object-cover rounded-full ">

            <div class="ml-4">
                <span class="font-bold"> {{ teacher?.name }} {{ teacher?.surname }}</span>
            
            </div>

        </div> 
    </div>
</template>