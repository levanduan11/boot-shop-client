import { call, put } from "redux-saga/effects";
import {
  forgotPasswordIniFail,
  forgotPasswordInitReq,
  forgotPasswordInitSuccess,
  forgotPasswordFinishInitReq,
  forgotPasswordFinishInitSuccess,
  forgotPasswordFinishInitFail,
} from "../slice/forgot-password.slice"
import { hideSpinner, showSpinner } from "../slice/spiner.slice";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import ApiUrl from "@/constant/routes";
import Method from "@/constant/methods";
import HttpClient from "@/service/HttpClient";
import { ApiResponse, BodyData } from "../model/model";
import { PayloadAction } from "@reduxjs/toolkit";
import { ForgotPass } from "../model/req.model";
import { ForgotPassFinish } from "@/model/form.model";
import { showAlert } from "../slice/alertslice";

export function* forgotPasswordInitSaga(action: PayloadAction<BodyData<ForgotPass>>): any {
  try {
    yield put(forgotPasswordInitReq())
    yield put(showSpinner())
    const config: AxiosRequestConfig = {
      url: ApiUrl.FORGOT_PASS_INIT,
      method: Method.POST,
      ...action.payload
    }
    const res: AxiosResponse = yield call(HttpClient.request, config)
    const data: ApiResponse = res.data
    if (data.status) {
      yield put(forgotPasswordInitSuccess())
    }
  } catch (error) {
    yield put(forgotPasswordIniFail())
  } finally {
    yield put(hideSpinner())
  }

}

export function* forgotPasswordFinishSaga(action: PayloadAction<BodyData<ForgotPassFinish>>): any {
  try {
    yield put(forgotPasswordFinishInitReq())
    yield put(showSpinner())
    const config: AxiosRequestConfig = {
      url: ApiUrl.FORGOT_PASS_FINISH,
      method: Method.POST,
      ...action.payload
    }
    const res: AxiosResponse = yield call(HttpClient.request, config)
    const data: ApiResponse = res.data
    if (data.status) {
      yield put(forgotPasswordFinishInitSuccess())
      yield put(showAlert({
        valid: true,
        message: "change password successfully",
        show: true
      }))
    }
  } catch (error) {
    yield put(forgotPasswordFinishInitFail())
  } finally {
    yield put(hideSpinner())
  }

}