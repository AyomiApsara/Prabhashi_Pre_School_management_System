import { Auth } from "../../models/Auth";
import { StudentManagementResponse } from "../../models/response";
import { StdPayment } from "../../models/stdPayment";
import { StdPaymentService } from "../StdPaymentService";
import { apiClient } from "./ApiClientImpl";


export const stdPaymentService: StdPaymentService = {
  
  getAllStdPayments: function (pageSize:number, pageNumber:number,auth:Auth): Promise<Array<StdPayment>> {
    return new Promise<Array<StdPayment>>((resolve, reject) => {
      apiClient.get( "stdPayments",auth.accessToken).then((response) => {
        console.log(response)
        const stdPayments: Array<StdPayment> = response.data as Array<StdPayment>;
        resolve(stdPayments);
      });
    }); 
  },
  saveStdPayment: function (stdPayment: StdPayment,auth:Auth): Promise<StudentManagementResponse> {
    console.log(stdPayment);
    
    return new Promise<StudentManagementResponse>((resolve, reject) => {
      apiClient.post( "stdPayments",stdPayment,auth.accessToken).then((response) => {
       
        resolve(response as StudentManagementResponse);
        
      });
    });
  },
};
