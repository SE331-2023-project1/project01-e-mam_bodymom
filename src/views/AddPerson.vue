<template>
  <div class="mt-[25%] md:mt-[20%] lg:mt-[8%] flex flex-col p-3 w-3/4 h-4/5 border border-gray-700
        rounded-lg mb-4 bg-white shadow-md my-5 mx-auto">

    <div class="font-fig mx-5 text-black">
      <h1 class="flex justify-center font-bold text-2xl mb-3 text-green-600">Add Person</h1>
      <div class="flex mb-3">
        <label class="my-auto" for="personType">Select Person Type:</label>
        <select v-model="selectedPersonType" id="personType"
          class="ml-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5">
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
      </div>

      <!-- แสดงแบบฟอร์มขึ้นอย่างใดอย่างหนึ่งขึ้นอยู่กับ selectedPersonType -->
      <div v-if="selectedPersonType === 'student'">

        <!-- แบบฟอร์มสำหรับเพิ่มนักเรียน -->
        <form @submit.prevent="addStudent">
          <div class="grid grid-cols-2 gap-4">
            <div class="flex mb-3">
              <label for="studentName" class="my-auto mr-2">Name:</label>
              <input
                class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5"
                v-model="studentName" type="text" id="studentName" required pattern="[A-Za-z]+" title="Please enter a valid name (only alphabetic characters are allowed).">
            </div>

            <div class="flex mb-3">
              <label for="studentSurname" class="my-auto mx-2">Surname:</label>
              <input
                class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5"
                v-model="studentSurname" type="text" id="studentSurname" required pattern="[A-Za-z]+" title="Please enter a valid name (only alphabetic characters are allowed).">
            </div>
          </div>


          <div class="mb-3">
            <label for="studentProfileImage" class="mr-2">Profile Image URL:</label>
            <input
              class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5"
              v-model="studentProfileImage" type="text" id="studentProfileImage" required pattern="https?://.+"
              placeholder="Add link of your picture ('http://..' or 'https://..)" title="Must start with 'http://' or 'https://'">
          </div>



          <div class="flex mb-3">
            <!-- สร้าง input fields สำหรับรายการคอร์ส -->
            <label for="studentCourseList" class="my-auto mr-2">Course List:</label>
            <select
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5"
              v-model="studentCourseList" id="studentCourseList" required>
              <option value disabled>Select Course</option>
              <!-- วนลูปเพื่อแสดงรายชื่อครูที่มีใน store ของครู -->
              <option value="Math">Math</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
              <option value="History">History</option>
              <option value="Physics">Physics</option>
              <option value="ComSci">ComSci</option>
              <option value="Art">Art</option>
              <option value="Music">Music</option>
              <option value="Biology">Biology</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Spanish">Spanish</option>
              <option value="Literature">Literature</option>
              <option value="PolSci">PolSci</option>
              <option value="Philosophy">Philosophy</option>
              <option value="Sports">Sports</option>
              <option value="PE">PE</option>
              <option value="Drama">Drama</option>
              <option value="Astronomy">Astronomy</option>
              <option value="Languages">Languages</option>


            </select>
            <!-- <input
              class="w-full bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5"
              v-model="studentCourseList" type="text" id="studentCourseList" required> -->
          </div>


          <div class="flex mb-3">
            <!-- เลือกครูจาก dropdown list (ให้นำมาจาก store ของครู) -->
            <label for="studentTeacher" class="my-auto mr-2">Teacher:</label>
            <select
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5"
              v-model="studentTeacher" id="studentTeacher">
              <option value="" disabled>Select a Teacher</option>
              <option value="T123">David Smith</option>
              <option value="T234">Alice Johnson</option>
              <option value="T345">Emily Williams</option>
              <option value="T456">Rose Brown</option>
              <option value="T567">Sarah Miller</option>
              <option value="T678">John Davis</option>
              <option value="T789">Olivia Wilson</option>
              <option value="T890">William Anderson</option>
              <option value="T901">Sophia Martinez</option>
              <option value="T012">Daniel Taylor</option>



              <!-- วนลูปเพื่อแสดงรายชื่อครูที่มีใน store ของครู -->
              <!-- <option v-for="teacher in teachers" :key="teacher.id" :value="teacher.id">{{ teacher.name }} {{
                teacher.surname
              }}</option> -->
            </select>

          </div>


          

          <div id="flashMessage" class="mb-2 animate-pulse text-center text-base font-fig bg-green-500 font-fig text-white" v-if="message">
              <h4>{{ message }}</h4>
            </div>
            <FlashMessage />
          <div class="flex justify-center mb-2">
            <button class="bg-green-500 hover:bg-green-700 shadow-md px-2 py-1
            rounded-lg font-bold text-white" type="submit">Add Student</button>
          </div>
        </form>
      </div>

      <div v-else-if="selectedPersonType === 'teacher'">

        <!-- แบบฟอร์มสำหรับเพิ่มครู -->
        <form @submit.prevent="addTeacher">
          <div class="grid grid-cols-2 gap-4">
            <div class="flex mb-3">
              <label for="teacherName" class="mr-2 my-auto">Name:</label>
              <input
                class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5"
                v-model="teacherName" type="text" id="teacherName" required pattern="[A-Za-z]+" title="Please enter a valid name (only alphabetic characters are allowed).">
            </div>

            <div class="flex mb-3">
              <label for="teacherSurname" class="mr-2 my-auto">Surname:</label>
              <input
                class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5"
                v-model="teacherSurname" type="text" id="teacherSurname" required pattern="[A-Za-z]+" title="Please enter a valid name (only alphabetic characters are allowed).">
            </div>
          </div>


          <div class="mb-3">
            <label for="teacherProfileImage" class="mr-2">Profile Image URL:</label>
            <input  placeholder="Add link of your picture ('http://..' or 'https://..)"
              class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5"
              v-model="teacherProfileImage" type="text" id="teacherProfileImage" required pattern="https?://.+" title="Must start with 'http://' or 'https://'">
          </div>

          <!-- <div class="flex mb-3"> -->
            <!-- เลือกนักเรียนจาก dropdown list (ให้นำมาจาก store ของนักเรียน) -->
            <!-- <label class="mr-2 my-auto" for="teacherStudents">Students:</label> -->
            <!-- <select
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5"
              v-model="teacherStudents" id="teacherStudents">
              <option value="">Select Students</option> -->
              <!-- วนลูปเพื่อแสดงรายชื่อนักเรียนที่มีใน store ของนักเรียน -->
              <!-- <option v-for="student in students" :key="student.id" :value="student.id">{{ student.name }} {{
                student.surname
              }}</option> -->
            <!-- </select> -->
          <!-- </div> -->

          <div id="flashMessage" class="mb-2 animate-pulse text-center text-base font-fig bg-green-500 font-fig text-white" v-if="message">
              <h4>{{ message }}</h4>
            </div>
            <FlashMessage />
          <div class="flex justify-center mb-2">
            <button class="bg-green-500 hover:bg-green-700 shadow-md px-2 py-1
            rounded-lg font-bold text-white" type="submit">Add Teacher</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { useStudentStore } from '@/stores/student';
