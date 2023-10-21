import { Teacher as TeacherType } from "./teacher";

export class Grade {
    gradeId: number | undefined;;
    gradeName: string;
    teacherId: string;
    Teacher:TeacherType | undefined;
    constructor(
        gradeName?: string,
        gradeId?: number,
        teacherId?: string,
        Teacher?: TeacherType,
      ) {
        this.gradeId = gradeId || undefined;
        this.gradeName = gradeName || "";
        this.teacherId = teacherId || "";
        this.Teacher = Teacher || undefined;
      }
}