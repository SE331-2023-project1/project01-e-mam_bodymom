import StudentService from "@/services/StudentService";
import type { StudentItem } from "@/type";
import axios from "axios";
import { defineStore } from "pinia";
import { useTeacherStore } from "./teacher";


export const useStudentStore = defineStore('student', {
    state: () => ({
        students: [] as StudentItem []
    }),
    getters: {
        getStudent: (state) => state.students,
        getStudentByPage: (state) => (perPage: number, page: number) => {
            const startIndex = (page - 1) * perPage;
            const endIndex = startIndex + perPage;
            return state.students.slice(startIndex, endIndex);
        },
        getStudentById: (state) => async (id: string) => {
            const response = state.students.find(student => student.id == id)
            return new Promise<StudentItem | null>((resolve) => {
                resolve(response || null)
            })
        },
        getStudentsByTeacherId: (state) => async (teacherId: string) => {
            const teacherStore = useTeacherStore();
            const teacher = teacherStore.getTeacherById(teacherId);

            if (!teacher) {
                return Promise.resolve([]); 
            }

            const students = state.students.filter(student => {
                return Array.isArray(student.teacher) && student.teacher.includes(teacherId);
            });
            return Promise.resolve(students);
        },
    },
    actions: {
        setStudent(students: StudentItem[]) {
            this.students = students
        },
        async fetchStudents() {
            try {
                return this.students
            } catch (error) {
                console.log(error)
                return null
            }
            
        },
        async fetchStudentsFromDB() {
            const response = await StudentService.getAllStudents()
            this.setStudent(response.data)
        },
        async fetchStudentById(id: string) {
            const response = await StudentService.getStudentById(id)
            this.students.push(response.data)
        },
        async fetchStudentsByTeacher(id: string) {
            const response = await StudentService.getStudentsByTeacher(id)
            this.setStudent(response.data)
        },
        async addStudent(student: StudentItem) {
            try {
              // สร้างข้อมูล requestData
              const requestData = {
                name: student.name,
                surname: student.surname,
                id: student.id,
                profileimage: student.profileimage,
                courselist: student.courselist,
                teacherID: student.teacherID,
                comment: student.comment,
              };
          
              // ส่ง POST request ไปยัง URL ของ API สำหรับการเพิ่มนักเรียน
              const response = await axios.post(import.meta.env.VITE_BASE_URL_STUDENT, requestData);
          
              if (response.status === 201) {
                // การเพิ่มนักเรียนสำเร็จ
                this.students.push(student); // เพิ่ม student ใน array
              } else {
                // การเพิ่มนักเรียนไม่สำเร็จ
                console.error('การเพิ่มนักเรียนไม่สำเร็จ');
              }
            } catch (error) {
              console.error('เกิดข้อผิดพลาดในการส่งคำขอหรือตอบกลับจาก API:', error);
            }
        },
  
        
    }
})