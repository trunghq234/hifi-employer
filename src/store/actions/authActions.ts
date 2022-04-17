import authApi from "@/api/authApi";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const login = createAsyncThunk("auth/login", async (user: any, { rejectWithValue }) => {
  try {
    const authState = await authApi.login(user);
    localStorage.setItem("accessToken", authState.accessToken);
    return authState;
  } catch (error: any) {
    if (!error.response) {
      throw error;
    }
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response.data);
    }
  }
});
const verifyToken = createAsyncThunk(
  "auth/verify-token",
  async (accessToken: any, { rejectWithValue }) => {
    try {
      const authState = await authApi.authenticate(accessToken);
      return { ...authState, accessToken };
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response.data);
      }
    }
  },
);
const register = createAsyncThunk("auth/register", async (userData: any, { rejectWithValue }) => {
  try {
    const authState = await authApi.register(userData);
    localStorage.setItem("accessToken", authState.accessToken);
    return authState;
  } catch (error: any) {
    if (!error.response) {
      throw error;
    }

    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response.data);
    }
  }
});

export { login, register, verifyToken };
