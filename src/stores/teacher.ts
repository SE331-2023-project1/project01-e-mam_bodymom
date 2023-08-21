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
            const response = state.teachers.find(teacher => teacher.id === id)
            console.log(response)
            return new Promise<TeacherItem | null>((resolve) => {
                resolve(response || null)
            })
        }
        // getTeacherById: (state) => (id: string) => {
        //     return new Promise<TeacherItem | undefined>((resolve, reject) => {
        //         const teacher = state.teachers.find(teacher => teacher.teacherId === id);
        //         if (teacher) {
        //             resolve(teacher);
        //         } else {
        //             const error = new Error('Teacher not found');
        //             // Custom status for the error
        //             (error as any).status = 404;
        //             reject(error);
        //         }
        //     });
        // },
    },
    actions: {
        setTeacher(teachers: TeacherItem[]) {
            this.teachers = teachers
        },
        fetchTeachers() {
            // const response = this.getTeachers
            try {
                return this.teachers
            } catch (error) {
                console.log(error)
                return null
            }

            // this.setTeacher(response)
            
        },
        async fetchTeachersFromDB() {
            const response = await TeacherService.getAllTeachers()
            // try {
            //     return response.data
            // } catch (error) {
            //     console.log(error)
            //     return null
            // }

            this.setTeacher(response.data)
            
        },
        async fetchTeacherById(id: string) {
            try {
                const response = this.getTeacherById(id)
                return response
            } catch (error) {
                console.log(error)
                return null
            }
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