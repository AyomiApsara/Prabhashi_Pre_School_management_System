import { Parent } from "./parent";

export class Student {
  studentId:string;
  fName: string;
  lName: string;
  fullname: string;
  gender: string;
  birthday: string;
  address: string;
  nation: string;
  religion: string;
  regyear: string;
  pNote: string;
  gradeId: string;
  parent:Parent;
  constructor(
    studentId?: string,
    fName?: string,
    lName?: string,
    fullname?: string,
    gender?: string,
    birthday?: string,
    address?: string,
    nation?: string,
    religion?: string,
    regyear?: string,
    pNote?: string,
    gradeId?: string,
    parent?: Parent
  ) {
    this.studentId = studentId || "";
    this.fName = fName || "";
    this.lName = lName || "";
    this.fullname = fullname || "";
    this.gender = gender || "";
    this.birthday = birthday || "";
    this.address = address || "";
    this.nation = nation || "";
    this.religion = religion || "";
    this.regyear = regyear || "";
    this.pNote = pNote || "";
    this.gradeId = gradeId || "";
    this.parent = parent || new Parent();

  }
}
