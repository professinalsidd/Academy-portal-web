import React from "react";
import WrapperComp from "../../../components/common/Wrapper";
import Box from "@mui/material/Box";
import { Avatar, Button, Card, Typography } from "@mui/material";
import LogoImg from "../../../assets/images/logo.png";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputComp from "../../../components/common/Input/Input";

const ProfileScreen = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

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
            <Typography variant="caption" sx={{ color: "#4379F2" }}>
              <i className="fa-solid fa-pen-to-square"> Edit Profile</i>
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <InputComp label="FullName" tooltipContent="FullName" type="text" />
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
            <InputComp label="Gender" tooltipContent="Gender" type="text" />
            <InputComp
              label="Address"
              tooltipContent="Address"
              type="text"
              multiline
            />
            {/* <FormControl>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl> */}
          </Box>
          <Button sx={{}} variant="outlined">
            Submit
          </Button>
        </Card>
      </Box>
    </WrapperComp>
  );
};

export default ProfileScreen;
