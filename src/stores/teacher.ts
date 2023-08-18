import type { TeacherItem } from "@/type";
import { defineStore } from "pinia";


export const useTeacherStore = defineStore('teacher', {
    state: () => ({
        teachers: null as TeacherItem | null
    }),
    actions: {
        setTeacher(teachers: TeacherItem) {
            this.teachers = teachers
        }
    }
})