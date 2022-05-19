import { RootState } from "./";

export const selectUser = (state: RootState) => state.auth.user;
export const selectApplications = (state: RootState) => state.applications.entities;
