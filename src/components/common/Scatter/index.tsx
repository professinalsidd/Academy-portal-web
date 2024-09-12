import React from "react";
import { ScatterChart } from "@mui/x-charts/ScatterChart";
import { scatterChartData } from "../../../db";
import useResponsive from "../../../themes/themes";

const ScatterChartComp = () => {
  const { isDesktop, isMobile, isTablet } = useResponsive();
  return (
    <ScatterChart
      width={isMobile ? 250 : isTablet ? 400 : 560}
      height={300}
      series={[
        {
          label: "Series A",
          data: scatterChartData.map((v) => ({
            x: v.x1,
            y: v.y1,
            id: v.id,
          })),
        },
        {
          label: "Series B",
          data: scatterChartData.map((v) => ({
            x: v.x1,
            y: v.y2,
            id: v.id,
          })),
        },
      ]}
    />
  );
};

export default ScatterChartComp;
