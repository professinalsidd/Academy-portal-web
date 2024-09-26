import { Box, Typography } from "@mui/material";
import WrapperComp from "../../../components/common/Wrapper";
import StackBarsComp from "../../../components/common/Bars/StackBarsComp";
import TableComp from "../../../components/common/Table/Table";
import useResponsive from "../../../themes/themes";
import { dashBoardCardData } from "../../../db";
import CardComp from "../../../components/common/Card/Card";

const DashboardScreen = () => {
  const { isDesktop, isMobile, isTablet } = useResponsive();
  return (
    <WrapperComp title="Welcome Back NextGen Coder Program Academy">
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          gap: 1,
        }}
      >
        {dashBoardCardData.map((item) => (
          <CardComp
            key={item.label}
            sx={{
              mt: 2,
              flex: 1,
              transition: "background-color 0.3s ease",
              "&:hover": {
                backgroundColor: `${item.bg}33`,
                cursor: "pointer",
              },
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
            <Box mt={1}>
              <Typography fontSize={14} color="gray">
                {`Completed: ${item.completion}%`}
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
