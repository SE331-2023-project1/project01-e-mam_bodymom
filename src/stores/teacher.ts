import TeacherService from "@/services/TeacherService";
import type { TeacherItem } from "@/type";
import axios from "axios";
import { defineStore } from "pinia";

export const useTeacherStore = defineStore('teacher', {
    state: () => ({
        teachers: null as TeacherItem | null
    }),
    getters: {
        getTeachers: (state) => state.teachers,
        getTeacherById: (state) => async (id: string) => {
            const response = await TeacherService.getTeacherById(id)
            // console.log(response.data)
            return new Promise<TeacherItem | null>((resolve) => {
                resolve(response.data || null)
            })
        }
    },
    actions: {
        setTeacher(teachers: TeacherItem) {
            this.teachers = teachers
        },
        async fetchTeachers() {
            const response = await TeacherService.getAllTeachers()
            try {
                return response.data
            } catch (error) {
                console.log(error)
                return null
            }
            
        },
        async fetchTeacherById(id: string) {
            try {
                const response = await TeacherService.getTeacherById(id);
                return response.data
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
                this.setTeacher(teacher);
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