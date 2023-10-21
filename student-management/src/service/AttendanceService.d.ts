import { StudentManagementResponse } from "../models/response";
import { Attendance } from "../models/attendance";

declare interface AttendanceService {
    getAllAttendances(auth:Auth):Promise<Array<Attendance>>;
    saveAttendance(attendance:Attendance,auth:Auth):Promise<StudentManagementResponse>;
}