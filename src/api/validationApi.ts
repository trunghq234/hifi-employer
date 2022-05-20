import axiosClient from "./axiosClient";

const validationApi = {
  checkEmail: async (email: string) => {
    const {
      data: { data },
    } = await axiosClient.get("/check-employer-or-jobseeker" + `?email=${email}`);
    return data;
  },
};
export default validationApi;
