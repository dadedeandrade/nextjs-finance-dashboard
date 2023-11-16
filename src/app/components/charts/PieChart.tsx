import React from "react";
import { Pie } from "react-chartjs-2";

interface Props {
  chartData: any;
  chartOptions?: any;
}
function PieChart({ chartData }: Props) {
  return <Pie data={chartData} />;
}

export default PieChart;
