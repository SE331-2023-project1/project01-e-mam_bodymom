import { defineStore } from 'pinia'
import type { CommentInfo } from '@/type' // ตรวจสอบให้แน่ใจว่า CommentInfo มีค่า id
export const commentStudentId = defineStore('comment_id', {
    state: () => ({
        comment_id: [] as CommentInfo[] // ระบุประเภทข้อมูล CommentInfo ให้เป็น array
    }),
    actions: {
        setComment(comment: CommentInfo[]){ // ระบุประเภทข้อมูล CommentInfo ในพารามิเตอร์
            this.comment_id = comment
        }
    }
})
