import axiosClient from "./axiosClient";

const applicationApi = {
  getAllByPost: (id: any) => {
    const url = `/applications/posts/${id}`;
    return axiosClient.get(url);
  },
  updateStatus: (id: string, status: string) => {
    const url = `/applications/${id}`;
    return axiosClient.patch(url, { status: status });
  },
};
export default applicationApi;
