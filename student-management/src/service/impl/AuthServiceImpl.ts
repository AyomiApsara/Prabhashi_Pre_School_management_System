import { StudentManagementResponse } from "../../models/response";
import { User } from "../../models/user";
import { AuthService } from "../AuthService";
import { apiClient } from "./ApiClientImpl";


export const authService: AuthService = {
    login: function (user: User): Promise<StudentManagementResponse> {
        return new Promise<StudentManagementResponse>((resolve, reject) => {
            apiClient.post('auth', {"username": user.username, "password": user.password}).then((response) => {
              console.log(response)
              resolve(response as StudentManagementResponse);
              
            });
          });
    }
}