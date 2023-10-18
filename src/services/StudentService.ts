import apiClient from './AxiosClient'
import type { AxiosResponse } from 'axios'
import type { StudentItem } from '@/type'

export default {
  getStudents(perPage: number, page: number): Promise<AxiosResponse<StudentItem[]>> {
    // perPage is limit
    // page is number of pages
    return apiClient.get<StudentItem[]>('/students?_limit=' + perPage + '&_page=' + page)
  },
  getAllStudents() : Promise<AxiosResponse<StudentItem[]>> {
    return apiClient.get<StudentItem[]>('/AllStudents')
  },
  getStudentById(id : string) : Promise<AxiosResponse<StudentItem>>{
    return apiClient.get<StudentItem>('/students/'+id.toString())
  },
  getStudentsByTeacher(id :string) : Promise<AxiosResponse<StudentItem[]>> {
    return apiClient.get<StudentItem[]>('/studentsByTeacher/'+id.toString())
  }
}
