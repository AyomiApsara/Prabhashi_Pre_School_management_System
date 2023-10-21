import { User } from "../models/user";

declare interface AuthService {
    login(user: User):Promise<StudentManagementResponse>;
}