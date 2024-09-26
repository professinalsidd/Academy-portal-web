import Axios from "../../base";

export const AllStudentPaymentAPI = async (token: string) => {
  try {
    const response = await Axios.get("/payments/allPaymentView", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
