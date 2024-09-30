import { Box } from "@mui/material";
import React, { ReactNode } from "react";
import HeaderComp from "../../header/header";
import useResponsive from "../../../themes/themes";

type WrapperCompProps = {
  children: ReactNode;
  title: string;
  AllFetchData?: any;
};

const WrapperComp = ({ children, title, AllFetchData }: WrapperCompProps) => {
  const { isDesktop } = useResponsive();
  return (
    <Box>
      {isDesktop && <HeaderComp AllFetchData={AllFetchData} title={title} />}
      {children}
    </Box>
  );
};

export default WrapperComp;
