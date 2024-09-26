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
