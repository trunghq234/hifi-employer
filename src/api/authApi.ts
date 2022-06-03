import axiosClient from "./axiosClient";

const authApi = {
  login: async ({ email, password }: any) => {
    const {
      data: { data, accessToken },
    } = await axiosClient.post("/employer/auth/login", { email, password });
    return { user: data, accessToken };
  },
  authenticate: async (accessToken: string) => {
    const {
      data: { data },
    } = await axiosClient.get("/employer/auth", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return { user: data };
  },
  register: async (companyInfo: any) => {
    const {
      data: { data, accessToken },
    } = await axiosClient.post("employer/auth/register", companyInfo);
    return { user: data, accessToken };
  },
};
export default authApi;
