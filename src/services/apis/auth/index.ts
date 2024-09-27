import Axios from "../../base";

export const signUpAPI = async (payload: {
  organizationName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  classJoinTime: string;
  gender: string;
  role: string;
  address: string;
  password: string;
  confirmPassword: string;
}) => {
  try {
    const response = await Axios.post("/users/signup", payload);
    return response;
  } catch (error) {
    throw error;
  }
};

export const loginAPI = async (payload: {
  email: string;
  password: string;
}) => {
  try {
    const response = await Axios.post("/users/login", payload);
    return response;
  } catch (error) {
    throw error;
  }
};
