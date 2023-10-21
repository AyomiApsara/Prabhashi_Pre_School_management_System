import { StudentManagementResponse } from "../models/response";
import { Grade } from "../models/grade";

declare interface GradeService {
    getAllgrades(auth:Auth):Promise<Array<Grade>>;
    saveGrade(grade:Grade,auth:Auth):Promise<StudentManagementResponse>;
}