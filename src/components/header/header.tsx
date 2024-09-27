import { Box, Typography, Button, Avatar } from "@mui/material";
import LogoImg from "../../assets/images/logo.png";
import { useSelector } from "react-redux";
import { joinStudentClassesAPI } from "../../services/apis/classes";

type HeaderProps = {
  title: string;
};

const HeaderComp = ({ title }: HeaderProps) => {
  const store = useSelector((state: any) => state.auth.login.data);

  const submitHandler = async () => {
    try {
      const payload = {
        studentId: store.user.studentId,
        classLink: "https://meet.google.com/dwu-iuqz-sbr",
      };
      const response = await joinStudentClassesAPI(store.token, payload);
      console.log("response", response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      width={"100%"}
      sx={{ background: "#fff", pt: 2, pb: 2, borderRadius: 2 }}
    >
      <Box display={"flex"} justifyContent={"flex-start"}>
        <Typography pl={2}>{title}</Typography>
      </Box>
      <Box display={"flex"} justifyContent={"flex-end"} alignItems={"center"}>
        {store.user.role !== "Admin" && (
          <Button variant="outlined" sx={{ mr: 2 }} onClick={submitHandler}>
            Join Class
          </Button>
        )}
        <Avatar alt="Remy Sharp" src={LogoImg} sx={{ mr: 2 }} />
      </Box>
    </Box>
  );
};

export default HeaderComp;
