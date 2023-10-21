import axios, { AxiosResponse } from "axios";
import { error } from "console";

const baseURL = "http://localhost:3001/";
export const apiClient: ApiClient = {
  get: function (suffixUrl: string, authorization?: string): Promise<any> {

    const url = baseURL + suffixUrl;
    return new Promise<AxiosResponse>((resolve, reject) => {
      return axios
        .get(url, {
          headers: {
            Authorization: authorization ? `Bearer ${authorization}` : undefined,
          },
        })
        .then((response: AxiosResponse) => {
          resolve(response);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },

  post: function (suffixUrl: string, data: any, authorization?: string): Promise<AxiosResponse> {

    const url = baseURL + suffixUrl;
    return new Promise<AxiosResponse>((resolve, reject) => {
      return axios
        .post(url, data, {
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            authorization: authorization ? `Bearer ${authorization}` : undefined,
          },
        })
        .then((response: AxiosResponse) => {
          resolve(response);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },
  put: function (suffixUrl: string, data: any, authorization?: string | undefined): Promise<AxiosResponse> {
    const url = baseURL + suffixUrl;
    return new Promise<AxiosResponse>((resolve, reject) => {
      return axios
        .put(url, data, {
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            authorization: authorization ? `Bearer ${authorization}` : undefined,
          },
        })
        .then((response: AxiosResponse) => {
          resolve(response);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }
};

