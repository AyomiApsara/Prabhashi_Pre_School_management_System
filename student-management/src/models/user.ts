export class User {
    userId: number;
    username: string;
    password: string;
    role: string;
    refreshToken: string;
    accessToken: string;
    constructor(
        userId?: number,
        username?: string,
        password?: string,
        role?: string,
        refreshToken?: string,
        accessToken?: string,
      ) {
        this.userId = userId || 0;
        this.username = username || "";
        this.password = password || "";
        this.role = role || "";
        this.refreshToken = refreshToken || "";
        this.accessToken = accessToken || "";
    
      }
}