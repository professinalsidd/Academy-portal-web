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

export const uploadProjectsAPI = async (
  token: string,
  payload: { projectName: string; githubLink: string }
) => {
  try {
    const response = await Axios.post("/projects/uploadProject", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const studentProjectsAPI = async (token: string) => {
  try {
    const response = await Axios.get(`/projects/myProjects`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
