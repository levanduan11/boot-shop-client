import { RootState } from "@/config/store"
import { createSlice } from "@reduxjs/toolkit"

interface SpinnerState{
  show:boolean
}
const initialState: SpinnerState = {
  show:false
}
const spinnerSlice = createSlice({
  name: "spinner",
  initialState,
  reducers: {
    showSpinner: (state) => {
      state.show=true
    },
    hideSpinner: (state) => {
      state.show=false
    },
  }
})

export const {
  showSpinner,
  hideSpinner
} = spinnerSlice.actions
const spinnerReducer = spinnerSlice.reducer
export const spinnerSelector = (state: RootState) => state.spinner
export default spinnerReducer