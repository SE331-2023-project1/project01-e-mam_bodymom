import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
import type { StudentItem } from '@/type'

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_STUDENT,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getStudents(perPage: number, page: number): Promise<AxiosResponse<StudentItem[]>> {
    // perPage is limit
    // page is number of pages
    return apiClient.get<StudentItem[]>('?_limit=' + perPage + '&_page=' + page)
  },
  getAllStudents() : Promise<AxiosResponse<StudentItem[]>> {
    return apiClient.get<StudentItem[]>('')
  },
  getStudentById(id : number) : Promise<AxiosResponse<StudentItem>>{
    return apiClient.get<StudentItem>('/'+id.toString())
  }
}
