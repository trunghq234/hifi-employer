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
    return axiosClient.get(`${url}/company/${id}`);
  },

  getPosts: async (query: String = "") => {
    return await axiosClient.get(`${url}${query}`);
  },
  updatePost: async (postId: string, data: any) => {
    return await axiosClient.put(`${url}/${postId}`, data);
  },

  getById: async (id: any) => {
    return await axiosClient.get(`${url}/${id}`);
  },
  approvePost: async (id: any, isApproved: Boolean) => {
    return await axiosClient.patch(`${url}/${id}`, { isApproved });
  },
  getPostsPending: async () => {
    return await axiosClient.get(`${url}/pending`);
  },
  getPostsApproved: async () => {
    return await axiosClient.get(`${url}/approved`);
  },
  deletePost: async (id: any) => {
    return await axiosClient.delete(`${url}/${id}`);
  },
  getFilterOption: async () => {
    return await axiosClient.get(`${url}/filter-option`);
  },
};
export default postApi;
