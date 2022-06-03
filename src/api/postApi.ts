import axiosClient from "./axiosClient";

const url = "employer/posts";

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
    return axiosClient.get(`${url}/${id}`);
  },
};
export default postApi;
