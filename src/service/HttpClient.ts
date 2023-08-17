import { RequestClient } from './../model/form.model';
import { store } from "@/config/store";
import Config from "@/constant/config";
import Message from "@/lib/message";
import { ApiResponse, ErrorResponse } from "@/store/model/model";
import { hideAlert, showAlert } from "@/store/slice/alertslice";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import storageService, { StorageType } from './storage';
import { loginReset } from '@/store/slice/loginslice';
import { hideSpinner } from '@/store/slice/spiner.slice';
import { getUsername } from './auth';
import { headers } from 'next/dist/client/components/headers';

interface SimpleAxiosInstance extends AxiosInstance {
  setToken?: (token: string) => void
}

const baseURL = 'http://localhost:8080/api'

const HttpClient = {
  request: async (reqConfig: AxiosRequestConfig) => {

    const instance: SimpleAxiosInstance = axios.create({
      baseURL,
    })
    instance.setToken = (token: string) => {
      localStorage.setItem(Config.ACCESS_TOKEN, token)
    }
    function isRequestClient(obj: any): obj is RequestClient {
      return 'requiredToken' in obj;
    }
    // TO DO
    instance.interceptors.request.use((config) => {
      const requestClient = config.data
      if (isRequestClient(requestClient)) {
        const { params, data, requiredToken } = requestClient
        if (params) {
          config['params'] = params
        }
        if (data) {
          config['data'] = data
        }
        if (requiredToken) {
          const token = storageService.getItem(Config.ACCESS_TOKEN)
          if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
          }
        }
      }
      return config
    }, (error) => {
      console.log('interceptor request error', error);
      return Promise.reject(error)
    })
    instance.interceptors.response.use((response) => {
      console.log('interceptor response', response);

      return response
    }, (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 403) {
          const { errors } = error.response.data as ApiResponse
          console.log(errors);

          if (errors?.token_expired) {
            console.log(true);

            const prevRequest = { ...error.config }
            const token = storageService.getItem(Config.ACCESS_TOKEN)
            const refreshToken = storageService.getItem(Config.REFRESH_TOKEN)
            console.log(refreshToken);
            
            if (token && refreshToken) {
              const username = getUsername(token)
              console.log(username);

              const a = {
                refreshToken,
                username,
              }
              instance.post('/auth/refresh-token', a)
                .then(({ token, refreshToken }: any) => {
                  storageService.clear()
                  storageService.setItem(StorageType.SESSION, Config.ACCESS_TOKEN, token)
                  storageService.setItem(StorageType.SESSION, Config.REFRESH_TOKEN, refreshToken)
                  console.log(prevRequest.headers);
                  
                })

            }
          } else {
            // storageService.clear()
            // store.dispatch(loginReset())
            // window.location.reload()
          }

        }
      }
      return Promise.reject(error)
    })

    return instance({ ...reqConfig })
      .catch(error => {
        let message = Message.DEFAULT_ERROR
        if (error instanceof AxiosError) {
          const response = error.response
          const data = response?.data as ErrorResponse;
          if (data?.message) {
            message = data.message
          }
        }
        store.dispatch(showAlert({
          message,
          show: true,
          valid: false
        }))
        store.dispatch(hideSpinner())
        setTimeout(() => {
          store.dispatch(hideAlert())
        }, 5000);
        throw error
      })
  }
}

export default HttpClient