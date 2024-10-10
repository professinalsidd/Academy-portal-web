import React, { useEffect, useState } from "react";
import WrapperComp from "../../../components/common/Wrapper";
import { Box, Button, Typography } from "@mui/material";
import CardComp from "../../../components/common/Card/Card";
import TableComp from "../../../components/common/Table/Table";
import { useSelector } from "react-redux";
import {
  addStudentPaymentAPI,
  AllStudentPaymentAPI,
  StudentPaymentAPI,
} from "../../../services/apis/payments";
import {
  paymentsTableColumnsForAdmin,
  paymentsTableColumnsForStudents,
  paymentStatusData,
} from "../../../db";
import InputComp from "../../../components/common/Input/Input";
import DropdownComp from "../../../components/common/Dropdown/Dropdown";
import { AllStudentsAPI } from "../../../services/apis/allStudents";
import { COLORS } from "../../../themes/colors";
import { toast } from "react-toastify";
import LoadingComp from "../../../components/common/loading/Loading";
import { LAYOUT } from "../../../themes/layout";
import useResponsive from "../../../themes/themes";

const PaymentsScreen = () => {
  const { isDesktop } = useResponsive();
  const store = useSelector((state: any) => state.auth.login.data);
  const [loading, setLoading] = useState(false);
  const [showAllStudentPayments, setShowAllStudentsPayments] = useState<any>(
    []
  );
  const [amount, setAmount] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [paidDate, setPaid] = useState("");
  const [students, setStudents] = useState<any>([]);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [studentData, setStudentData] = useState<any>([]);

  const submitHandler = async () => {
    setLoading(true);
    const payload = {
      amount: amount,
      status: paymentStatus,
      paymentDate: paidDate,
      studentId: selectedStudent?.studentId,
    };
    try {
      const response = await addStudentPaymentAPI(store?.token, payload);
      setLoading(false);
      toast.success(response.data.message);
      setSelectedStudent(null);
      setAmount("");
      setPaid("");
      setPaymentStatus("");
      AllFetchData();
    } catch (error: any) {
      setLoading(false);
      console.log("error", error);
      toast.error("error", error.response.data.message);
    }
  };

  const AllFetchData = async () => {
    setLoading(true);
    try {
      if (store.user.role === "Admin") {
        const allPayments = await AllStudentPaymentAPI(store?.token);
        const allStudents = await AllStudentsAPI(store?.token);
        setLoading(false);
        setShowAllStudentsPayments(allPayments?.data.reverse());
        setStudents(allStudents.data.students.reverse());
      } else {
        const studentData = await StudentPaymentAPI(
          store?.token,
          store?.user?.studentId
        );
        setLoading(false);
        setStudentData(studentData?.data.reverse());
      }
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };

  const formattedData = showAllStudentPayments.map((payment: any) => ({
    studentId: payment?.studentId,
    student: payment?.student?.email,
    amount: payment?.amount,
    status: payment?.status,
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
      {loading ? (
        <LoadingComp loading={loading} setLoading={setLoading} />
      ) : (
        <>
          <Box mt={isDesktop ? 2 : 8}>
            {store.user.role === "Admin" && (
              <Box
                sx={[
                  LAYOUT.flexCCenter,
                  {
                    background: COLORS.WHITE,
                    p: 1,
                    borderRadius: 1,
                  },
                ]}
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
                  sx={{ flex: 1 }}
                  data={paymentStatusData}
                  onChange={setPaymentStatus}
                  value={paymentStatus}
                />
                <Button variant="outlined" onClick={submitHandler}>
                  Add Payment
                </Button>
              </Box>
            )}
            {selectedStudent && (
              <Box
                sx={[
                  LAYOUT.flexRowBetween,
                  {
                    background: COLORS.WHITE,
                    mt: 1,
                    p: 2,
                    borderRadius: 1,
                  },
                ]}
              >
                <Typography>
                  {" "}
                  Name:- {selectedStudent.organizationName}{" "}
                </Typography>
                <Typography> Email:- {selectedStudent.email} </Typography>
                <Typography> Phone:- {selectedStudent.phone} </Typography>
                <Typography>
                  {" "}
                  StudentId:- {selectedStudent.studentId}{" "}
                </Typography>
              </Box>
            )}
            <CardComp fullCard sx={{ mt: 2 }}>
              <TableComp
                title={
                  store.user.role === "Admin"
                    ? "All Students Payment List"
                    : "Payment List"
                }
                data={store.user.role === "Admin" ? formattedData : studentData}
                columns={
                  store.user.role === "Admin"
                    ? paymentsTableColumnsForAdmin
                    : paymentsTableColumnsForStudents
                }
              />
            </CardComp>
          </Box>
        </>
      )}
    </WrapperComp>
  );
};

export default PaymentsScreen;
