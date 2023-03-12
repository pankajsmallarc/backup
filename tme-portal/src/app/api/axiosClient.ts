/* istanbul ignore file */
import { AuthState, OktaAuth } from '@okta/okta-auth-js'
import axios, { AxiosRequestConfig } from 'axios'
import { environment } from '../../environments/environment'

export const axiosClient = axios.create({
  baseURL: environment.API_GATEWAY,
})

export const axiosIntercept = (oktaAuth: OktaAuth) => {
  axiosClient.interceptors.request.use(
    async (request: AxiosRequestConfig) => {
      request.headers = request.headers || {}
      if (oktaAuth) {
        request.headers['Authorization'] = 'Bearer ' + oktaAuth.getAccessToken()
      }
      return request
    },
    (error: any) => {
      return Promise.reject(error)
    },
  )
}

export const getRequest = async (
  url: string,
  headers?: any,
  params?: any,
): Promise<any> => {
  return axiosClient
    .get(`/${url}`, { headers, params })
    .then((response: any) => response.data)
}

export const postRequest = async (
  url: string,
  payload: any,
  headers?: any,
  params?: any,
) => {
  return axiosClient
    .post(`/${url}`, payload, { headers, params })
    .then((response: any) => response.data)
}

export const putRequest = async (
  url: string,
  payload: any,
  headers?: any,
  params?: any,
) => {
  return axiosClient
    .put(`/${url}`, payload, { headers, params })
    .then((response: any) => response.data)
}

export const deleteRequest = async (
  url: string,
  payload: any,
  headers?: any,
  params?: any,
) => {
  return axiosClient
    .delete(`/${url}`, { headers, params, data: payload })
    .then((response: any) => response.data)
}
export const axiosRequests = {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
}
