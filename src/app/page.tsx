"use client";
import { Button } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";


import {
  CategoryScale,
  LinearScale,
  Chart as ChartJS,
  BarElement,
} from "chart.js/auto";

ChartJS.register(CategoryScale, LinearScale);


const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #bf4f74;
`;

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

export default function Home() {
  const testData = [
    { id: 1, year: 2016, userGain: 80000, userLost: 823 },
    { id: 2, year: 2017, userGain: 180000, userLost: 8223 },
  ];

  const [userData, setUserData] = useState({
    labels: testData.map((data) => data.year),
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
    ],
  });

  return (
    <>
      <Wrapper>
        <Title>Hello World!</Title>
      </Wrapper>
      <Button> Teste</Button>
      <div style={{ width: 700 }}>
        <BarChart chartData={userData}></BarChart>
      </div>
      <div style={{ width: 700 }}>
        <PieChart chartData={userData} />
      </div>
    </>
  );
}
