// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './codeSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

// Optional: TypeScript users can infer RootState & AppDispatch
// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch
