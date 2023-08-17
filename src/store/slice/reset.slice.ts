import { RootState } from "@/config/store"
import { createSlice } from "@reduxjs/toolkit"

interface ResetState {
  status: boolean,
  message?: string
}
const initialState: ResetState = {
  status: false,
  message: '',
}

const resetSlice = createSlice({
  name: 'reset-password',
  initialState,
  reducers: {
    resetPasswordReq: (state) => {
      state.status = false
    },
    resetPasswordSuccess: (state) => {
      state.status = true
    },
    resetPasswordFail: (state) => {
      state.status = false
    },
  }
})

export const { resetPasswordReq, resetPasswordSuccess, resetPasswordFail } = resetSlice.actions
const resetPasswordReducer = resetSlice.reducer
export default resetPasswordReducer
export const resetSelector = (state:RootState)=>state.resetPassword