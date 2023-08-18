import type { TeacherItem } from "@/type";
import { defineStore } from "pinia";


export const useTeacherStore = defineStore('teacher', {
    state: () => ({
        teacher: null as TeacherItem | null
    }),
    actions: {
        setTeacher(teacher: TeacherItem) {
            this.teacher = teacher
        }
    }
})