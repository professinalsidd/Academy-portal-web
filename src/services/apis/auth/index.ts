import Axios from "../../base";

export const signUpAPI = async (payload: any) => {
  try {
    const response = await Axios.post("/users/signup", payload);
    return response;
  } catch (error) {
    throw error;
  }
};

export const loginAPI = async (
  token: string,
  payload: {
    email: string;
    password: string;
  }
) => {
  try {
    const response = await Axios.post("/users/login", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
