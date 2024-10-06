import SearchOffIcon from "@mui/icons-material/SearchOff";
import { Box, Typography } from "@mui/material";

const WarnComp = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={5}
    >
      <SearchOffIcon sx={{ fontSize: 60 }} color="disabled" />
      <Typography variant="h6" color="textSecondary">
        No Data Found
      </Typography>
    </Box>
  );
};

export default WarnComp;
