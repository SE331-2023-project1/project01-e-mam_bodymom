<script setup lang="ts">
import { type TeacherItem } from '@/type'
import type { PropType } from 'vue'

defineProps({
    teacher: {
        type: Object as PropType<TeacherItem>,
        require: true
    }
})

</script>

<template>

  <div v-if="teacher">
    <div class="student-class flex flex-col items-center justify-center">
      <div
        class="grid gap-5 grid-cols-2 p-3 w-3/4 h-4/5 border border-gray-700
        rounded-lg mb-4 bg-white shadow-md">
        <div class="flex justify-center items-center">
          <img :src="teacher?.profileimage" alt="" class="crop rounded-lg" />
        </div>
        <div class="my-auto">
          <span class="font-fig text-base text-gray-500">ID: {{ teacher?.id }}</span> <br />
          <span class="font-fig text-5xl font-bold text-black"> {{ teacher?.name }} {{ teacher?.surname }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
