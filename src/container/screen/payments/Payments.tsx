import React from "react";
import WrapperComp from "../../../components/common/Wrapper";
import { Box } from "@mui/material";
import CardComp from "../../../components/common/Card/Card";
import TableComp from "../../../components/common/Table/Table";

const PaymentsScreen = () => {
  return (
    <WrapperComp title="Payment">
      <Box mt={2}>
        <CardComp>
          <TableComp />
        </CardComp>
      </Box>
    </WrapperComp>
  );
};

export default PaymentsScreen;
