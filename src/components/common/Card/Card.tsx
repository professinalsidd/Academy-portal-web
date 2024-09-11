import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { ReactNode } from "react";
import { SxProps, Theme } from "@mui/material/styles";

type CardType = {
  children: ReactNode;
  sx?: SxProps<Theme>;
};

function CardComp({ children, sx }: CardType) {
  return (
    <Card sx={{ minWidth: 275, ...sx }}>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export default CardComp;
