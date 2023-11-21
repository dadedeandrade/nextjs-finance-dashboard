import * as Mui from "@mui/material";
import Head from "next/head";
import OverviewExpenses from "../components/cards/OverviewExpenses";
import OverviewRevenue from "../components/cards/OverviewRevenue";
import LineChart from "../components/charts/LineChart";
import BarChart from "../components/charts/BarChart";
import { useState } from "react";
import { OverviewBalance } from "../components/cards/OverviewBalance";
import { OverviewPendingTransactions } from "../components/cards/OverviewPendingTransactions";

function DashboardContent(props: any) {
  const testData = [
    { month: 'Jan', userGain: 80000, userLost: 823 },
    { month: 'Fev', userGain: 180000, userLost: 8223 },
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

  return (
    <Mui.Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 6,
      }}
    >
      <Mui.Container maxWidth="xl">
        <Mui.Grid container spacing={3}>
          <Mui.Grid item xs={12} sm={6} lg={3}>
            <OverviewExpenses
              difference={12}
              positive
              sx={{ height: "100%" }}
            />
          </Mui.Grid>
          <Mui.Grid item xs={12} sm={6} lg={3}>
            <OverviewRevenue difference={12} positive sx={{ height: "100%" }} />
          </Mui.Grid>
          <Mui.Grid item xs={12} sm={6} lg={3}>
            <OverviewBalance sx={{ height: "100%" }} />
          </Mui.Grid>
          <Mui.Grid item xs={12} sm={6} lg={3}>
            <OverviewPendingTransactions sx={{ height: "100%" }} />
          </Mui.Grid>

          <Mui.Grid item xs={12} lg={8} sx={{ width: 700 }}>
            <BarChart chartData={userData}></BarChart>
          </Mui.Grid>
          <Mui.Grid item xs={12} md={6} lg={4} sx={{ width: 700 }}>
            <LineChart chartData={userData} />
          </Mui.Grid>
        </Mui.Grid>
      </Mui.Container>
    </Mui.Box>
  );
}

export default DashboardContent;
