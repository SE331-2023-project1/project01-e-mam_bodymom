<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue'
import type { StudentItem, TeacherItem, CommentInfo } from '@/type'
import type { PropType } from 'vue'
import { storeToRefs } from 'pinia';
import { commentStudent } from '@/stores/comment'
import { commentStudentId } from '@/stores/comment_id'
import { useMessageStore } from '@/stores/message';

const props = defineProps({
  student: {
    type: Object as PropType<StudentItem>
  },
  teacher: {
    type: Object as PropType<TeacherItem>
  },
  commentData: {
    type: Object as PropType<CommentInfo>,
    require: true
  }
})

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
  if (props.student) {
    keep_comm.value = comment.value.filter(
      (commentItem) => props.student?.id === commentItem.id
    );
    // ดึงความคิดเห็นจาก store และแสดงใน keepCommt_id
    commentStudent_Id.setComment(keep_comm.value);
    keepCommt_id.value = comment_id.value;
  }
});
const addComment = () => {
  if (props.student && props.student.id) {
    const formatComment = {
      id: props.student.id,
      comment: comment_input.value
    };
    commentStudents.pushComment(formatComment);
    // Update the filtered comments
    keep_comm.value = comment.value.filter(
      (commentItem) => props.student?.id === commentItem.id
    );
    commentStudent_Id.setComment(keep_comm.value);
    // Update keepCommt_id with the latest filtered comments
    keepCommt_id.value = comment_id.value;
    // Clear the input field
    comment_input.value = '';
  }
  store.updateMessage('You are successfully for adding comment to ' + props.student?.name + ' ' + props.student?.surname)
  setTimeout(() => {
    store.resetMessage()
  }, 4000)
};

</script>

<template>
  <div v-if="student">
    <!-- {{ console.log(student.teacher) }} -->
    <div class="student-class flex flex-col items-center justify-center">
      <div class="grid gap-5 grid-cols-2 p-3 w-3/4 h-4/5 border border-gray-700
        rounded-lg mb-4 bg-white shadow-md">
        <div class="flex justify-center">
          <img :src="student?.profileimage" alt="" class="crop rounded-lg" />
        </div>
        <div class="">
          <span class="text-base text-gray-500 font-fig">ID: {{ student?.id }}</span> <br />
          <span class="font-fig name font-bold text-black"> {{ student?.name }} {{ student?.surname }}</span>
          <ul class="list-disc list-inside">
            <span class="font-fig font-bold text-black text-xl course">Course List</span>
            <li v-for="course in student?.courselist" :key="course" class="text-xl course font-fig text-black">
              {{ course }}
            </li>
          </ul>

          <br>

          <!-- {{ console.log(teacher) }} -->
          <RouterLink :to="{ name: 'teacher-detail', params: { id: student.teacher.id } }">
            <button
              class=" bg-amber-300 hover:bg-amber-400 text-black shadow-md
            font-bold py-2 px-5 rounded-xl font-fig hover:transform hover:scale-[1.05] transition-transform duration-300">
              <div class="flex justify-center items-center">
                <img :src="teacher?.profileimage" class="w-10 h-10 object-cover rounded-full mr-2">
                <div class="flex flex-col">
                  <span class="teacherid font-fig text-left">{{ teacher?.name }} {{ teacher?.surname }}</span>
                  <span class="teacherid font-fig text-left">Teacher ID: {{ student.teacher.id }}</span>
                </div>
              </div>
            </button>
          </RouterLink>


        </div>
      </div>
    </div>
  </div>

  <!-- comment section -->
  <div class=" flex flex-col mb-2 items-center justify-center">
    <div class="grid gap-1 p-3 w-3/4 h-4/5 border border-gray-700
        rounded-lg bg-white shadow-md mb-8">

      <div class="items-center mx-2">
      
        <span class="font-fig text-xs font-semibold text-gray-600 ">
          Anonymous comment
        </span>

        <div class="bg-emerald-100 p-2 mb-2 rounded-lg mt-1 ">
          <span class="text-black font-fig flex items-center">
            <img src="../../assets/comment.png" class="h-5 mx-2" alt="Comment Icon">
            example comment
          </span>
        </div>


        
        <div v-for="(commentItem, index) in keepCommt_id" :key="index">
          

          <span class="font-fig text-xs font-semibold text-gray-600 ">Anonymous comment</span>
          <div class="flex items-center bg-emerald-100 p-2 mb-2 rounded-lg mt-1 ">
            <img src="../../assets/comment.png" class="h-5 mx-2" alt="Comment Icon">
            <span class="text-black font-fig">{{ commentItem.comment }}</span>
          </div>
        </div>
        
        
        <!-- comment box -->
        <div class="my-3">
          <div id="flashMessage" class="animate-pulse text-center text-base font-fig bg-green-500 font-fig text-white" v-if="message">
              <h4>{{ message }}</h4>
            </div>
            <FlashMessage />
          <form @submit.prevent="addComment">
            <!-- label -->
            <div class="mx-1 mb-1">
              <label for="name" class="text-black font-bold font-fig">Comment:</label>
            </div>
          
              <!-- input -->
              <div>
                <textarea v-model="comment_input" id="name" required class="resize-y w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-green-500 focus:border-green-500 block p-2.5"
                  placeholder="Write your comment here..."></textarea>
              </div>

              
              <!-- button -->
              <div class="flex justify-center mt-3">
                <button type="submit" class="submit-btn shadow-sm bg-emerald-300 hover:bg-emerald-400 hover:text-emerald-800
               text-black py-1 px-2 rounded-xl font-fig font-semibold">Add Comment</button>
              </div>
          </form>
        </div>
      </div>
    </div>

  </div>
</template>
