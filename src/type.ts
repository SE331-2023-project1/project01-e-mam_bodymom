export interface StudentItem {
    name: string;
    surname: string;
    id: string;
    profileimage: string;
    courselist: string[];
    teacherID: string;
    comment?: any[]
    roles: string []
}
export interface TeacherItem {
    [x: string]: any;
    name: string;
    surname: string;
    profileimage: string;
    id: string;
    roles: string []
}
export interface CommentInfo{
    id: string;
    comment: string;
}