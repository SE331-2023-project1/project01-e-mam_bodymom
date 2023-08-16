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
    <div class="teacher-class">
        <div class="p-5 w-72 cursor-pointer border border-gray-700 mb-4 transition-transform duration-300 transform hover:scale-105 hover:shadow-md">

            <img src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg"
                alt="" class="w-24 h-24 object-cover rounded-full ">

            <div class="ml-4">
                <span class="" text-lg> {{ teacher?.name }} {{ teacher?.surname }}</span>
            
            </div>

        </div> 
    </div>
</template>