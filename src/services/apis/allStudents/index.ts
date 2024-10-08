import Axios from "../../base";

export const AllStudentsAPI = async (token: string) => {
  try {
    const response = await Axios.get("/users/admin/all-students", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const AllAdminStateAPI = async (token: string) => {
  try {
    const response = await Axios.get("users/admin-states", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
