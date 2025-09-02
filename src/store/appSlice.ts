// src/store/appSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ConsoleLine } from "./types";

interface AppState {
  consoleToDisplayLines: ConsoleLine[];
  editorCode: string;
}

const initialState: AppState = {
  consoleToDisplayLines: [],
  editorCode: "",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // Console state
    addConsoleLine: (state, action: PayloadAction<ConsoleLine>) => {
      state.consoleToDisplayLines.push(action.payload);
    },
    clearConsole: (state) => {
      state.consoleToDisplayLines = [];
    },

    // Editor state
    setEditorCode: (state, action: PayloadAction<string>) => {
      state.editorCode = action.payload;
    },
    clearEditorCode: (state) => {
      state.editorCode = "";
    },
  },
});

// Export actions
export const { addConsoleLine, clearConsole, setEditorCode, clearEditorCode } = appSlice.actions;

// Export reducer
export default appSlice.reducer;
