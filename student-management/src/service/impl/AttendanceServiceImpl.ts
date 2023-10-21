import { Auth } from "../../models/Auth";
import { Attendance } from "../../models/attendance";
import { StudentManagementResponse } from "../../models/response";

import { AttendanceService } from "../AttendanceService";
import { apiClient } from "./ApiClientImpl";


export const attendanceService: AttendanceService = {
  
  getAllAttendances: function (auth:Auth): Promise<Array<Attendance>> {
    return new Promise<Array<Attendance>>((resolve, reject) => {
      console.log(auth.accessToken)
      apiClient.get( "attendences",auth.accessToken).then((response) => {
        console.log(response)
        const attendances: Array<Attendance> = response.data as Array<Attendance>;
        resolve(attendances);
      });
    }); 
  },
  saveAttendance: function (attendance: Attendance,auth:Auth): Promise<StudentManagementResponse> {
    console.log(attendance);
    return new Promise<StudentManagementResponse>((resolve, reject) => {
      apiClient.post( "attendences",attendance,auth.accessToken).then((response) => {
       
        resolve(response as StudentManagementResponse);
        
      });
    });
  },
};
