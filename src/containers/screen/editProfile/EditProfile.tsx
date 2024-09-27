import React, { useState } from "react";
import ModalComp from "../../../components/common/Modal/Modal";
import { Box, Button, Card, Typography } from "@mui/material";
import InputComp from "../../../components/common/Input/Input";
import { useSelector } from "react-redux";
import { updateProfileAPI } from "../../../services/apis/profile";

type EditProfileType = {
  handleClose: () => void;
  open: boolean;
};

const EditProfileScreen = ({ handleClose, open }: EditProfileType) => {
  const store = useSelector((state: any) => state.auth.login.data);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const submitHandler = async () => {
    try {
      const payload = {
        phone: phone,
        address: address,
        organizationName: name,
      };
      const response = await updateProfileAPI(
        store.token,
        store.user.organizationId,
        payload
      );
      alert("Updated Profile");
      setAddress("");
      setName("");
      setPhone("");
      handleClose();
    } catch (error) {}
  };

  return (
    <ModalComp handleClose={handleClose} open={open}>
      <Box
        mt={2}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flex={1}
      >
        <Card
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <Typography textAlign={"center"}>Edit Profile</Typography>
            <InputComp
              label="Organization Name"
              tooltipContent="Organization Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <InputComp
              label="Phone Number"
              tooltipContent="Phone Number"
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <InputComp
              label="Address"
              tooltipContent="Address"
              type="text"
              multiline
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Box>
          <Box display={"flex"} gap={2} mt={2} alignItems={"center"}>
            <Button sx={{}} variant="outlined" onClick={submitHandler}>
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
