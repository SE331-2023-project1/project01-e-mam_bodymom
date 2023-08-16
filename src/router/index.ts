import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StudentList from '../views/StudentListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/students',
      name: 'student-list',
      component: StudentList
    },
    {
      path: '/teacher',
      name: 'teacher-list',
      component: StudentList
    }
  ]
})

export default router
