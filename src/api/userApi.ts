import axiosClient from "./axiosClient";

const userApi = {
  getAllUsers: async () => {
    return await axiosClient.get("employer/users/");
  },

  getUser: async (id: String) => {
    return await axiosClient.get(`employer/users/${id}`);
  },
};
export default userApi;
