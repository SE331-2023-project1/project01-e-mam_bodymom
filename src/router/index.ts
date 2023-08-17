import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StudentList from '../views/StudentListView.vue'
import TeacherList from '../views/TeacherListView.vue'
import StudentLayout from '../views/student/StudentLayout.vue'
import StudentDetail from '../views/student/StudentDetail.vue'
import HomePage from '../views/HomeView.vue'
import NProgress from 'nprogress'

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
      path: '/students/:id',
      name: 'student-layout',
      component: StudentLayout,
      props: true,
      children: [
        {
          path: '',
          name: 'student-detail',
          component: StudentDetail,
          props: true
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
