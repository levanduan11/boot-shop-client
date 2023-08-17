
import { takeLatest } from "redux-saga/effects";
import { LOGIN,ACTIVATION,RESET_PASS ,FORGOT_PASS_INIT, FORGOT_PASS_FINISH, CHANGE_PASS} from "../action/action";
import loginSaga from "./loginsaga";
import activationSaga from "./activationsaga";
import resetPasswordSaga from "./reset.saga";
import { forgotPasswordInitSaga,forgotPasswordFinishSaga } from "./forgot-password.saga";
import changePasswordSaga from "./change-password.saga";


export default function* rootSaga(): any {
  yield takeLatest(LOGIN,loginSaga)
  yield takeLatest(ACTIVATION,activationSaga)
  yield takeLatest(RESET_PASS,resetPasswordSaga)
  yield takeLatest(FORGOT_PASS_INIT,forgotPasswordInitSaga)
  yield takeLatest(FORGOT_PASS_FINISH,forgotPasswordFinishSaga)
  yield takeLatest(CHANGE_PASS,changePasswordSaga)
}