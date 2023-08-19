import type { TeacherItem } from "@/type";
import { defineStore } from "pinia";

export const useTeacherStore = defineStore('teacher', {
    state: () => ({
        teachers: null as TeacherItem | null
    }),
    getters: {
        getTeacher: (state) => state.teachers,
        getTeacherById: (state) => (id: string) => {
            return state.teachers.find((teacher: { id: string; }) => teacher.id === id) || null
        }
    },
    actions: {
        setTeacher(teachers: TeacherItem) {
            this.teachers = teachers
        }
    }
})