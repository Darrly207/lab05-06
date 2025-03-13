import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./studentSlice";
import userReducer from "./authSlice";
export const store = configureStore({
  reducer: {
    students: studentReducer,
    auth: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
