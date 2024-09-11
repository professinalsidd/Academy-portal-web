import { Box } from "@mui/material";
import React, { ReactNode } from "react";
import HeaderComp from "../../header/header";
import useResponsive from "../../../themes/themes";

type WrapperCompProps = {
  children: ReactNode;
  title: string;
};

const WrapperComp = ({ children, title }: WrapperCompProps) => {
  const { isDesktop } = useResponsive();
  return (
    <Box>
      {isDesktop && <HeaderComp title={title} />}
      {children}
    </Box>
  );
};

export default WrapperComp;
