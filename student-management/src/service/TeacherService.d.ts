import { StudentManagementResponse } from "../models/response";
import { Teacher } from "../models/teacher";

declare interface TeacherService {
    getAllTeachers(auth:Auth):Promise<Array<Teacher>>;
    saveTeacher(teacher:Teacher,auth:Auth):Promise<StudentManagementResponse>;
    updateTeacher(teacher:Teacher,auth:Auth):Promise<StudentManagementResponse>;
}