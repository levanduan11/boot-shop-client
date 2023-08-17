import Method from "@/constant/methods"
import ApiUrl from "@/constant/routes"
import { PayloadAction } from "@reduxjs/toolkit"
import { AxiosRequestConfig, AxiosResponse } from "axios"
import { ApiResponse, BodyData, ResetRq } from "../model/model"
import { call, put } from "redux-saga/effects"
import HttpClient from "@/service/HttpClient"
import { resetPasswordFail, resetPasswordSuccess } from "../slice/reset.slice"

function* resetPasswordSaga(action: PayloadAction<BodyData<ResetRq>>): any {
  try {
    const config: AxiosRequestConfig = {
      url: ApiUrl.RESET_API,
      method: Method.POST,
      ...action.payload
    }
   
    const response: AxiosResponse = yield call(HttpClient.request, config)
    const { status }: ApiResponse = response.data
    if (status) {
      yield put(resetPasswordSuccess())
    }
  } catch (error) {
    yield put(resetPasswordFail())
  }
}

export default resetPasswordSaga