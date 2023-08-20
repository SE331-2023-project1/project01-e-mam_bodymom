<template>
    <div>
      <h1>Add Person</h1>
      <div>
        <label for="personType">Select Person Type:</label>
        <select v-model="selectedPersonType" id="personType">
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
      </div>
  
      <!-- แสดงแบบฟอร์มขึ้นอย่างใดอย่างหนึ่งขึ้นอยู่กับ selectedPersonType -->
      <div v-if="selectedPersonType === 'student'">
        <!-- แบบฟอร์มสำหรับเพิ่มนักเรียน -->
        <form @submit.prevent="addStudent">
          <label for="studentName">Name:</label>
          <input v-model="studentName" type="text" id="studentName" required>
  
          <label for="studentSurname">Surname:</label>
          <input v-model="studentSurname" type="text" id="studentSurname" required>
  
          <label for="studentProfileImage">Profile Image URL:</label>
          <input v-model="studentProfileImage" type="text" id="studentProfileImage" required>
  
          <!-- สร้าง input fields สำหรับรายการคอร์ส -->
          <label for="studentCourseList">Course List:</label>
          <input v-model="studentCourseList" type="text" id="studentCourseList" required>
  
          <!-- เลือกครูจาก dropdown list (ให้นำมาจาก store ของครู) -->
          <label for="studentTeacher">Teacher:</label>
          <select v-model="studentTeacher" id="studentTeacher">
            <option value="">Select a Teacher</option>
            <!-- วนลูปเพื่อแสดงรายชื่อครูที่มีใน store ของครู -->
            <option v-for="teacher in teachers" :key="teacher.id" :value="teacher.id">{{ teacher.name }} {{ teacher.surname }}</option>
          </select>
  
          <!-- เพิ่ม input fields สำหรับคอมเมนต์ -->
          <label for="studentComment">Comments:</label>
          <textarea v-model="studentComment" id="studentComment"></textarea>
  
          <button type="submit">Add Student</button>
        </form>
      </div>
  
      <div v-else-if="selectedPersonType === 'teacher'">
        <!-- แบบฟอร์มสำหรับเพิ่มครู -->
        <form @submit.prevent="addTeacher">
          <label for="teacherName">Name:</label>
          <input v-model="teacherName" type="text" id="teacherName" required>
  
          <label for="teacherSurname">Surname:</label>
          <input v-model="teacherSurname" type="text" id="teacherSurname" required>
  
          <label for="teacherProfileImage">Profile Image URL:</label>
          <input v-model="teacherProfileImage" type="text" id="teacherProfileImage" required>
  
          <!-- เลือกนักเรียนจาก dropdown list (ให้นำมาจาก store ของนักเรียน) -->
          <label for="teacherStudents">Students:</label>
          <select v-model="teacherStudents" id="teacherStudents">
            <option value="">Select Students</option>
            <!-- วนลูปเพื่อแสดงรายชื่อนักเรียนที่มีใน store ของนักเรียน -->
            <option v-for="student in students" :key="student.id" :value="student.id">{{ student.name }} {{ student.surname }}</option>
          </select>
  
          <button type="submit">Add Teacher</button>
          
        </form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
import { ref } from 'vue';
import { useStudentStore } from '@/stores/student';
import { useTeacherStore } from '@/stores/teacher';
import { useRouter } from 'vue-router';

const selectedPersonType = ref('student');
const studentName = ref('');
const studentSurname = ref('');
const studentProfileImage = ref('');
const studentCourseList = ref('');
const studentTeacher = ref('');
const studentComment = ref('');

const teacherName = ref('');
const teacherSurname = ref('');
const teacherProfileImage = ref('');
const teacherStudents = ref('');

const router = useRouter();

const addStudent = () => {
  const store = useStudentStore();

  const newStudent = {
    name: studentName.value,
    surname: studentSurname.value,
    id: 'NEW_ID', // สร้าง ID ใหม่ตามต้องการ
    profileimage: studentProfileImage.value,
    courselist: studentCourseList.value.split(',').map(course => course.trim()),
    teacherID: studentTeacher.value,
    comment: studentComment.value.split(',').map(comment => comment.trim()),
  };

  store.addStudent(newStudent); // หรือ store.addTeacher(newTeacher);

  console.log(newStudent)


  // ล้างค่าฟอร์ม
  clearStudentForm();
};

const fetchTeachers = () => {
  // นำเข้า useTeacherStore เพื่อเรียกใช้ฟังก์ชัน fetchTeachers จาก store
  const teacherStore = useTeacherStore();
  teacherStore.fetchTeachers();
};

const addTeacher = () => {
  const storeTeacher = useTeacherStore();

  const newTeacher = {
    name: teacherName.value,
    surname: teacherSurname.value,
    id: 'T111', // สร้าง ID ใหม่ตามต้องการ
    profileimage: teacherProfileImage.value,
    studentsId: teacherStudents.value,
  };

  storeTeacher.addTeacher(newTeacher); // เพิ่มครูใหม่ลงในสถานะของครู
  console.log(newTeacher)

  // เรียกใช้ fetchTeachers() เพื่ออัปเดตรายการครูในหน้า TeacherListView.vue
  fetchTeachers();

  // ล้างค่าฟอร์ม
  clearTeacherForm();
};


const clearStudentForm = () => {
  studentName.value = '';
  studentSurname.value = '';
  studentProfileImage.value = '';
  studentCourseList.value = '';
  studentTeacher.value = '';
  studentComment.value = '';
};

const clearTeacherForm = () => {
  teacherName.value = '';
  teacherSurname.value = '';
  teacherProfileImage.value = '';
  teacherStudents.value = '';
};
</script>

  