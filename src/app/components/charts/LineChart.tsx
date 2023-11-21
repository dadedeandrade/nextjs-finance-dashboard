import React from "react";
import { Line } from "react-chartjs-2";

interface Props {
  chartData: any;
  chartOptions?: any;
}
function LineChart({ chartData }: Props) {
  return <Line data={chartData} />;
}

export default LineChart;
