import { BodyData, Login, LoginResponse } from './../model/model';
import Method from "@/constant/methods";
import HttpClient from "@/service/HttpClient";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { call, put } from "redux-saga/effects";
import { loginFailure, loginRequest, loginSuccess } from "../slice/loginslice";
import { PayloadAction } from "@reduxjs/toolkit";
import Config from '@/constant/config';
import storageService, { StorageType } from '@/service/storage';
import ApiUrl from '@/constant/routes';


function* loginSaga(action: PayloadAction<BodyData<Login>>): any {
  try {
    yield put(loginRequest())
    const config: AxiosRequestConfig = {
      url: ApiUrl.LOGIN_API,
      method: Method.POST,
      ...action.payload,
    }
    const response: AxiosResponse = yield call(HttpClient.request, config)
    const data = response?.data as LoginResponse
    if (data) {
      storageService.clear()
      const { token, firstLogin,refreshToken } = data
      if (!firstLogin) {
        if (action.payload.data?.rememberMe) {
          storageService.setItem(StorageType.LOCAL, Config.ACCESS_TOKEN, token)
          storageService.setItem(StorageType.LOCAL, Config.REFRESH_TOKEN, refreshToken)
        } else {
          storageService.setItem(StorageType.SESSION, Config.ACCESS_TOKEN, token)
          storageService.setItem(StorageType.SESSION, Config.REFRESH_TOKEN, refreshToken)
        }
      }
      yield put(loginSuccess(data))
    }
  } catch (error) {
    yield put(loginFailure())
  }

}

export default loginSaga