import React from "react";
import WrapperComp from "../../../components/common/Wrapper";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Avatar, Button, Card, Container, Typography } from "@mui/material";
import LogoImg from "../../../assets/images/logo.png";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Label } from "@mui/icons-material";

const ProfileScreen = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
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
            <TextField
              label="FullName"
              id="outlined-start-adornment"
              sx={{ m: 1 }}
            />
            <TextField
              label="Email Address"
              id="outlined-start-adornment"
              sx={{ m: 1 }}
            />
            <TextField
              label="Phone Number"
              id="outlined-start-adornment"
              sx={{ m: 1 }}
            />
            <TextField
              //   label="Date of Birth"
              id=""
              sx={{ m: 1 }}
              type="date"
            />
            <TextField
              //   label="Date of Birth"
              id=""
              sx={{ m: 1 }}
              type="time"
            />
            <TextField
              label="Gender"
              id="outlined-start-adornment"
              sx={{ m: 1 }}
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
            <FormControl sx={{ m: 1 }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
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
