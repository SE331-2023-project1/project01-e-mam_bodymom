import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StudentList from '../views/StudentListView.vue'
import TeacherList from '../views/TeacherListView.vue'
import StudentLayout from '../views/student/StudentLayout.vue'
import StudentDetail from '../views/student/StudentDetail.vue'
import TeacherLayout from '../views/teacher/TeacherLayout.vue'
import TeacherDetail from '../views/teacher/TeacherDetail.vue'
import NetworkErrorView from '../views/NetworkErrorView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import HomePage from '../views/HomeView.vue'
import NProgress from 'nprogress'
import StudentService from '@/services/StudentService'
import TeacherService from '@/services/TeacherService'
import { useStudentStore } from '@/stores/student'
import { useTeacherStore } from '@/stores/teacher'
import type { StudentItem } from '@/type'
import { commentStudent } from '@/stores/comment'
import { commentStudentId } from '@/stores/comment_id'
import { storeToRefs } from 'pinia'

import AddPerson from '../views/AddPerson.vue';

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
          teacherStore.setTeacher(teacher)
          const studentPromises = teacher.studentsId.map(async studentId => {
            const student = await studentStore.getStudentById(studentId)
            return student
          });
          const students = await Promise.all(studentPromises)
          // console.log(studentPromises)
          studentStore.setStudent(students.filter(student => student !== null) as StudentItem[]);
          // console.log(studentStore)
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          // const errorUrl = error.response.config.url;
          // const resource = errorUrl.includes('teachers') ? 'teachers' : 'students';

          // console.log(`Resource '${resource}' not found.`);
          // console.log("Resource not found")
  
          const errorUrl = error.response.config.url
          console.log("Error URL:", errorUrl)
      
          const resourceIdentifier = errorUrl.split('/').pop() // Get the last segment
          console.log("Resource Identifier:", resourceIdentifier)
      
          const isTeacher = resourceIdentifier.charAt(0) === 'T' // Check the first character
          console.log("Is Teacher:", isTeacher)
      
          const resource = isTeacher ? 'teacher' : 'student'
          console.log("Resource:", resource)

          router.push({
            name: '404-resource',
            params: { resource }
        })
        } else {
          router.push({ name: 'network-error'})
        }
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
        const id: string = to.params.id as string
        const studentStore = useStudentStore()
        const teacherStore = useTeacherStore()
        try {
          const student = await studentStore.getStudentById(id)
          studentStore.setStudent(student)
          const teacher = await teacherStore.getTeacherById(student.teacherID)
          teacherStore.setTeacher(teacher)
          // console.log(studentStore)

        } catch (error: any) {
          if (error.response && error.response.status === 404) {
            // const errorUrl = error.response.config.url;
            // console.log("Error URL:", errorUrl);
            // const resource = errorUrl.includes('T') ? 'teachers' : 'students';
    
            // console.log(`Resource '${resource}' not found.`);
            // console.log("Resource not found")

            const errorUrl = error.response.config.url
            console.log("Error URL:", errorUrl)
      
            const resourceIdentifier = errorUrl.split('/').pop() // Get the last segment
            console.log("Resource Identifier:", resourceIdentifier)
      
            const isTeacher = resourceIdentifier.charAt(0) === 'T' // Check the first character
            console.log("Is Teacher:", isTeacher)
      
            const resource = isTeacher ? 'teacher' : 'student'
            console.log("Resource:", resource)
              router.push({
                name: '404-resource',
                params: { resource }
            })
            } else {
              router.push({ name: 'network-error'})
            }
        }
      },
      children: [
        {
          path: '',
          name: 'student-detail',
          component: StudentDetail,
        }
      ]
    },
    {
      path: '/404/:resource',
      name: '404-resource',
      component: NotFoundView,
      props: true
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    },
    {
      path: '/network-error',
      name: 'network-error',
      component: NetworkErrorView
    },{
      path: '/add',
      name: 'add-person',
      component: AddPerson,
      beforeEnter: () => {
        useTeacherStore().fetchTeachers()
      }
    }
  ]
})

router.beforeEach(async () => {
  NProgress.start()
  const teacherStore = useTeacherStore()
  const studentStore = useStudentStore()
  if (teacherStore.teachers.length === 0) {
    await teacherStore.fetchTeachersFromDB()
  }
  if (studentStore.students.length === 0) {
    await studentStore.fetchStudentsFromDB()
  }

  })

  router.afterEach(() => {
    NProgress.done()
  })

export default router
