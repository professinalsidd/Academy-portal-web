import React, { useEffect, useState } from "react";
import WrapperComp from "../../../components/common/Wrapper";
import { Box } from "@mui/material";
import CardComp from "../../../components/common/Card/Card";
import TableComp from "../../../components/common/Table/Table";
import { useSelector } from "react-redux";
import { AllStudentPaymentAPI } from "../../../services/apis/payments";
import { paymentsTableColumns } from "../../../db";

const PaymentsScreen = () => {
  const store = useSelector((state: any) => state.auth.login.data);
  const [showAllStudentPayments, setShowAllStudentsPayments] = useState<any>(
    []
  );

  const AllFetchData = async () => {
    try {
      const allPayments = await AllStudentPaymentAPI(store?.token);
      setShowAllStudentsPayments(allPayments?.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    AllFetchData();
  }, []);

  const formattedData = showAllStudentPayments.map((payment: any) => ({
    studentId: payment.studentId,
    student: payment.student.email,
    amount: payment.amount,
    dueDate: new Date(payment.dueDate).toLocaleDateString(),
    status: payment.status,
    paymentDate: new Date(payment.paymentData).toLocaleDateString(),
  }));

  return (
    <WrapperComp title="Payment">
      <Box mt={2}>
        <CardComp fullCard>
          <TableComp data={formattedData} columns={paymentsTableColumns} />
        </CardComp>
      </Box>
    </WrapperComp>
  );
};

export default PaymentsScreen;
