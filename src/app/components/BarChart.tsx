import React from "react";
import { Bar } from "react-chartjs-2";

interface Props {
  chartData: any;
  chartOptions?: any;
}
function BarChart({ chartData }: Props) {
  return <Bar data={chartData} />;
}

export default BarChart;
