
import { Student as StudentType} from "./student";

export class Attendance {
  attendanceId: string;
    date: string;
    Student:StudentType | undefined;
    studentId: string;
    constructor(
        date?: string,
        studentId?: string,
        attendanceId?: string,
        student?: StudentType
      ) {
        this.attendanceId = attendanceId || "";
        this.studentId = studentId || "";
        this.date = date || "";
        this.Student = student || undefined;
      }
}