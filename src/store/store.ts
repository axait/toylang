// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

// Optional: TypeScript helpers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
