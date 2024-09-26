import React, { useEffect, useState } from "react";
import WrapperComp from "../../../components/common/Wrapper";
import { Box, Button } from "@mui/material";
import CardComp from "../../../components/common/Card/Card";
import TableComp from "../../../components/common/Table/Table";
import { useSelector } from "react-redux";
import { AllStudentPaymentAPI } from "../../../services/apis/payments";
import { paymentsTableColumns, paymentStatusData } from "../../../db";
import InputComp from "../../../components/common/Input/Input";
import DropdownComp from "../../../components/common/Dropdown/Dropdown";

const PaymentsScreen = () => {
  const store = useSelector((state: any) => state.auth.login.data);
  const [showAllStudentPayments, setShowAllStudentsPayments] = useState<any>(
    []
  );
  const [amount, setAmount] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [paidDate, setPaid] = useState("");

  const submitHandler = async () => {
    console.log("check", amount, paymentStatus, paidDate);
  };

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
        <Box
          sx={{
            background: "#fff",
            p: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 1,
          }}
        >
          <InputComp
            label="Amount"
            tooltipContent="Amount"
            type="text"
            sx={{ flex: 1 }}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <InputComp
            tooltipContent="Payment Date"
            type="date"
            sx={{ flex: 1 }}
            value={paidDate}
            onChange={(e) => setPaid(e.target.value)}
          />
          <DropdownComp
            label="Payment Status"
            sx={{ width: "20%" }}
            data={paymentStatusData}
            onChange={setPaymentStatus}
            value={paymentStatus}
          />
          <Button variant="outlined" onClick={submitHandler}>
            Add Payment
          </Button>
        </Box>
        <CardComp fullCard sx={{ mt: 2 }}>
          <TableComp data={formattedData} columns={paymentsTableColumns} />
        </CardComp>
      </Box>
    </WrapperComp>
  );
};

export default PaymentsScreen;
