import { defineStore } from 'pinia'
import type { CommentInfo } from '@/type'
export const commentStudent = defineStore('comment', {
    state: () => ({
        comment: [] as CommentInfo[] // ระบุประเภทข้อมูล CommentInfo ให้เป็น array
    }),
    actions: {
        pushComment(comment: CommentInfo){ // ระบุประเภทข้อมูล CommentInfo ในพารามิเตอร์
            this.comment.push(comment)
        }
    }
})