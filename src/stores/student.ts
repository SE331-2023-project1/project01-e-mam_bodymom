import StudentService from "@/services/StudentService";
import type { StudentItem } from "@/type";
import { defineStore } from "pinia";


export const useStudentStore = defineStore('student', {
    state: () => ({
        students: null as StudentItem | null
    }),
    getters: {
        getStudent: (state) => state.students,
        getStudentById: (state) => async (id: number) => {
            const response = await StudentService.getStudentById(id)
            return new Promise<StudentItem | null>((resolve) => {
                resolve(response.data || null)
            })
        }
    },
    actions: {
        setStudent(students: StudentItem) {
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
        }
    }
})