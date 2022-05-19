import { applicationApi } from "@/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getApplications = createAsyncThunk(
  "applications/getApplications",
  async (idPost: String) => {
    const response = await applicationApi.getAllByPost(idPost);
    return response.data.data;
  },
);

export const updateApplication = createAsyncThunk(
  "applications/updateApplication",
  async ({ idApplication, status }: { idApplication: string; status: string }) => {
    const response = await applicationApi.updateStatus(idApplication, status);
    return response.data.data;
  },
);
