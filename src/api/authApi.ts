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
  updatePassword: async ({ idCompany, password, newPassword }: any) => {
    const {
      data: { data, accessToken },
    } = await axiosClient.patch(`/auth/password/${idCompany}`, { password, newPassword });
    return { user: data, accessToken };
  },
  updateCompany: async ({ idCompany, company }: any) => {
    const {
      data: { data },
    } = await axiosClient.patch(`/auth/${idCompany}`, company);
    return { user: data };
  },
};

export default authApi;
