import axiosClient from "./axiosClient";

const userApi = {
  getAllUsers: async () => {
    return await axiosClient.get("/users/");
  },

  getUser: async (id: String) => {
    return await axiosClient.get(`/users/${id}`);
  },
};
export default userApi;
