import React, { useState } from "react";
import { Bar } from "react-chartjs-2";

function BarChart() {
  const testData = [
    { month: "Jan", userGain: 80000, userLost: 823 },
    { month: "Fev", userGain: 180000, userLost: 8223 },
  ];
  const [userData, setUserData] = useState({
    labels: testData.map((data) => data.month),
    datasets: [
      {
        label: "Users Gained",
        data: testData.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
      {
        label: "Users Lost",
        data: testData.map((data) => data.userLost),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  return <Bar data={userData} />;
}

export default BarChart;
