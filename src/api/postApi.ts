import axiosClient from "./axiosClient";

const url = "/posts";

const postApi = {
  getAllPost: () => {
    return axiosClient.get(url);
  },
  createPost: (post: any) => {
    return axiosClient.post(url, {
      ...post,
    });
  },
  getAllPostByCompany: (id: any) => {
    return axiosClient.get(`${url}/company/${id}`);
  },
};
export default postApi;
