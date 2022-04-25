import { Company } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login, register, verifyToken } from "../actions/authActions";
export type AuthState = Partial<{
  accessToken: string;
  user: Company;
}>;

export const initialState: AuthState = {
  accessToken: undefined,
  user: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem("accessToken");
      return initialState;
    },
  },
  extraReducers: (builder) => {
    [login, register, verifyToken].forEach((thunk) =>
      builder.addCase(thunk.fulfilled, (state, { payload }: PayloadAction<any>) => {
        return { ...state, ...payload };
      }),
    );
    [login, register, verifyToken].forEach((thunk) =>
      builder.addCase(thunk.rejected, () => {
        return initialState;
      }),
    );
  },
});

export const authActions = {
  ...authSlice.actions,
  login,
  register,
  verifyToken,
};
