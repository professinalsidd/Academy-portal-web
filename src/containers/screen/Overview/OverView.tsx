import React from "react";
import { Box } from "@mui/material";
import WrapperComp from "../../../components/common/Wrapper";
import CardComp from "../../../components/common/Card/Card";
import LineChartComp from "../../../components/common/Line/Line";
import PieChartComp from "../../../components/common/Pie";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import ScatterChartComp from "../../../components/common/Scatter";
import useResponsive from "../../../themes/themes";
import TableComp from "../../../components/common/Table/Table";

const Overview: React.FC = ({}) => {
  const { isDesktop, isMobile, isTablet } = useResponsive();
  const settings = {
    width: isMobile ? 250 : isTablet ? 400 : 400,
    height: 200,
    value: 60,
  };
  return (
    <WrapperComp title="OverView">
      <Box
        display={"flex"}
        gap={2}
        mt={2}
        flexDirection={isDesktop ? "row" : "column"}
      >
        <CardComp>
          <PieChartComp />
        </CardComp>
        <CardComp>
          <Gauge
            {...settings}
            cornerRadius="50%"
            sx={(theme) => ({
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 40,
              },
              [`& .${gaugeClasses.valueArc}`]: {
                fill: "#52b202",
              },
              [`& .${gaugeClasses.referenceArc}`]: {
                fill: theme.palette.text.disabled,
              },
            })}
          />
        </CardComp>
        <CardComp>
          <PieChartComp />
        </CardComp>
      </Box>
      <Box
        display={"flex"}
        gap={1}
        mt={2}
        flexDirection={isDesktop ? "row" : "column"}
      >
        <CardComp>
          <ScatterChartComp />
        </CardComp>
        <CardComp>
          <LineChartComp />
        </CardComp>
      </Box>
      <Box mt={2}>
        <CardComp>
          <TableComp />
        </CardComp>
      </Box>
    </WrapperComp>
  );
};

export default Overview;
