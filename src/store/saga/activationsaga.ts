import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosRequestConfig } from "axios";
import { Activation, HeaderData } from "../model/model";
import Method from "@/constant/methods";
import HttpClient from "@/service/HttpClient";
import { call, put } from "redux-saga/effects";
import { activationSuccess,activationFail } from "../slice/activationslice";

function* activationSaga(action: PayloadAction<HeaderData<Activation>>): any{
  console.log(action.payload);
  
  try {
    const config: AxiosRequestConfig = {
      url: '/auth/activate',
      method:Method.GET,
      params:{...action.payload},
    }
    const response = yield call(HttpClient.request, config)
    yield put(activationSuccess())
  } catch (error) {
    yield put(activationFail())
  }
}

export default activationSaga