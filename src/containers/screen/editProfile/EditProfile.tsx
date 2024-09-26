import React from "react";
import ModalComp from "../../../components/common/Modal/Modal";
import { Avatar, Box, Button, Card, Typography } from "@mui/material";
import InputComp from "../../../components/common/Input/Input";
import LogoImg from "../../../assets/images/logo.png";
import DropdownComp from "../../../components/common/Dropdown/Dropdown";
import { genderData } from "../../../db";

type EditProfileType = {
  handleClose: () => void;
  open: boolean;
};

const EditProfileScreen = ({ handleClose, open }: EditProfileType) => {
  return (
    <ModalComp handleClose={handleClose} open={open}>
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
              variant="h6"
              sx={{ color: "#4379F2", cursor: "pointer" }}
            >
              Edit Profile
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <InputComp tooltipContent="update-image" type="file" />
            <InputComp label="Organization Name" tooltipContent="Organization Name" type="text" />
            <InputComp
              label="Email Address"
              tooltipContent="Email Address"
              type="email"
            />
            <InputComp
              label="Phone Number"
              tooltipContent="Phone Number"
              type="number"
            />
            <InputComp label="" tooltipContent="Date of birth" type="date" />
            <InputComp label="" tooltipContent="Class Time" type="time" />
            <DropdownComp label="Gender" data={genderData} />
            <InputComp
              label="Address"
              tooltipContent="Address"
              type="text"
              multiline
            />
          </Box>
          <Box display={"flex"} gap={2} mt={2} alignItems={"center"}>
            <Button sx={{}} variant="outlined">
              Submit
            </Button>
            <Button sx={{}} onClick={handleClose} variant="outlined">
              Close
            </Button>
          </Box>
        </Card>
      </Box>
    </ModalComp>
  );
};

export default EditProfileScreen;
