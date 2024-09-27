import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CardComp from "../../../components/common/Card/Card";
import TableComp from "../../../components/common/Table/Table";
import WrapperComp from "../../../components/common/Wrapper";
import { dashBoardCardData } from "../../../db";
import useResponsive from "../../../themes/themes";
import { useSelector } from "react-redux";
import { AllStudentsAPI } from "../../../services/apis/allStudents";
import InputComp from "../../../components/common/Input/Input";
import { COLORS } from "../../../themes/colors";
import {
  AllStudentResultsAPI,
  uploadResultsAPI,
} from "../../../services/apis/results";

const ResultScreen = () => {
  const { isDesktop, isMobile, isTablet } = useResponsive();
  const store = useSelector((state: any) => state.auth.login.data);
  const [marks, setMarks] = useState("");
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState<any>([]);
  const [students, setStudents] = useState<any>([]);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [allResultsData, setAllResultsData] = useState([]);

  const AllFetchData = async () => {
    try {
      const allStudents = await AllStudentsAPI(store?.token);
      const allResults = await AllStudentResultsAPI(store.token);
      setStudents(allStudents.data.students);
      setAllResultsData(allResults.data.results);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleStudentChange = (e: { target: { value: any } }) => {
    const studentId = e.target.value;
    setSelectedStudentId(studentId);
    const student = students.find((s: { _id: any }) => s._id === studentId);
    setSelectedStudent(student);
  };

  useEffect(() => {
    AllFetchData();
  }, []);

  const submitHandler = async () => {
    const payload = {
      marks: marks,
      subject: subject,
      grade: grade,
      studentId: selectedStudent?.studentId,
    };
    try {
      const response = await uploadResultsAPI(store?.token, payload);
      alert(response.data.message);
      setSelectedStudent(null);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <WrapperComp title="Results">
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          gap: 2,
        }}
      >
        {dashBoardCardData.map((item) => (
          <Box
            key={item.label}
            sx={{
              background: "#fff",
              height: 200,
              width: isMobile ? "30%" : isTablet ? "40%" : "60",
              borderRadius: 2,
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              mt: 2,
              flex: 1,
            }}
          >
            <Box
              sx={{
                background: item.bg,
                width: 50,
                height: 50,
                borderRadius: 99,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bg: "#fff",
                fontSize: 20,
                color: item.color,
              }}
            >
              <Typography>
                <i className={item.icon}></i>
              </Typography>
            </Box>
            <Typography
              mt={2}
              textAlign={"center"}
              fontSize={isMobile ? 14 : isTablet ? 16 : 18}
              textTransform={"uppercase"}
            >
              {item.label}
            </Typography>
          </Box>
        ))}
      </Box>
      {store.user.role === "Admin" && (
        <Box
          sx={{
            background: "#fff",
            p: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 1,
            mt: 2,
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
            label="Marks"
            tooltipContent="Marks"
            type="text"
            sx={{ flex: 1 }}
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
          />
          <InputComp
            label="Subject"
            tooltipContent="Subject"
            type="text"
            sx={{ flex: 1 }}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <InputComp
            label="Grade"
            tooltipContent="Grade"
            type="text"
            sx={{ flex: 1 }}
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
          <Button variant="outlined" onClick={submitHandler}>
            Submit
          </Button>
        </Box>
      )}
      {selectedStudent && (
        <Box
          sx={{
            background: COLORS.WHITE,
            display: "flex",
            alignItems: "center",
            mt: 2,
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
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        flexDirection={isDesktop ? "row" : "column"}
        gap={2}
        mt={2}
      >
        <CardComp sx={{ width: "100%" }} fullCard>
          <TableComp
            data={allResultsData}
            title="All Students Result list"
            columns={["grade", "marks", "subject", "createdAt"]}
          />
        </CardComp>
      </Box>
    </WrapperComp>
  );
};

export default ResultScreen;
