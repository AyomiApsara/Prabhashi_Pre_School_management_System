export class Auth {
    user:string;
    password:string;
    roles:Array<string>;
    accessToken:string;
    constructor(
        user?: string,
        password?: string,
        roles?: Array<string>,
        accessToken?: string
      ) {
        this.user = user || "";
        this.password = password || "";
        this.roles = roles || [];
        this.accessToken = accessToken || "";
      }
}