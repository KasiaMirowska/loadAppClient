import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ServerType } from "./types";

export const selectActiveState = (state: RootState): ServerType =>
  state.server.activeServer;

export const selectIsServerless = (state: RootState): boolean =>
  state.server.activeServer === ServerType.serverlessAWS;
export const selectIsExpress = (state: RootState): boolean =>
  state.server.activeServer === ServerType.express;
export const selectIsNone = (state: RootState): boolean =>
  state.server.activeServer === ServerType.nonePicked;
