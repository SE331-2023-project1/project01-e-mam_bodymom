<script setup lang="ts">
import { ref } from 'vue'
import { type StudentItem } from '@/type'
import type { PropType } from 'vue'
import StudentService from '@/services/StudentService'

defineProps({
    student: {
        type: Object as PropType<StudentItem>,
        require: true
    }
})

</script>

<template>

  <div v-if="student">
    <div class="student-class flex flex-col items-center justify-center">
      <div
        class="grid gap-5 grid-cols-2 p-3 w-3/4 h-4/5 border border-gray-700 rounded-lg mb-4 bg-white"
      >
        <div class="flex justify-center items-center">
          <img :src="student?.profileimage" alt="" class="object-cover rounded-lg" />
        </div>
        <div class="">
          <span class="text-base text-gray-500">ID: {{ student?.studentid }}</span> <br />
          <span class="text-5xl font-bold text-black"> {{ student?.name }} {{ student?.surname }}</span>
          <ul class="list-disc list-inside">
            <li v-for="course in student?.courselist" :key="course" class="text-gray-700 text-xl">
              {{ course }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
