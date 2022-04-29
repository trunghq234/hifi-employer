import axiosClient from "./axiosClient";

const roomApi = {
  getRoomsByUserId: async (userId: string) => {
    return await axiosClient.get(`/suggestion/rooms/${userId}`);
  },
};

export default roomApi;
