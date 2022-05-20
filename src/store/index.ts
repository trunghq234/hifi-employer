import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { authSlice } from "./reducers/authSlice";
import { chattingSlice } from "./reducers/chattingSlices";
import applicationsReducer from "./reducers/applicationSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    chatting: chattingSlice.reducer,
    applications: applicationsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
