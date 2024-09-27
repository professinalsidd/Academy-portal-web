import Axios from "../../base";

export const AllStudentResultsAPI = async (token: string) => {
  try {
    const response = await Axios.get("/results/amin-results", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const uploadResultsAPI = async (
  token: string,
  payload: { marks: string; subject: string; grade: any; studentId: any }
) => {
  try {
    const response = await Axios.post("/results/admin-create", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const studentResultsAPI = async (token: string, studentId: string) => {
  try {
    const response = await Axios.get(`/results/student-result/${studentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
