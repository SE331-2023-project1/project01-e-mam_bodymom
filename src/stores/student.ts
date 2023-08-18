import type { StudentItem } from "@/type";
import { defineStore } from "pinia";


export const useStudentStore = defineStore('student', {
    state: () => ({
        students: null as StudentItem | null
    }),
    actions: {
        setStudent(students: StudentItem) {
            this.students = students
        }
    }
})