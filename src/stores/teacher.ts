import TeacherService from "@/services/TeacherService";
import type { TeacherItem } from "@/type";
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
        }
    }
})