import { PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse, BodyData } from "../model/model";
import { ChangePassword, RequestClient } from "@/model/form.model";
import { call, put } from "redux-saga/effects";
import { changePasswordFail, changePasswordReq, changePasswordSuccess } from "../slice/change-password.slice";
import { hideSpinner, showSpinner } from "../slice/spiner.slice";
import { AxiosRequestConfig } from "axios";
import Method from "@/constant/methods";
import HttpClient from "@/service/HttpClient";
import ApiUrl from "@/constant/routes";
import { showAlert } from "../slice/alertslice";

function* changePasswordSaga(action: PayloadAction<BodyData<ChangePassword>>) {
  try {
    yield put(changePasswordReq())
    yield put(showSpinner())
    const req: RequestClient = {
      requiredToken: true,
      data: action.payload.data,
    }
    const config: AxiosRequestConfig = {
      url: ApiUrl.CHANGE_PASS,
      method: Method.POST,
      data:req
    }
    const res: ApiResponse = yield call(HttpClient.request, config)
    if (res.status) {
      yield put(changePasswordSuccess())
      yield put(
        showAlert({
          message:'change password success fully',
          show: true,
          valid: true
        })
      )
    }
  } catch (error) {
    yield put(changePasswordFail())
  } finally {
    yield put(hideSpinner())

  }

}
export default changePasswordSaga