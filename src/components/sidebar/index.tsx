import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import LogoImg from "../../assets/images/white-logo.png";
import useResponsive from "../../themes/themes";
import { SideBarListItem } from "../../db";

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
        {SideBarListItem.map((item, index) => (
          <Box
            key={index}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            onClick={() => handleClick(index)}
            sx={{
              background: index === selected ? "#D2E0FB" : "#fff",
              p: 2,
              mr: 2,
              ml: 2,
              borderRadius: 2,
              cursor: "pointer",
              gap: 2,
            }}
          >
            <Typography sx={{ width: "10%", textAlign: "center" }}>
              <i className={item.icon}></i>
            </Typography>
            <Typography sx={{ display: "flex", flex: 1 }}>
              {item.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default SideBar;
