import axios from "axios";
const baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
const validationApi = {
  checkEmail: async (email: string) => {
    const {
      data: { data },
    } = await axios.get(baseURL + "/check-employer-or-jobseeker" + `?email=${email}`);
    return data;
  },
};
export default validationApi;
