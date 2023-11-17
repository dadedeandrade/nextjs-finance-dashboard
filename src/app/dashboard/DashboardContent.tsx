import * as Mui from "@mui/material";
import Head from "next/head";
import OverviewExpenses from "../components/cards/OverviewExpenses";
import OverviewRevenue from "../components/cards/OverviewRevenue";
import PieChart from "../components/charts/PieChart";
import BarChart from "../components/charts/BarChart";
import { useState } from "react";
import { OverviewBalance } from "../components/cards/OverviewBalance";

function DashboardContent(props: any) {
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
      <Head>
        <title>Overview | Devias Kit</title>
      </Head>

      <Mui.Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 6,
        }}
      >
        <Mui.Container maxWidth="xl">
          <Mui.Grid container spacing={3}>
            <Mui.Grid xs={12} sm={6} lg={3}>
              <OverviewExpenses
                difference={12}
                positive
                sx={{ height: "100%" }}
              />
            </Mui.Grid>
            <Mui.Grid xs={12} sm={6} lg={3}>
              <OverviewRevenue
                difference={12}
                positive
                sx={{ height: "100%" }}
              />
            </Mui.Grid>
            <Mui.Grid xs={12} sm={6} lg={3}>
              <OverviewBalance />
            </Mui.Grid>
            <Mui.Grid xs={12} sm={6} lg={3}>
              <OverviewRevenue
                difference={12}
                positive
                sx={{ height: "100%" }}
              />
            </Mui.Grid>

            <Mui.Grid xs={12} lg={8} sx={{ width: 700 }}>
              <BarChart chartData={userData}></BarChart>
            </Mui.Grid>
            <Mui.Grid xs={12} md={6} lg={4} sx={{ width: 700 }}>
              <PieChart chartData={userData} />
            </Mui.Grid>
          </Mui.Grid>
        </Mui.Container>
      </Mui.Box>
    </>
  );
}

export default DashboardContent;
