import { Box, Typography } from "@mui/material";
import WrapperComp from "../../../components/common/Wrapper";
import StackBarsComp from "../../../components/common/Bars/StackBarsComp";
import TableComp from "../../../components/common/Table/Table";
import useResponsive from "../../../themes/themes";
import { dashBoardCardData } from "../../../db";
import CardComp from "../../../components/common/Card/Card";
import PieChartComp from "../../../components/common/Pie";

const DashboardScreen = () => {
  const { isDesktop, isMobile, isTablet } = useResponsive();
  return (
    <WrapperComp title="Welcome Back NextGen Coder Program Academy">
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          gap: 2,
          flex: 1,
        }}
      >
        {dashBoardCardData.map((item) => (
          <CardComp
            key={item.label}
            sx={{
              mt: 2,
              flex: 1,
              display: "flex",
            }}
          >
            <Box
              sx={{
                background: item.bg,
                width: 50,
                height: 50,
                borderRadius: 99,
                flex: 1,
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
            <Box>
              <Typography
                mt={2}
                fontSize={isMobile ? 14 : isTablet ? 16 : 18}
                textTransform={"uppercase"}
              >
                {item.label}
              </Typography>
            </Box>
          </CardComp>
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
        <CardComp>
          <StackBarsComp />
        </CardComp>
        <CardComp>
          <TableComp />
        </CardComp>
      </Box>
    </WrapperComp>
  );
};

export default DashboardScreen;
