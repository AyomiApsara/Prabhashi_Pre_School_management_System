declare interface ApiClient {
    get(suffixUrl: string,authorization?: string): Promise<AxiosResponse> ;
    post(suffixUrl: string, data: any,authorization?: string): Promise<AxiosResponse> ;
    put(suffixUrl: string, data: any,authorization?: string): Promise<AxiosResponse> ;
}