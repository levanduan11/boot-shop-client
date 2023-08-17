import { createSlice } from "@reduxjs/toolkit"

interface ActivationState{
  success: boolean
  message:string
}

const initialState: ActivationState = {
  success: false,
  message:""
}

const activationSlice = createSlice({
  name: "activation",
  initialState,
  reducers: {
    activationSuccess: (state) => {
      state.success=true
    } , 
    activationFail: (state) => {
      state.success=false
    }
  }
})

export const { activationSuccess, activationFail } = activationSlice.actions
const activationReducer = activationSlice.reducer
export default activationReducer