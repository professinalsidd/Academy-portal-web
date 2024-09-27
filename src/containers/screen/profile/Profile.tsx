import React, { useEffect, useState } from "react";
import WrapperComp from "../../../components/common/Wrapper";
import Box from "@mui/material/Box";
import { Card, Typography } from "@mui/material";
import InputComp from "../../../components/common/Input/Input";
import EditProfileScreen from "../editProfile/EditProfile";
import { useSelector } from "react-redux";
import { profileAPI } from "../../../services/apis/profile";
import { format } from "date-fns";

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
        <Card
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              width: "100%",
            }}
          >
            <Typography
              onClick={handleOpen}
              variant="caption"
              sx={{ color: "#4379F2" }}
            >
              <i className="fa-solid fa-pen-to-square"> Edit Profile</i>
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <InputComp
              label={profileData.organizationName}
              disabled
              tooltipContent="Organization Name"
              type="text"
              defaultValue={profileData.organizationName}
            />
            <InputComp
              label={profileData.email}
              disabled
              tooltipContent="Email Address"
              type="email"
            />
            <InputComp
              label={profileData.phone}
              disabled
              tooltipContent="Phone Number"
              type="number"
            />
            <InputComp
              label={formatDate(profileData?.dateOfBirth || null)}
              disabled
              tooltipContent="Date of birth"
              type="text"
            />
            {store.user.role !== "Admin" && (
              <InputComp
                label={profileData.classJoinTime}
                disabled
                tooltipContent="Class Time"
                type="text"
              />
            )}
            <InputComp
              label={profileData.role}
              disabled
              tooltipContent="Select Role"
              type="text"
            />
            <InputComp
              label={profileData.gender}
              disabled
              tooltipContent="Gender"
              type="text"
            />
            <InputComp
              label={profileData.address}
              disabled
              tooltipContent="Address"
              type="text"
              multiline
            />
          </Box>
        </Card>
      </Box>
      <EditProfileScreen handleClose={handleClose} open={open} />
    </WrapperComp>
  );
};

export default ProfileScreen;
