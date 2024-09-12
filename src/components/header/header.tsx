import { Box, Typography, Button, Avatar } from "@mui/material";
import LogoImg from "../../assets/images/logo.png";

type HeaderProps = {
  title: string;
};

const HeaderComp = ({ title }: HeaderProps) => {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      width={"100%"}
      sx={{ background: "#fff", pt: 2, pb: 2, borderRadius: 2 }}
    >
      <Box display={"flex"} justifyContent={"flex-start"}>
        <Typography pl={2}>{title}</Typography>
      </Box>
      <Box display={"flex"} justifyContent={"flex-end"} alignItems={"center"}>
        <Button variant="outlined" sx={{ mr: 2 }}>
          Join Class
        </Button>
        <Avatar alt="Remy Sharp" src={LogoImg} sx={{ mr: 2 }} />
      </Box>
    </Box>
  );
};

export default HeaderComp;
