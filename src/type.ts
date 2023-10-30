export interface StudentItem {
    name: string;
    surname: string;
    id: string;
    images: string[];
    courselist: string[];
    teacher: string[];
    comment?: any[]
    roles: string []
    department: string
}
export interface TeacherItem {
    [x: string]: any;
    name: string;
    surname: string;
    images: string[];
    id: string;
    roles: string []
    ownStudent: string []
}
export interface CommentInfo{
    id: string;
    comment: string;
}
export interface AnnouncementItem {
    images: string [],
    id: string,
    title: string,
    description: string,
    files: string []
}