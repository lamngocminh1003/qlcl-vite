import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const PieChartComponentGlobal = (props) => {
  const { data, title, height, width } = props;
  return (
    <span>
      <PieChart
        series={[
          {
            data,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: {
              innerRadius: 30,
              additionalRadius: -30,
              color: "gray",
            },
          },
        ]}
        height={height || 100} // Smaller height
        width={width || 450} //
      />
      <div className="text-center ">{title}</div>
    </span>
  );
};

export default PieChartComponentGlobal;
