import { StudentManagementResponse } from "../models/response";
import { Student } from "../models/student";

declare interface StudentService {
    deleteStudent: (studentId: string, auth: Auth) => Promise<void>;
    findStudentById(studentId:string,auth:Auth): Promise<Student>;
    
    getAllStudents(pageSize:number, pageNumber:number,auth:Auth):Promise<Array<Student>>;
    saveStudent(student:Student,auth:Auth):Promise<StudentManagementResponse>;
    updateStudent: (student: Student, auth: Auth) => Promise<StudentManagementResponse>;
}