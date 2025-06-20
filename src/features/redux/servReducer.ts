import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { ServerType, type ServerState } from "./types";
import type { AppThunk } from "./store";

const initialState: ServerState = {
  activeServer: ServerType.nonePicked,
};

export const serverInfo = createSlice({
  name: "server",
  initialState,
  reducers: {
    activeServerInfo(state, action: PayloadAction<ServerType>) {
      state.activeServer = action.payload;
    },
  },
});

export const { activeServerInfo } = serverInfo.actions;
export default serverInfo.reducer;
