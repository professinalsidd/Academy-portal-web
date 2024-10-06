import { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { joinStudentClassesAPI } from "../../services/apis/classes";
import { COLORS } from "../../themes/colors";
import { LAYOUT } from "../../themes/layout";
import { stylesHeader } from ".";
import { toast } from "react-toastify";

type HeaderProps = {
  title: string;
  AllFetchData?: any;
};

const HeaderComp = ({ title }: HeaderProps) => {
  const store = useSelector((state: any) => state?.auth?.login?.data);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [alreadyJoined, setAlreadyJoined] = useState(false);

  const parseTime = (timeString: string) => {
    const [time, modifier] = timeString.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier === "PM" && hours < 12) hours += 12;
    return { hours, minutes };
  };

  useEffect(() => {
    const studentId = store?.user?.studentId;
    const lastJoinTime = localStorage.getItem(`lastJoinTime_${studentId}`);

    if (lastJoinTime) {
      const currentTime = new Date().getTime();
      const timeDifference = currentTime - parseInt(lastJoinTime);
      const hoursPassed = timeDifference / (1000 * 60 * 60);

      // Check if less than 24 hours have passed since the last join
      if (hoursPassed < 24) {
        setIsDisabled(true);
        setTimeLeft(24 - hoursPassed); // Set the remaining time in hours
        setAlreadyJoined(true); // Flag that user has already joined
      }
    }
  }, [store?.user?.studentId]);

  const submitHandler = async () => {
    try {
      const studentId = store.user.studentId;
      const { hours: startHours, minutes: startMinutes } = parseTime(
        store.user.classJoinTime.split(" to ")[0]
      );
      const { hours: endHours, minutes: endMinutes } = parseTime(
        store.user.classJoinTime.split(" to ")[1]
      );

      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();

      const isInClassTime =
        currentHours >= startHours &&
        currentMinutes >= startMinutes &&
        (currentHours < endHours ||
          (currentHours === endHours && currentMinutes <= endMinutes));

      if (!isInClassTime) {
        toast.warn("You can only join during the scheduled class time.");
        return;
      }

      if (!alreadyJoined) {
        const payload = {
          studentId,
          classLink: "https://meet.google.com/dwu-iuqz-sbr",
        };
        await joinStudentClassesAPI(store.token, payload);
        window.open(payload.classLink, "_blank");

        // Store the current time as the last join time
        localStorage.setItem(
          `lastJoinTime_${studentId}`,
          new Date().getTime().toString()
        );

        setIsDisabled(true);
        setTimeLeft(16);
        setAlreadyJoined(true);
      } else {
        window.open("https://meet.google.com/dwu-iuqz-sbr", "_blank");
      }
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
          <Typography textTransform={"uppercase"}>{name}</Typography>
          <Typography className="fullName" sx={stylesHeader.circleBox}>
            {store?.user?.organizationName}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default HeaderComp;
