import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import LogoImg from "../../assets/images/white-logo.png";
import useResponsive from "../../themes/themes";

const listItem = [
  { label: "Dashboard", icon: <i className="fa-solid fa-house"></i> },
  { label: "My Profile", icon: <i className="fa-solid fa-user"></i> },
  { label: "Projects", icon: <i className="fa-solid fa-file"></i> },
  { label: "My Overview", icon: <i className="fa-solid fa-chart-simple"></i> },
  { label: "Learning Language", icon: <i className="fa-solid fa-code"></i> },
  {
    label: "Results",
    icon: <i className="fa-solid fa-square-poll-vertical"></i>,
  },
  { label: "Payment", icon: <i className="fa-solid fa-indian-rupee-sign"></i> },
  { label: "Logout", icon: <i className="fa-solid fa-right-from-bracket"></i> },
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
    <Box sx={{ width: "30%", height: "100vh", background: "#fff" }}>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        mt={2}
      >
        <img
          src={LogoImg}
          alt="logo"
          style={{ width: "100%", objectFit: "contain", borderRadius: 99 }}
        />
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
              mr: 2,
              ml: 2,
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
