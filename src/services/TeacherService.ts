import apiClient from './AxiosClient'
import type { AxiosResponse } from 'axios'
import type { TeacherItem } from '@/type'

export default {
  getTeachers(perPage: number, page: number): Promise<AxiosResponse<TeacherItem[]>> {
    // perPage is limit
    // page is number of pages
    return apiClient.get<TeacherItem[]>('/teachers?_limit=' + perPage + '&_page=' + page)
  },
  getAllTeachers() : Promise<AxiosResponse<TeacherItem[]>> {
    return apiClient.get<TeacherItem[]>('/AllTeachers')
  },
  getTeacherById(id : string) : Promise<AxiosResponse<TeacherItem>>{
    return apiClient.get<TeacherItem>('/teachers/'+id.toString())
  },
  getTeacherByStudent(id :string) : Promise<AxiosResponse<TeacherItem>> {
    return apiClient.get<TeacherItem>('/teacherByStudent/'+id.toString())
  }
}