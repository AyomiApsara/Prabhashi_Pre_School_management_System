import { Parent } from "./parent";

export class Teacher {
  teacherId: string;
  fName: string;
  lName: string;
  fullname: string;
  address: string;
  teacherNIC: string;
  teacherNo: string;
  teacherEmail: string;
  regDate: string;
  
  constructor(
    teacherId?: string,
    fName?: string,
    lName?: string,
    fullname?: string,
    address?: string,
    teacherNIC?: string,
    teacherNo?: string,
    teacherEmail?: string,
    regDate?: string
    
   
  ) {
    this.teacherId = teacherId || "";
    this.fName = fName || "";
    this.lName = lName || "";
    this.fullname = fullname || "";
    this.address = address || "";
    this.teacherNIC = teacherNIC || "";
    this.teacherNo = teacherNo || "";
    this.teacherEmail = teacherEmail || "";
    this.regDate = regDate || "";
    
  }
}
