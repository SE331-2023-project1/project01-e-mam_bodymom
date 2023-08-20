<script setup lang="ts">
import { type StudentItem, type TeacherItem } from '@/type'
import { computed, type PropType } from 'vue'
import { useStudentStore } from '@/stores/student';
import { useRouter } from 'vue-router';

defineProps({
  teacher: {
    type: Object as PropType<TeacherItem>,
    require: true
  },
  student: {
    type: Object as PropType<StudentItem>,
    reqiure: true
  }
})

// const getStudentName = (studentId: string) => {
//   const studentStore = useStudentStore()
//   const student = studentStore.getStudentById(studentId)
//   return student
// };

const getStudentName = (studentId: string) => {
  const studentStore = useStudentStore()
  const student = studentStore.students.find(student => student.id === studentId);
  return student ? `${student.name} ${student.surname}` : 'Unknown Student';
};

const getStudentPic = (studentId: string) => {
  const studentStore = useStudentStore()
  const student = studentStore.students.find(student => student.id === studentId);
  return student ? `${student.profileimage}` : 'Unknown Student';
};

const studentNameComputed = computed(() => (studentId: string) => {
  return getStudentName(studentId);
});

const studentPicComputed = computed(() => (studentId: string) => {
  return getStudentPic(studentId);
});

const router = useRouter()

function navigateToStudentDetail(studentId: string) {
  router.push({
    name: 'student-detail',
    params: { id: studentId }
  });
}

</script>

<template>
  <div v-if="teacher">
    <div class="student-class flex flex-col items-center justify-center">
      <div class="grid gap-5 grid-cols-2 p-3 w-3/4 h-4/5 border border-gray-700
        rounded-lg mb-4 bg-white shadow-md">
        <div class="flex justify-center items-center">
          <img :src="teacher?.profileimage" alt="" class="crop rounded-lg" />
        </div>
        <div class="my-auto">
          <span class="font-fig text-base text-gray-500">Teacher ID: {{ teacher?.id }}</span> <br />
          <span class="font-fig name font-bold text-black"> {{ teacher?.name }} {{ teacher?.surname }}</span>
        </div>
        <!-- <b class="text-black">Student id list</b> -->
        <!-- <li v-for="studentId in teacher.studentsId" :key="studentId" class="text-xl font-fig">
          {{ studentId }}
        </li> -->



      </div>
    </div>
    <div class="student-class flex flex-col mb-2 items-center justify-center">
      <div class="grid gap-1 p-3 w-3/4 h-4/5 border border-gray-700
        rounded-lg bg-white shadow-md mb-3">
        <div class="flex items-center">
          <img src="../../assets/list.png" class="list mr-1">
          <span class="detail text-list text-black font-fig font-bold">Student List</span>

        </div>

        <div class="justify-center items-center ">
          <div v-for="studentId in teacher.studentsId" :key="studentId">
            <!-- <RouterLink :to="{ name: 'student-detail', params: { id: studentId } }">

              
              
            </RouterLink> -->

            <button @click="() => navigateToStudentDetail(studentId)" class="w-full bg-amber-200 shadow-lg hover:bg-amber-300 text-white font-bold py-2 px-5
                rounded-xl  font-fig my-2 hover:transform hover:scale-[1.01] transition-transform duration-300">
                <div class="flex items-center mx-auto">
                  <!-- Picture on the left -->
                  <img :src="studentPicComputed(studentId)" class="w-10 h-10 object-cover rounded-full mr-2">

                  <!-- Text on the right in a flex column -->
                  <div class="flex flex-col ml-1 ">
                    
                    <!-- Create separation and place Student ID on a new line -->
                    <p class="font-fig text-left text-black text-xs">Student ID: {{ studentId }} </p>

                    <p class="font-fig text-left text-black font-semibold">{{ studentNameComputed(studentId)}}</p>
                    <!-- <p class="font-fig text-left text-black">{{ student?.name }}</p> -->

                    
                  </div>
                </div>
              </button>

          </div>
        </div>
      </div>

    </div>

  </div>
</template>
