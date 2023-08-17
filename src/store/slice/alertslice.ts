import { RootState } from "@/config/store"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface AlertState {
  message: string,
  valid: boolean,
  show: boolean
}

const initialState: AlertState = {
  message: '',
  valid: false,
  show: false
}

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<AlertState>) => {
      state.message = action.payload.message
      state.valid = action.payload.valid
      state.show = action.payload.show
    },
    hideAlert: (state) => {
      state.message = ''
      state.valid = false
      state.show = false
    }
  }
})

export const { showAlert, hideAlert } = alertSlice.actions
export const alertSelector = (state:RootState)=>state.alert
const alertReducer = alertSlice.reducer
export default alertReducer