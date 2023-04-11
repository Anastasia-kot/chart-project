import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./app-reducer";

export const store = configureStore({
  reducer: {
    appPage: appReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch