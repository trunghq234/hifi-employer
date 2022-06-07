import { Application } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getApplications, updateApplication } from "../actions/applicationActions";

export type ApplicationState = Partial<{
  entities: Application[];
}>;

const initialState: ApplicationState = {
  entities: [],
};

export const applicationSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getApplications.fulfilled, (state, { payload }) => {
      state.entities = payload;
    });
    builder.addCase(
      updateApplication.fulfilled,
      (state, { payload }: PayloadAction<Application>) => {
        state.entities = state.entities?.map((application) =>
          application._id == payload._id ? { ...application, status: payload.status } : application,
        );
      },
    );
  },
});

export const applicationActions = {
  ...applicationSlice.actions,
  getApplications,
  updateApplication,
};

export default applicationSlice.reducer;
