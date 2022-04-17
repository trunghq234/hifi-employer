import axiosClient from "./axiosClient";

const suggestionApi = {
  getAllJobCategories: async () => {
    const {
      data: { data },
    } = await axiosClient.get("/suggestion/categories");
    console.log("Categories: ", data);
    return data;
  },
};
export default suggestionApi;
