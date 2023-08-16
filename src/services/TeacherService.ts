import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
import type { TeacherItem } from '@/type'

const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3004',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getTeachers(perPage: number, page: number): Promise<AxiosResponse<TeacherItem[]>> {
    // perPage is limit
    // page is number of pages
    return apiClient.get<TeacherItem[]>('/teachers?_limit=' + perPage + '&_page=' + page)
  },
  getTeacherById(id : number) : Promise<AxiosResponse<TeacherItem>>{
    return apiClient.get<TeacherItem>('teachers/'+ '?teacherID='+id.toString())
  }
}