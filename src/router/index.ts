import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StudentList from '../views/StudentListView.vue'
import TeacherList from '../views/TeacherListView.vue'
import StudentLayout from '../views/student/StudentLayout.vue'
import StudentDetail from '../views/student/StudentDetail.vue'
import TeacherLayout from '../views/teacher/TeacherLayout.vue'
import TeacherDetail from '../views/teacher/TeacherDetail.vue'
import HomePage from '../views/HomeView.vue'
import NProgress from 'nprogress'
import StudentService from '@/services/StudentService'
import TeacherService from '@/services/TeacherService'
import { useStudentStore } from '@/stores/student'
import { useTeacherStore } from '@/stores/teacher'
import type { StudentItem } from '@/type'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home-page',
      component: HomePage
    },
    {
      path: '/students',
      name: 'student-list',
      component: StudentList,
      props : (route) => ({page: parseInt(route.query?.page as string || '1'),limit: parseInt(route.query?.limit as string || '2')})
    },
    {
      path: '/teachers',
      name: 'teacher-list',
      component: TeacherList,
      props : (route) => ({page: parseInt(route.query?.page as string || '1'),limit: parseInt(route.query?.limit as string || '2')})
    },
    {
      path: '/teachers/:id',
      name: 'teacher-layout',
      component: TeacherLayout,
      beforeEnter: async (to) => {
        const id: string = to.params.id as string
        const teacherStore = useTeacherStore()
        const studentStore = useStudentStore()
        try {
          const teacher = await teacherStore.getTeacherById(id)
          if (teacher) {
              // console.log("Teacher Object:", teacher)
              teacherStore.setTeacher(teacher)
          } else {
              console.log("Teacher not found.");
              return {
                  name: '404-resource',
                  params: { resource: 'teacher' }
              };
          }

          // console.log(teacher.studentsId)
          if (teacher.studentsId && teacher.studentsId.length > 0) {
            const studentPromises = teacher.studentsId.map(async studentId => {
              const student = await studentStore.getStudentById(studentId)
              return student
            });
            const students = await Promise.all(studentPromises)
            // console.log(studentPromises)
            studentStore.setStudent(students.filter(student => student !== null) as StudentItem[]);
          }
      } catch (error) {
          return {
              name: 'network-error'
          };
      }
      },
      children: [
        {
          path: '',
          name: 'teacher-detail',
          component: TeacherDetail,
        }
      ]
    },
    {
      path: '/students/:id',
      name: 'student-layout',
      component: StudentLayout,
      beforeEnter: async (to) => {
        const id: number = parseInt(to.params.id as string)
        const studentStore = useStudentStore()
        const teacherStore = useTeacherStore()
        // console.log("StudentId: " + studentStore.getStudentById(id))
        try {
          const student = await studentStore.getStudentById(id)
          if (student) {
            studentStore.setStudent(student)
            
          } else {
            console.log("Student not found.")
              return {
                  name: '404-resource',
                  params: { resource: 'student' }
              }
          }

          if (student) {
            const teacher = await teacherStore.getTeacherById(student.teacherID)
            teacherStore.setTeacher(teacher)
            console.log(teacher)
          } else {
            console.log("Teacher not found.")
              return {
                  name: '404-resource',
                  params: { resource: 'teacher' }
              }
          }

        } catch (error) {
          return { name: 'network-error'}
        }

        // return StudentService.getStudentById(id)
        // .then((response) => {
        //   studentStore.setStudent(response.data)
        //   return TeacherService.getTeacherById(response.data.teacherID)
        // })
        // .then((response) => {
        //   teacherStore.setTeacher(response.data)
        // })
        // .catch((error) => {
        //   if(error.response && error.response.status === 404) {
        //     return {
        //       name: '404-resource',
        //       params: { resource: 'event' }
        //     }
        //   } else {
        //     return { name: 'network-error' }
        //   }
        // })
      },
      children: [
        {
          path: '',
          name: 'student-detail',
          component: StudentDetail,
        }
      ]
    }
  ]
})

router.beforeEach(() => {
  NProgress.start()
  })

  router.afterEach(() => {
    NProgress.done()
  })

export default router
