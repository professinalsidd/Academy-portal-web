import React, { useEffect, useState } from "react";
import WrapperComp from "../../../components/common/Wrapper";
import Box from "@mui/material/Box";
import { Card, Typography } from "@mui/material";
import EditProfileScreen from "../editProfile/EditProfile";
import { useSelector } from "react-redux";
import { profileAPI } from "../../../services/apis/profile";
import { format } from "date-fns";
import InputFormComp from "../../../components/common/InputForm/InputForm";
import { LAYOUT } from "../../../themes/layout";
import { COLORS } from "../../../themes/colors";

const ProfileScreen = () => {
  const store = useSelector((state: any) => state.auth.login.data);
  const [profileData, setProfileData] = useState<any>([]);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchData = async () => {
    try {
      const response = await profileAPI(store.token);
      setProfileData(response.data.user);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd-MM-yyyy");
  };

  return (
    <WrapperComp title="Profile">
      <Box mt={2}>
        <Card sx={[LAYOUT.flexColumJCenter, { p: 2 }]}>
          <Box sx={[LAYOUT.flexEndCenter, { width: "100%" }]}>
            <Typography
              onClick={handleOpen}
              variant="caption"
              sx={{ color: COLORS.BLACK, cursor: "pointer" }}
            >
              <i className="fa-solid fa-pen-to-square"> Edit Profile</i>
            </Typography>
          </Box>
          <Box sx={[LAYOUT.flexColumn, { width: "100%" }]}>
            <InputFormComp
              label="Organization Name"
              readOnly
              value={profileData.organizationName}
            />
            <InputFormComp
              label="Email Address"
              readOnly
              value={profileData.email}
            />
            <InputFormComp
              label="Phone Number"
              readOnly
              value={profileData.phone}
            />
            <InputFormComp
              label="Date of Birth"
              readOnly
              value={formatDate(profileData?.dateOfBirth || null)}
            />
            {store.user.role !== "Admin" && (
              <InputFormComp
                label="Class Joined Time"
                readOnly
                value={profileData.classJoinTime}
              />
            )}
            <InputFormComp label="Role" readOnly value={profileData.role} />
            <InputFormComp label="Gender" readOnly value={profileData.gender} />
            <InputFormComp
              label="Address"
              readOnly
              value={profileData.address}
            />
          </Box>
        </Card>
      </Box>
      <EditProfileScreen handleClose={handleClose} open={open} />
    </WrapperComp>
  );
};

export default ProfileScreen;
