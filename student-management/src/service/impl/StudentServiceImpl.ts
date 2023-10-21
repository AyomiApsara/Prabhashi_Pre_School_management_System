import { Auth } from "../../models/Auth";
import { StudentManagementResponse } from "../../models/response";
import { Student } from "../../models/student";
import { StudentService } from "../StudentService";
import { apiClient } from "./ApiClientImpl";


export const studentService: StudentService = {
  getAllStudents: function (pageSize: number, pageNumber: number, auth: Auth): Promise<Array<Student>> {
    return new Promise<Array<Student>>((resolve, reject) => {
      apiClient.get("students", auth.accessToken).then((response) => {
        console.log(response);
        const students: Array<Student> = response.data as Array<Student>;
        resolve(students);
      }).catch((err) => {
        console.log(err);
        reject(err);
      });;
    });
  },
  saveStudent: function (student: Student, auth: Auth): Promise<StudentManagementResponse> {
    console.log(student);

    return new Promise<StudentManagementResponse>((resolve, reject) => {
      apiClient.post("students", student, auth.accessToken).then((response) => {

        resolve(response as StudentManagementResponse);

      }).catch((err) => {
        console.log(err);
        reject(err);
      });
    });
  },
  updateStudent: function (student: Student, auth: Auth): Promise<StudentManagementResponse> {
    console.log(student);

    return new Promise<StudentManagementResponse>((resolve, reject) => {
      apiClient.put("students", student, auth.accessToken).then((response) => {

        resolve(response as StudentManagementResponse);

      }).catch((err) => {
        console.log(err);
        reject(err);
      });
    });
  },
  findStudentById: function (studentId: string, auth: Auth): Promise<Student> {
    return new Promise<Student>((resolve, reject) => {
      apiClient.get("students/" + studentId, auth.accessToken).then((response) => {

        const student: Student = response.data as Student;
        console.log(student);
        resolve(student);

      }).catch((err) => {
        console.log(err);
        reject(err);
      });
    });
  },
  deleteStudent: function (studentId: string, auth: Auth): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      apiClient.get("students/delete/" + studentId, auth.accessToken).then((response) => {

        const student: Student = response.data as Student;
        console.log(student);
        resolve();

      }).catch((err) => {
        console.log(err);
        reject(err);
      });
    });
  }
};
