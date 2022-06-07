import axiosClient from "./axiosClient";

const url = "suggestion/rooms";

const roomApi = {
  getRoomsByUserId: async (userId: string) => {
    return await axiosClient.get(`${url}/${userId}`);
  },
};

export default roomApi;
