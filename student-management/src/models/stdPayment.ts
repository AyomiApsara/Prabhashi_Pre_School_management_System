import { Student } from "./student";

export class StdPayment {
  day: string;
  month: string;
  year: string;
  note: string;
  
  student:Student;
  constructor(
    day?: string,
    month?: string,
    year?: string,
    note?: string,
    
    student?: Student
  ) {
    this.day = day || "";
    this.month = month || "";
    this.year = year || "";
    this.note = note || "";
    
    this.student = student || new Student();

  }
}
