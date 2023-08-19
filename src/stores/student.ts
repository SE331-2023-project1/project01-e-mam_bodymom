import type { StudentItem } from "@/type";
import { defineStore } from "pinia";


export const useStudentStore = defineStore('student', {
    state: () => ({
        students: null as StudentItem | null
    }),
    getters: {
        getStudent: (state) => state.students,
        getStudentById: (state) => (id: number) => {
            return state.students.find((student: {id: number} ) => student.id === id) || null
        }
    },
    actions: {
        setStudent(students: StudentItem) {
            this.students = students
        }
    }
})