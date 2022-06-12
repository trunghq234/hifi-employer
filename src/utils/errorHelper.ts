import axios from "axios";

const errorHelper = {
  handleAxiosError: (error: any) => {
    let message = "";
    if (axios.isAxiosError(error)) {
      message = error?.response?.data.message;
    } else {
      message = error.message;
    }

    return message;
  },
};

export default errorHelper;
