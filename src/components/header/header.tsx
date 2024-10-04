import { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { joinStudentClassesAPI } from "../../services/apis/classes";
import { COLORS } from "../../themes/colors";
import { LAYOUT } from "../../themes/layout";
import { stylesHeader } from ".";

type HeaderProps = {
  title: string;
  AllFetchData?: any;
};

const HeaderComp = ({ title }: HeaderProps) => {
  const store = useSelector((state: any) => state?.auth?.login?.data);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const studentId = store?.user?.studentId;
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
  }, [store?.user?.studentId]); // Re-run the effect if the studentId changes

  const submitHandler = async () => {
    try {
      const studentId = store.user.studentId;
      const payload = {
        studentId,
        classLink: "https://meet.google.com/dwu-iuqz-sbr",
      };
      await joinStudentClassesAPI(store.token, payload);
      window.open(payload.classLink, "_blank");
      localStorage.setItem(
        `lastJoinTime_${studentId}`,
        new Date().getTime().toString()
      );
      setIsDisabled(true);
      setTimeLeft(24);
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

  const name = store?.user?.organizationName[0]
    ? store?.user?.organizationName[0]
    : "A";
  return (
    <Box
      width={"100%"}
      sx={[
        LAYOUT.flexRowBetween,
        { background: COLORS.WHITE, pt: 2, pb: 2, borderRadius: 2 },
      ]}
    >
      <Box display={"flex"} justifyContent={"flex-start"}>
        <Typography pl={2}>{title}</Typography>
      </Box>
      <Box sx={[LAYOUT.flexEndCenter]}>
        {store?.user?.role !== "Admin" && (
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
        <Box sx={[stylesHeader.circleCtn, LAYOUT.flexCenter]}>
          <Typography>{name}</Typography>
          <Typography className="fullName" sx={stylesHeader.circleBox}>
            {store?.user?.organizationName}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default HeaderComp;
