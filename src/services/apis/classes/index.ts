import Axios from "../../base";

export const AllStudentClassesAPI = async (token: string) => {
  try {
    const response = await Axios.get("/classes/adminData", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
