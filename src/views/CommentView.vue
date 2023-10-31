<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue'
import type { StudentItem, TeacherItem, CommentInfo } from '@/type'
import type { PropType } from 'vue'
import { storeToRefs } from 'pinia';
import { commentStudent } from '@/stores/comment'
import { commentStudentId } from '@/stores/comment_id'
import { useMessageStore } from '@/stores/message';
import { useAuthStore } from '@/stores/auth'
import { useStudentStore } from '@/stores/student'
import { useTeacherStore } from '@/stores/teacher'

const student = ref<StudentItem | null>(null)
const teacher = ref<TeacherItem | null>(null)
const authStore = useAuthStore()

onMounted(async () => {
  try {
    const response = await useStudentStore().getStudentById(authStore.id);
    student.value = response;
    const responseTeacher = await useTeacherStore().getTeacher()
    teacher.value = responseTeacher
    console.log(student.value)
  } catch (error) {
    console.error('Error fetching student data:', error);
  }
});

const store = useMessageStore()
const { message } = storeToRefs(store)

const comment_input = ref<string>('');
const keep_comm: Ref<CommentInfo[]> = ref([]); // ระบุประเภทของ keep_comm เป็น Ref<CommentInfo[]>
const keepCommt_id: Ref<CommentInfo[]> = ref([]); // ระบุประเภทของ keepCommt_id เป็น Ref<CommentInfo[]>
const commentStudents = commentStudent();
const commentStudent_Id = commentStudentId();
const { comment } = storeToRefs(commentStudents);
const { comment_id } = storeToRefs(commentStudent_Id);
onMounted(() => {
  if (student.value) {
    keep_comm.value = comment.value.filter(
      (commentItem) => student?.value?.id === commentItem.id
    );
    // ดึงความคิดเห็นจาก store และแสดงใน keepCommt_id
    commentStudent_Id.setComment(keep_comm.value);
    keepCommt_id.value = comment_id.value;
  }
});
const addComment = () => {
  if (student.value && student.value.id) {
    const formatComment = {
      id: student.value.id,
      comment: comment_input.value
    };
    commentStudents.pushComment(formatComment);
    // Update the filtered comments
    keep_comm.value = comment.value.filter(
      (commentItem) => student?.value?.id === commentItem.id
    );
    commentStudent_Id.setComment(keep_comm.value);
    // Update keepCommt_id with the latest filtered comments
    keepCommt_id.value = comment_id.value;
    // Clear the input field
    comment_input.value = '';
  }
  store.updateMessage('You are successfully for adding comment to ' + student?.value?.name + ' ' + student?.value?.surname)
  setTimeout(() => {
    store.resetMessage()
  }, 4000)
};

</script>

<template>
  <!-- comment section -->
  <div class=" flex flex-col mb-2 items-center justify-center">
    <div
      class="mt-5 mb-10 font-fig flex flex-col p-3 w-3/4 sm:w-2/4 h-auto text-xl font-bold text-gray-900 bg-white border border-gray-300 rounded-lg shadow-md">

      <div class="items-center mx-2">
        <div class="flex mb-5 mt-2">
          <img :src="teacher?.images"
            class="ml-1 mr-3 items-center object-cover w-[50px] h-[50px]  rounded-full ring-2 ring-pink-500">
            <span class="flex flex-col justify-center item-center font-fig text-[18px] font-semibold text-gray-600 ">
              Your advisor: {{ teacher?.name }} {{ teacher?.surname }}</span>
        </div>
        <span class="flex flex-col justify-center item-center font-fig text-xs font-semibold text-gray-600 ">
          Comment by {{ teacher?.name }} {{ teacher?.surname }}
        </span>

        <div class="bg-emerald-100 p-2 mb-2 rounded-lg mt-1 ">
          <span class="text-black font-fig flex items-center">
            <img src="../assets/comment.png" class="h-5 mx-2" alt="Comment Icon">
            <span class="text-[18px] font-fig">Your project is good now!</span>
          </span>
        </div>



        <div v-for="(commentItem, index) in keepCommt_id" :key="index">


          <span class="font-fig text-xs font-semibold text-gray-600 ">{{ student.name }} {{ student.surname }}</span>
          <div class="flex items-center bg-pink-200 p-2 mb-2 rounded-lg mt-1 ">
            <img src="../assets/comment.png" class="h-5 mx-2" alt="Comment Icon">
            <span class="text-black font-fig text-[18px]">
              {{ commentItem.comment }}
            </span>
          </div>
        </div>


        <!-- comment box -->
        <div class="my-3">
          <div id="flashMessage" class="animate-pulse text-center text-base font-fig bg-green-500 font-fig text-white"
            v-if="message">
            <h4>{{ message }}</h4>
          </div>
          <FlashMessage />
          <form @submit.prevent="addComment">
            <!-- label -->
            <div class="mx-1 mb-1">
              <label for="name" class="text-black font-bold font-fig text-[15px]">Comment:</label>
            </div>

            <!-- input -->
            <div>
              <textarea v-model="comment_input" id="name" required class="resize-y w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-green-500 focus:border-green-500 block p-2.5"
                placeholder="Write your reply comment here..."></textarea>
            </div>


            <!-- button -->
            <div class="flex justify-center mt-3">
              <button type="submit" class="submit-btn shadow-sm bg-emerald-300 hover:bg-emerald-400 hover:text-emerald-800
               text-black py-1 px-2 rounded-xl text-[15px] font-fig font-semibold">Add Comment</button>
            </div>
          </form>
        </div>
      </div>
    </div>

  </div></template>
