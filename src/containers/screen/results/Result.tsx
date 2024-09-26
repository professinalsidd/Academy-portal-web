import { Box, Typography } from "@mui/material";
import React from "react";
import CardComp from "../../../components/common/Card/Card";
import TableComp from "../../../components/common/Table/Table";
import WrapperComp from "../../../components/common/Wrapper";
import { dashBoardCardData } from "../../../db";
import useResponsive from "../../../themes/themes";

const ResultScreen = () => {
  const { isDesktop, isMobile, isTablet } = useResponsive();
  return (
    <WrapperComp title="Results">
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          gap: 2,
        }}
      >
        {dashBoardCardData.map((item) => (
          <Box
            key={item.label}
            sx={{
              background: "#fff",
              height: 200,
              width: isMobile ? "30%" : isTablet ? "40%" : "60",
              borderRadius: 2,
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              mt: 2,
              flex: 1,
            }}
          >
            <Box
              sx={{
                background: item.bg,
                width: 50,
                height: 50,
                borderRadius: 99,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bg: "#fff",
                fontSize: 20,
                color: item.color,
              }}
            >
              <Typography>
                <i className={item.icon}></i>
              </Typography>
            </Box>
            <Typography
              mt={2}
              textAlign={"center"}
              fontSize={isMobile ? 14 : isTablet ? 16 : 18}
              textTransform={"uppercase"}
            >
              {item.label}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        flexDirection={isDesktop ? "row" : "column"}
        gap={2}
        mt={2}
      >
        <CardComp sx={{ width: "100%" }}>{/* <TableComp /> */}</CardComp>
      </Box>
    </WrapperComp>
  );
};

export default ResultScreen;
