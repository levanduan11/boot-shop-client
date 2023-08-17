import activationReducer from "./activationslice";
import alertReducer from "./alertslice";
import changePasswordReducer from "./change-password.slice";
import forgotPasswordReducer from "./forgot-password.slice";
import loginReducer from "./loginslice";
import resetPasswordReducer from "./reset.slice";
import spinnerReducer from "./spiner.slice";

const rootReducer = {
  login: loginReducer,
  alert: alertReducer,
  activation: activationReducer,
  resetPassword: resetPasswordReducer,
  forgotPassword: forgotPasswordReducer,
  spinner: spinnerReducer,
  changePassword:changePasswordReducer,
}
export default rootReducer