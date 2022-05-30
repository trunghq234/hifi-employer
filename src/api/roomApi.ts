import axiosClient from "./axiosClient";

const roomApi = {
  getRoomsByUserId: async (userId: string) => {
    return await axiosClient.get(`http://localhost:5000/api/suggestion/rooms/${userId}`);
  },
};

export default roomApi;
