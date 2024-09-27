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

export const joinStudentClassesAPI = async (
  token: string,
  payload: { studentId: any; classLink: string }
) => {
  try {
    const response = await Axios.post("/classes/joinClass", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
