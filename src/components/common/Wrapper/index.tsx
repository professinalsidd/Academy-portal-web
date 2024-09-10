import { Box } from "@mui/material";
import React, { ReactNode } from "react";
import HeaderComp from "../../header/header";

type WrapperCompProps = {
  children: ReactNode;
  title: string;
};

const WrapperComp = ({ children, title }: WrapperCompProps) => {
  return (
    <Box>
      <HeaderComp title={title} />
      {children}
    </Box>
  );
};

export default WrapperComp;
