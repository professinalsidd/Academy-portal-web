import Axios from "../../base";

export const profileAPI = async (token: string) => {
  try {
    const response = await Axios.get("/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateProfileAPI = async (
  token: string,
  id: string,
  payload: { phone: string; address: string; organizationName: string }
) => {
  try {
    const response = await Axios.put(`/users/${id}/update`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
