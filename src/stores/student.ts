import StudentService from "@/services/StudentService";
import type { StudentItem } from "@/type";
import axios from "axios";
import { defineStore } from "pinia";


export const useStudentStore = defineStore('student', {
    state: () => ({
        students: [] as StudentItem []
    }),
    getters: {
        getStudent: (state) => state.students,
        getStudentById: (state) => async (id: string) => {
            const response = await StudentService.getStudentById(id)
            return new Promise<StudentItem | null>((resolve) => {
                resolve(response.data || null)
            })
        }
    },
    actions: {
        setStudent(students: StudentItem[]) {
            this.students = students
        },
        async fetchStudents() {
            const response = await StudentService.getAllStudents()
            try {
                return response.data
            } catch (error) {
                console.log(error)
                return null
            }
            
        },
        async fetchStudentById(id: number) {
            try {
                const response = await StudentService.getStudentById(id);
                return response.data
            } catch (error) {
                console.log(error)
                return null
            }
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