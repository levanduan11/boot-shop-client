import rootSaga from "@/store/saga/rootsaga";
import rootReducer from "@/store/slice/rootreducer";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga'


const sagaMiddleware = createSagaMiddleware()
export const store = configureStore({
  reducer: rootReducer,
  middleware(getDefaultMiddleware){
      return getDefaultMiddleware({}).concat(sagaMiddleware);
  },
})

sagaMiddleware.run(rootSaga)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch