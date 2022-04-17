import axiosClient from "./axiosClient";

const postApi = {
  getAllPost: () => {
    return axiosClient.get("/employer/posts");
  },
  createPost: (post: any) => {
    return axiosClient.post("/employer/posts", {
      ...post,
    });
  },
};
export default postApi;