import { useTeacherStore } from '@/stores/teacher';
import { useRouter } from 'vue-router';
import { useMessageStore } from '@/stores/message';
import { storeToRefs } from 'pinia';

const selectedPersonType = ref('student');
const studentName = ref('');
const studentSurname = ref('');
const studentProfileImage = ref('');
const studentCourseList = ref('');
const studentTeacher = ref('');
// const studentComment = ref('');

const teacherName = ref('');
const teacherSurname = ref('');
const teacherProfileImage = ref('');
const teacherStudents = ref('');

const router = useRouter();

const storeMessage = useMessageStore()
const { message } = storeToRefs(storeMessage)

const addStudent = () => {
  const store = useStudentStore();

  const generateRandomID = () => {
  const min = 100000; // Minimum 6-digit number
  const max = 999999; // Maximum 6-digit number
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

  const newStudent = {
    name: studentName.value,
    surname: studentSurname.value,
    id: generateRandomID().toString(), // สร้าง ID ใหม่ตามต้องการ
    profileimage: studentProfileImage.value,
    courselist: studentCourseList.value.split(',').map(course => course.trim()),
    teacherID: studentTeacher.value,
    // comment: studentComment.value.split(',').map(comment => comment.trim()),
  };

  store.addStudent(newStudent); // หรือ store.addTeacher(newTeacher);

  console.log(newStudent)

  storeMessage.updateMessage('You are successfully for adding student.')
  setTimeout(() => {
    storeMessage.resetMessage()
  }, 4000)

  // ล้างค่าฟอร์ม
  clearStudentForm();
};

const fetchTeachers = () => {
  // นำเข้า useTeacherStore เพื่อเรียกใช้ฟังก์ชัน fetchTeachers จาก store
  const teacherStore = useTeacherStore();
  teacherStore.fetchTeachers();
  // teacherStore.getTeachers
  console.log(teacherStore.getTeachers)

};

const addTeacher = () => {
  const storeTeacher = useTeacherStore();

  const generateRandomTID = () => {
  const min = 100; // Minimum 3-digit number
  const max = 999; // Maximum 3-digit number
  const randomThreeDigitNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return `T${randomThreeDigitNumber}`;};

  const newTeacher = {
    name: teacherName.value,
    surname: teacherSurname.value,
    id: generateRandomTID().toString(), // สร้าง ID ใหม่ตามต้องการ
    profileimage: teacherProfileImage.value,
    studentsId: teacherStudents.value,
  };

  

  storeTeacher.addTeacher(newTeacher); // เพิ่มครูใหม่ลงในสถานะของครู
  console.log(newTeacher)

  // เรียกใช้ fetchTeachers() เพื่ออัปเดตรายการครูในหน้า TeacherListView.vue
  fetchTeachers();

  storeMessage.updateMessage('You are successfully for adding teacher.')
  setTimeout(() => {
    storeMessage.resetMessage()
  }, 4000)
  // ล้างค่าฟอร์ม
  clearTeacherForm();
};


const clearStudentForm = () => {
  studentName.value = '';
  studentSurname.value = '';
  studentProfileImage.value = '';
  studentCourseList.value = '';
  studentTeacher.value = '';
  // studentComment.value = '';
};

const clearTeacherForm = () => {
  teacherName.value = '';
  teacherSurname.value = '';
  teacherProfileImage.value = '';
  teacherStudents.value = '';
};
</script>

  