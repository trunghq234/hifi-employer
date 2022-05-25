import axiosInstance from "./axiosIns";
const emailApi = {
  sendEmailVerification: async (email: string) => {
    return axiosInstance.post("/email/send-code", { email });
  },
  verifyCode: async ({ email, code }: any) => {
    return axiosInstance.post("/email/code-verification", { email, code });
  },
};
export default emailApi;
