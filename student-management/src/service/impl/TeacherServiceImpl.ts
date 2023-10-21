import { Auth } from "../../models/Auth";
import { StudentManagementResponse } from "../../models/response";
import { Teacher } from "../../models/teacher";
import { TeacherService } from "../TeacherService";
import { apiClient } from "./ApiClientImpl";


export const teacherService: TeacherService = {
  getAllTeachers: function (auth: Auth): Promise<Array<Teacher>> {
    return new Promise<Array<Teacher>>((resolve, reject) => {
      apiClient.get("teachers", auth.accessToken).then((response) => {
        console.log(response);
        const teachers: Array<Teacher> = response.data as Array<Teacher>;
        resolve(teachers);
      }).catch((err) => {
        console.log(err);
        reject(err);
      });;;
    });
  },
  saveTeacher: function (teacher: Teacher, auth: Auth): Promise<StudentManagementResponse> {
    console.log(teacher);

    return new Promise<StudentManagementResponse>((resolve, reject) => {
      apiClient.post("teachers", teacher, auth.accessToken).then((response) => {

        resolve(response as StudentManagementResponse);

      }).catch((err) => {
        console.log(err);
        reject(err);
      });;;
    });
  },
  updateTeacher: function (teacher: Teacher, auth: Auth): Promise<StudentManagementResponse> {
    return new Promise<StudentManagementResponse>((resolve, reject) => {
      apiClient.put("teachers", teacher, auth.accessToken).then((response) => {

        resolve(response as StudentManagementResponse);

      }).catch((err) => {
        console.log(err);
        reject(err);
      });;;
    });
  }
};
