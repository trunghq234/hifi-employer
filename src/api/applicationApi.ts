import axiosClient from "./axiosClient";

const applicationApi = {
  getAllPostByPost: (id: any) => {
    const url = `/applications/posts/${id}`;
    return axiosClient.get(url);
  },
};
export default applicationApi;
