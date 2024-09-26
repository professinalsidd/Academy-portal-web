import Axios from "../../base";

export const genderAPI = async () => {
  try {
    const response = await Axios.get("/users/gender");
    return response;
  } catch (error) {
    throw error;
  }
};

export const roleAPI = async () => {
  try {
    const response = await Axios.get("/users/role");
    return response;
  } catch (error) {
    throw error;
  }
};
