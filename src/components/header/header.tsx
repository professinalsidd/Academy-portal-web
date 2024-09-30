import { useEffect, useState } from "react";
import { Box, Typography, Button, Avatar } from "@mui/material";
import LogoImg from "../../assets/images/logo.png";
import { useSelector } from "react-redux";
import { joinStudentClassesAPI } from "../../services/apis/classes";

type HeaderProps = {
  title: string;
};

const HeaderComp = ({ title }: HeaderProps) => {
  const store = useSelector((state: any) => state.auth.login.data);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const studentId = store.user.studentId;
    const lastJoinTime = localStorage.getItem(`lastJoinTime_${studentId}`);

    if (lastJoinTime) {
      const currentTime = new Date().getTime();
      const timeDifference = currentTime - parseInt(lastJoinTime);
      const hoursPassed = timeDifference / (1000 * 60 * 60);

      if (hoursPassed < 24) {
        setIsDisabled(true);
        setTimeLeft(24 - hoursPassed); // Set the remaining time in hours
      } else {
        setIsDisabled(false);
        setTimeLeft(null);
      }
    }
  }, [store.user.studentId]); // Re-run the effect if the studentId changes

  const submitHandler = async () => {
    try {
      const studentId = store.user.studentId;
      const payload = {
        studentId,
        classLink: "https://meet.google.com/dwu-iuqz-sbr",
      };
      const response = await joinStudentClassesAPI(store.token, payload);
      console.log("response", response.data);
      window.open(payload.classLink, "_blank");

      // Save the current timestamp to localStorage, with the studentId as part of the key
      localStorage.setItem(
        `lastJoinTime_${studentId}`,
        new Date().getTime().toString()
      );
      setIsDisabled(true);
      setTimeLeft(24); // Reset timeLeft to 24 hours
    } catch (error) {
      console.log("error", error);
    }
  };

  // Function to format the time left in hours and minutes
  const formatTimeLeft = (time: number) => {
    const hours = Math.floor(time);
    const minutes = Math.floor((time - hours) * 60);
    return `${hours}h ${minutes}m`;
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
          <>
            <Button
              variant="outlined"
              sx={{ mr: 2 }}
              onClick={submitHandler}
              disabled={isDisabled}
            >
              Join Class
            </Button>
            {isDisabled && timeLeft && (
              <Typography sx={{ mr: 2 }}>
                You can join again in {formatTimeLeft(timeLeft)}.
              </Typography>
            )}
          </>
        )}
        <Avatar alt="Remy Sharp" src={LogoImg} sx={{ mr: 2 }} />
      </Box>
    </Box>
  );
};

export default HeaderComp;
