import TeacherService from "@/services/TeacherService";
import type { TeacherItem } from "@/type";
import axios from "axios";
import { defineStore } from "pinia";

export const useTeacherStore = defineStore('teacher', {
    state: () => ({
        teachers: [] as TeacherItem []
    }),
    getters: {
        getTeachers: (state) => state.teachers,
        getTeacherByPage: (state) => (perPage: number, page: number) => {
            const startIndex = (page - 1) * perPage;
            const endIndex = startIndex + perPage;
            return state.teachers.slice(startIndex, endIndex);
        },
        getTeacherById: (state) => async (id: string) => {
            const response = state.teachers.find(teacher => teacher.id == id)
            return new Promise<TeacherItem | null>((resolve) => {
                resolve(response || null)
            })
        },
        getTeacher: (state) => () => {
            const response = state.teachers[0]
            return new Promise<TeacherItem | null>((resolve) => {
                resolve(response || null)
            })
        }
    },
    actions: {
        setTeacher(teachers: TeacherItem[]) {
            this.teachers = teachers
        },
        fetchTeachers() {
            try {
                return this.teachers
            } catch (error) {
                console.log(error)
                return null
            }
        },
        async fetchTeachersFromDB() {
            const response = await TeacherService.getAllTeachers()
            this.setTeacher(response.data)
            
        },
        async fetchTeacherById(id: string) {
            const response = await TeacherService.getTeacherById(id)
            this.teachers.push(response.data)
        },
        async fetchTeacherByPage(perPage: number, page: number) {
            try {
                const response = this.getTeacherByPage(perPage, page)
                return response
            } catch (error) {
                console.log(error)
                return null
            }
        },
        async fetchTeacherByStudent(id: string) {
            const response = await TeacherService.getTeacherByStudent(id)
            this.teachers.push(response.data)
        },
        // ส่วนของ useTeacherStore
        async addTeacher(teacher: TeacherItem) {
            try {
              // สร้างข้อมูล requestData
              const requestData = {
                id: teacher.id,
                studentsId: teacher.studentsId,
                name: teacher.name,
                surname: teacher.surname,
                profileimage: teacher.profileimage,
              };
          
              // ส่ง POST request ไปยัง URL ของ API สำหรับการเพิ่มครู
              const response = await axios.post(import.meta.env.VITE_BASE_URL_TEACHER, requestData);


          
              if (response.status === 201) {
                // การเพิ่มครูสำเร็จ
                this.teachers.push(teacher)
                // console.log(this.getTeachers)
              } else {
                // การเพิ่มครูไม่สำเร็จ
                console.error('การเพิ่มครูไม่สำเร็จ');
              }
            } catch (error) {
              console.error('เกิดข้อผิดพลาดในการส่งคำขอหรือตอบกลับจาก API:', error);
            }
          },
  
        
    }
})