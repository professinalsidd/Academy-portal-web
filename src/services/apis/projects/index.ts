import Axios from "../../base";

export const AllStudentProjectsAPI = async (token: string) => {
  try {
    const response = await Axios.get("/projects/allProjects", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
