import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import LogoImg from "../../assets/images/t-logo.png";
import useResponsive from "../../themes/themes";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

const listItem = [
  { label: "Dashboard", icon: <HomeIcon /> },
  { label: "My Profile", icon: <PersonIcon /> },
  { label: "My Data", icon: <InsertDriveFileIcon /> },
];

type SideBarProps = {
  barSelected: any;
};

function SideBar({ barSelected }: SideBarProps) {
  const { isDesktop, isMobile, isTablet } = useResponsive();
  const [selected, setSelected] = useState(0);

  const handleClick = (index: React.SetStateAction<number>) => {
    setSelected(index);
    barSelected(index);
  };

  return (
    <Box sx={{ width: "20%", height: "100vh", background: "#fff" }}>
      <Box display={"flex"} alignItems={"center"} mt={2}>
        <img
          src={LogoImg}
          alt="logo"
          style={{ width: "15%", objectFit: "contain" }}
        />
        <Typography>NextGen Coders Program</Typography>
      </Box>
      <Box
        sx={{
          background: "#fff",
        }}
      >
        {listItem.map((item, index) => (
          <Box
            key={index}
            display={"flex"}
            alignItems={"center"}
            onClick={() => handleClick(index)}
            sx={{
              background: index === selected ? "#D2E0FB" : "#fff",
              p: 2,
              m: 2,
              borderRadius: 2,
              cursor: "pointer",
            }}
          >
            {item.icon}
            <Typography sx={{ ml: 2 }}>{item.label}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default SideBar;
