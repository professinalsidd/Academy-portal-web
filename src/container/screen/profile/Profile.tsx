import React from "react";
import WrapperComp from "../../../components/common/Wrapper";
import Box from "@mui/material/Box";
import { Avatar, Button, Card, Typography } from "@mui/material";
import LogoImg from "../../../assets/images/logo.png";
import InputComp from "../../../components/common/Input/Input";
import EditProfileScreen from "../editProfile/EditProfile";

const ProfileScreen = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <WrapperComp title="My Profile">
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
            <Avatar
              alt="Remy Sharp"
              src={LogoImg}
              sx={{ width: "10%", height: "10%", objectFit: "contain" }}
            />
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
              label="FullName"
              disabled
              tooltipContent="FullName"
              type="text"
            />
            <InputComp
              label="Email Address"
              disabled
              tooltipContent="Email Address"
              type="email"
            />
            <InputComp
              label="Phone Number"
              disabled
              tooltipContent="Phone Number"
              type="number"
            />
            <InputComp
              label=""
              disabled
              tooltipContent="Date of birth"
              type="date"
            />
            <InputComp
              label=""
              disabled
              tooltipContent="Class Time"
              type="time"
            />
            <InputComp
              label="Gender"
              disabled
              tooltipContent="Gender"
              type="text"
            />
            <InputComp
              label="Address"
              disabled
              tooltipContent="Address"
              type="text"
              multiline
            />
          </Box>
          <Button sx={{}} variant="outlined">
            Submit
          </Button>
        </Card>
      </Box>
      <EditProfileScreen handleClose={handleClose} open={open} />
    </WrapperComp>
  );
};

export default ProfileScreen;
