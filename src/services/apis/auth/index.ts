import Axios from "../../base";

export const signUpAPI = async (payload: {
  organizationName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  gender: string;
  role: string;
  address: string;
  password: string;
  confirmPassword: string;
}) => {
  try {
    const response = await Axios.post("/signup", payload);
    return response;
  } catch (error) {
    throw error;
  }
};
