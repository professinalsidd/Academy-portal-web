import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { ReactNode } from "react";
import { SxProps, Theme } from "@mui/material/styles";
import useResponsive from "../../../themes/themes";
import { Box, Typography } from "@mui/material";
import { COLORS } from "../../../themes/colors";
import { styleCard } from ".";
import { LAYOUT } from "../../../themes/layout";

type CardType = {
  children?: ReactNode;
  sx?: SxProps<Theme>;
  fullCard?: boolean;
  icon?: string;
  count?: string | number;
  title?: string;
  iconColor?: string;
};

function CardComp({
  children,
  sx,
  fullCard,
  icon,
  count,
  title,
  iconColor,
}: CardType) {
  const { isMobile, isTablet } = useResponsive();
  return fullCard ? (
    <Card sx={{ ...sx }}>
      <CardContent>{children}</CardContent>
    </Card>
  ) : (
    <Box sx={styleCard.root}>
      <Box sx={[styleCard.subRoot, LAYOUT.flexCenter]}>
        <Typography color={COLORS.BLACK}>
          <i style={{ color: iconColor }} className={`fa-solid ${icon}`}></i>
        </Typography>
      </Box>
      <Box sx={[LAYOUT.flexRowBetween]} flex={1} mt={1}>
        <Typography
          fontSize={isMobile ? 12 : isTablet ? 16 : 16}
          textTransform={"uppercase"}
          sx={[LAYOUT.flexCenter]}
        >
          {title}
        </Typography>
        {count && (
          <Typography
            sx={[styleCard.count, LAYOUT.flexCenter]}
            fontSize={16}
            color="gray"
          >
            {count}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default CardComp;
