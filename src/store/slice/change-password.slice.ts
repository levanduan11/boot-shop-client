import { RootState } from "@/config/store"
import { createSlice } from "@reduxjs/toolkit"

interface ChangePasswordState{
  status: boolean,
  message?:string,
}

const initialState: ChangePasswordState = {
  status: false,
  message: '',
}

const changePasswordSlice = createSlice({
  name: 'change-password',
  initialState,
  reducers: {
    changePasswordReq: (state) => {
      state.status=false
    },
    changePasswordSuccess: (state) => {
      state.status=true
    },
    changePasswordFail: (state) => {
      state.status=true
    },
  }
})

export const {
  changePasswordReq,
  changePasswordSuccess,
  changePasswordFail
} = changePasswordSlice.actions
const changePasswordReducer = changePasswordSlice.reducer
export const changePasswordSelector = (state:RootState)=>state.changePassword
export default changePasswordReducer