import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { ReactNode } from "react";
import { SxProps, Theme } from "@mui/material/styles";
import useResponsive from "../../../themes/themes";
import { Box, Typography } from "@mui/material";
import { COLORS } from "../../../themes/colors";

type CardType = {
  children?: ReactNode;
  sx?: SxProps<Theme>;
  fullCard?: boolean;
  icon?: string;
  count?: string | number;
  title?: string;
};

function CardComp({ children, sx, fullCard, icon, count, title }: CardType) {
  const { isMobile, isTablet } = useResponsive();
  return fullCard ? (
    <Card sx={{ minWidth: 275, ...sx }}>
      <CardContent>{children}</CardContent>
    </Card>
  ) : (
    <Box
      sx={{
        minWidth: 155,
        mt: 2,
        flex: 1,
        transition: "background-color 0.3s ease",
        "&:hover": {
          cursor: "pointer",
        },
        padding: 2,
        backgroundColor: "#f5f5f5",
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          background: COLORS.LIGHT_BLUE,
          width: 50,
          height: 50,
          borderRadius: 99,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 20,
          color: COLORS.WHITE,
        }}
      >
        <Typography color={COLORS.BLACK}>
          <i className={`fa-solid ${icon}`}></i>
        </Typography>
      </Box>
      <Box
        display={"flex"}
        flex={1}
        justifyContent={"space-between"}
        alignContent={"center"}
        mt={1}
      >
        <Typography
          fontSize={isMobile ? 14 : isTablet ? 16 : 18}
          textTransform={"uppercase"}
        >
          {title}
        </Typography>
        <Typography fontSize={16} color="gray">
          {count}
        </Typography>
      </Box>
    </Box>
  );
}

export default CardComp;
