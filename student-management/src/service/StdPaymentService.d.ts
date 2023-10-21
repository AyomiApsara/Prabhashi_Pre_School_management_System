import { StudentManagementResponse } from "../models/response";
import { StdPayment } from "../models/stdPayment";

declare interface StdPaymentService {
    getAllStdPayments(pageSize:number, pageNumber:number,auth:Auth):Promise<Array<StdPayment>>;
    saveStdPayment(stdPayment:StdPayment,auth:Auth):Promise<StudentManagementResponse>;
}