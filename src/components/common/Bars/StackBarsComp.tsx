import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { addLabels, balanceSheet } from "./index";
import useResponsive from "../../../themes/themes";

function StackBarsComp() {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  return (
    <BarChart
      dataset={balanceSheet}
      series={addLabels([
        { dataKey: "currAss", stack: "assets" },
        { dataKey: "nCurrAss", stack: "assets" },
        { dataKey: "curLia", stack: "liability" },
        { dataKey: "nCurLia", stack: "liability" },
        { dataKey: "capStock", stack: "equity" },
        { dataKey: "retEarn", stack: "equity" },
        { dataKey: "treas", stack: "equity" },
      ])}
      xAxis={[{ scaleType: "band", dataKey: "year" }]}
      slotProps={{ legend: { hidden: true } }}
      width={isMobile ? 250 : isTablet ? 400 : 500}
      height={339}
    />
  );
}

export default StackBarsComp;
