import { Box, Typography, Button, Avatar } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import LogoImg from "../../assets/images/logo.png";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useState } from "react";

type HeaderProps = {
  title: string;
};

const HeaderComp = ({ title }: HeaderProps) => {
  const [selectedIcon, setSelectedIcons] = useState(false);

  const handleSubmit = () => {
    setSelectedIcons(!selectedIcon);
  };

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      width={"100%"}
      sx={{ background: "#fff", pt: 2, pb: 2, pr: 1, borderRadius: 2 }}
    >
      <Box display={"flex"} justifyContent={"flex-start"}>
        <Typography pl={2}>{title}</Typography>
      </Box>
      <Box display={"flex"} justifyContent={"flex-end"} alignItems={"center"}>
        <Button variant="outlined" sx={{ mr: 2 }}>
          Join Class
        </Button>
        <Avatar alt="Remy Sharp" src={LogoImg} />
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          onClick={handleSubmit}
          sx={{ ml: 2, cursor: "pointer" }}
        >
          {selectedIcon ? (
            <WbSunnyIcon sx={{ mr: 2 }} />
          ) : (
            <DarkModeIcon sx={{ mr: 2 }} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default HeaderComp;
