import { Box, Typography, IconButton, Drawer, Button } from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LogoImg from "../../assets/images/white-logo.png";
import { SideBarListItem } from "../../db";
import useResponsive from "../../themes/themes";
import { useNavigate } from "react-router-dom";

type SideBarProps = {
  barSelected: (index: number) => void;
};

function SideBar({ barSelected }: SideBarProps) {
  const { isDesktop, isMobile, isTablet } = useResponsive();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = (index: number) => {
    if (index === 5) {
      navigate("/login");
    }
    setSelected(index);
    barSelected(index);
    if (isMobile || isTablet) {
      setMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      {isMobile || isTablet ? (
        <Box
          sx={{
            display: "flex",
            position: "absolute",
            top: 10,
            right: 10,
            left: 10,
            backgroundColor: "#fff",
            borderRadius: 2,
            justifyContent: "space-between",
            alignItems: "center",
            flex: 1,
          }}
        >
          <IconButton onClick={toggleMenu}>
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <Typography mr={2} ml={2}>
            Dashboard
          </Typography>
          <Button>Join Class</Button>
        </Box>
      ) : null}

      {(isDesktop || menuOpen) && (
        <Drawer
          variant={isDesktop ? "permanent" : "temporary"}
          open={menuOpen}
          onClose={toggleMenu}
          sx={{
            width: isDesktop ? "20%" : "60%",
            "& .MuiDrawer-paper": {
              width: isDesktop ? "20%" : "60%",
              boxSizing: "border-box",
            },
          }}
        >
          <Box sx={{ width: "100%", height: "100vh", background: "#fff" }}>
            {isMobile || isTablet ? (
              <IconButton
                onClick={toggleMenu}
                sx={{ position: "absolute", top: 10, right: 10 }}
              >
                <CloseIcon />
              </IconButton>
            ) : null}

            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              mt={2}
            >
              <img
                src={LogoImg}
                alt="logo"
                style={{ width: "80%", objectFit: "contain", borderRadius: 99 }}
              />
            </Box>
            <Box sx={{ background: "#fff" }}>
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
                    mx: 2,
                    borderRadius: 2,
                    cursor: "pointer",
                    gap: 2,
                  }}
                >
                  <Typography sx={{ width: "10%", textAlign: "center" }}>
                    <i className={item.icon}></i>
                  </Typography>
                  <Typography sx={{ flex: 1 }}>{item.label}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Drawer>
      )}
    </>
  );
}

export default SideBar;
