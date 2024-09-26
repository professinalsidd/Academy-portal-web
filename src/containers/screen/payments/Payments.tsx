import React, { useEffect, useState } from "react";
import WrapperComp from "../../../components/common/Wrapper";
import { Box, Button, Typography } from "@mui/material";
import CardComp from "../../../components/common/Card/Card";
import TableComp from "../../../components/common/Table/Table";
import { useSelector } from "react-redux";
import {
  addStudentPaymentAPI,
  AllStudentPaymentAPI,
} from "../../../services/apis/payments";
import { paymentsTableColumns, paymentStatusData } from "../../../db";
import InputComp from "../../../components/common/Input/Input";
import DropdownComp from "../../../components/common/Dropdown/Dropdown";
import { AllStudentsAPI } from "../../../services/apis/allStudents";
import { COLORS } from "../../../themes/colors";

const PaymentsScreen = () => {
  const store = useSelector((state: any) => state.auth.login.data);
  const [showAllStudentPayments, setShowAllStudentsPayments] = useState<any>(
    []
  );
  const [amount, setAmount] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [paidDate, setPaid] = useState("");
  const [students, setStudents] = useState<any>([]);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const submitHandler = async () => {
    const payload = {
      amount: amount,
      status: paymentStatus,
      paymentDate: paidDate,
      studentId: selectedStudent?.studentId,
    };
    try {
      const response = await addStudentPaymentAPI(store?.token, payload);
      alert(response.data.message);
      setSelectedStudent(null);
    } catch (error) {
      console.log("error", error);
    }
  };

  const AllFetchData = async () => {
    try {
      const allPayments = await AllStudentPaymentAPI(store?.token);
      const allStudents = await AllStudentsAPI(store?.token);
      setShowAllStudentsPayments(allPayments?.data);
      setStudents(allStudents.data.students);
    } catch (error) {
      console.log("error", error);
    }
  };

  const formattedData = showAllStudentPayments.map((payment: any) => ({
    studentId: payment.studentId,
    student: payment.student.email,
    amount: payment.amount,
    status: payment.status,
    paymentDate: new Date(payment.paymentDate).toLocaleDateString(),
  }));

  const handleStudentChange = (e: { target: { value: any } }) => {
    const studentId = e.target.value;
    setSelectedStudentId(studentId);
    const student = students.find((s: { _id: any }) => s._id === studentId);
    setSelectedStudent(student);
  };

  useEffect(() => {
    AllFetchData();
  }, []);

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
          <select
            value={selectedStudentId}
            onChange={handleStudentChange}
            style={{
              width: "30%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              marginRight: "8px",
              height: "50px",
            }}
          >
            <option value="">Select Student</option>
            {students.map((student: any) => (
              <option key={student._id} value={student._id}>
                {student.organizationName}
              </option>
            ))}
          </select>

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
        {selectedStudent && (
          <Box
            sx={{
              background: COLORS.WHITE,
              display: "flex",
              alignItems: "center",
              mt: 1,
              p: 2,
              borderRadius: 1,
              justifyContent: "space-between",
            }}
          >
            <Typography> Name:- {selectedStudent.organizationName} </Typography>
            <Typography> Email:- {selectedStudent.email} </Typography>
            <Typography> Phone:- {selectedStudent.phone} </Typography>
            <Typography> StudentId:- {selectedStudent.studentId} </Typography>
          </Box>
        )}
        <CardComp fullCard sx={{ mt: 2 }}>
          <TableComp data={formattedData} columns={paymentsTableColumns} />
        </CardComp>
      </Box>
    </WrapperComp>
  );
};

export default PaymentsScreen;
