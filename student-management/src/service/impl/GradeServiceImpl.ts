import { Auth } from "../../models/Auth";
import { Grade } from "../../models/grade";
import { StudentManagementResponse } from "../../models/response";

import { GradeService } from "../GradeService";
import { apiClient } from "./ApiClientImpl";


export const gradeService: GradeService = {
  
  getAllgrades: function (auth:Auth): Promise<Array<Grade>> {
    return new Promise<Array<Grade>>((resolve, reject) => {
      console.log(auth.accessToken)
      apiClient.get( "grades",auth.accessToken).then((response) => {
        console.log(response)
        const grades: Array<Grade> = response.data as Array<Grade>;
        resolve(grades);
      }).catch((err)=>{
        console.log(err)
        reject(err);
      });
    }); 
  },
  saveGrade: function (grade: Grade,auth:Auth): Promise<StudentManagementResponse> {
    console.log(grade);
    return new Promise<StudentManagementResponse>((resolve, reject) => {
      apiClient.post( "grades",grade,auth.accessToken).then((response) => {
       
        resolve(response as StudentManagementResponse);
        
      }).catch((err)=>{
        console.log(err)
        reject(err);
      });
    });
  },
};
