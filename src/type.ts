export interface StudentItem {
    name: string;
    surname: string;
    id: string;
    profileimage: string;
    courselist: string[];
    teacherID: string;
    comment?: any[]
}
export interface TeacherItem {
    [x: string]: any;
    name: string;
    surname: string;
    profileimage: string;
    id: string;
}
export interface CommentInfo{
    id: string;
    comment: string;
}