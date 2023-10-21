import { defineStore } from 'pinia'

import axios from 'axios'

import type { AxiosInstance } from 'axios'
// import type { EventOrganizer } from '@/type'
import type { StudentItem, TeacherItem } from '@/type'

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,

  withCredentials: false,

  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
    userRole: null as string[] | null,
    id: null as string | null
  }),
  getters: {
    currentUserName(): string {
        return ''
    },
    isAdmin(): boolean {
        return this.userRole?.includes('ROLE_ADMIN') || false
    }
  },
  actions: {
    login(email: string, password: string) {
      return apiClient
        .post('/api/v1/auth/authenticate', {
          username: email,
          password: password
        })
        .then((response) => {
            this.token = response.data.access_token
            // this.user = response.data.user
            this.userRole = response.data.user_role
            this.id = response.data.id
            localStorage.setItem('access_token', this.token as string)
            localStorage.setItem('user_role', JSON.stringify(this.userRole))
            localStorage.setItem('id', this.id as string)
            console.log(response.data.id)
            return response
        })
        
    },
    async studentRegister(
      username: string, 
      firstName: string, 
      lastName: string, 
      email: string, 
      password: string
      ) {
      const response = await apiClient.post('/api/v1/auth/register/student', {
        username: username,
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password,
      })
      this.token = response.data.access_token
      this.userRole = response.data.user_role
      this.id = response.data.id
      localStorage.setItem('access_token', this.token as string)
      localStorage.setItem('user_role', JSON.stringify(this.userRole))
      localStorage.setItem('id', this.id as string)
      return response
    },
    async studentUpdateProfile(id: string, firstName: string, lastName: string) {
      const response = await apiClient.put('/updatestudents', {
        id: id,
        name: firstName,
        surname: lastName,
      })
      return response
    },
    async teacherUpdateProfile(id: string, firstName: string, lastName: string) {
      const response = await apiClient.put('/updateteachers', {
        id: id,
        name: firstName,
        surname: lastName,
      })
      return response
    },
    logout() {
        console.log('logout')
        this.token = null
        this.userRole = null
        this.id = null
        localStorage.removeItem('access_token')
        localStorage.removeItem('user_role')
        localStorage.removeItem('id')
    },
    reload(token: string, userRole: string[], id: string) {
        this.token = token
        this.userRole = userRole
        this.id = id
    }
  }
})
