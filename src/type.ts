export interface StudentItem {
    name: string;
    surname: string;
    id: string;
    profileimage: string;
    courselist: string[];
    teacher: string[];
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
    ownStudent: string []
}
export interface CommentInfo{
    id: string;
    comment: string;
}
export interface AnnouncementItem {
    id: string,
    title: string,
    description: string,
    files: string []
}