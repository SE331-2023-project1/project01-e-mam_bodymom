export interface StudentItem {
    name: string;
    surname: string;
    id: string;
    profileimage: string;
    courselist: string[];
    teacherID: string;
}


export interface TeacherItem {
    name: string;
    surname: string;
    profileimage: string;
    id: string;
}

export interface CommentInfo{
    id: string;
    comment: string;
}