"use client";
import OverviewExpenses from "../components/cards/OverviewExpenses";
import OverviewRevenue from "../components/cards/OverviewRevenue";
import LineChart from "../components/charts/LineChart";
import BarChart from "../components/charts/BarChart";
import { useState } from "react";
import { OverviewBalance } from "../components/cards/OverviewBalance";
import { OverviewPendingTransactions } from "../components/cards/OverviewPendingTransactions";
import { Box, Container, Grid } from "@mui/material";
import ActiveFilters from "../components/ActiveFilters";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Loading from "./loading";
import { CategoryScale, LinearScale, Chart as ChartJS } from "chart.js/auto";
import { setTransactions } from "../store/transactionsSlice";
import { useAppDispatch } from "../store/store";

ChartJS.register(CategoryScale, LinearScale);

type Props = {
  data: any;
};

function DashboardContent({ data }: Props) {
  const session = useSession();

  if (session.status == "unauthenticated") {
    redirect("/");
  }

  const dispatch = useAppDispatch();
  dispatch(setTransactions(data));

  return (
    <>
      {session.status == "loading" ? (
        <Loading></Loading>
      ) : (
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 6,
          }}
        >
          <Container maxWidth="xl">
            <ActiveFilters />

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} lg={3}>
                <OverviewExpenses sx={{ height: "100%" }} />
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <OverviewRevenue sx={{ height: "100%" }} />
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <OverviewBalance sx={{ height: "100%" }} />
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <OverviewPendingTransactions sx={{ height: "100%" }} />
              </Grid>

              <Grid item xs={12} lg={6} sx={{ width: 700 }}>
                <BarChart year={2023} />
                <BarChart year={2022} />
                <BarChart year={2021} />
              </Grid>
              <Grid item xs={12} lg={6} sx={{ width: 700 }}>
                <LineChart year={2023} />
                <LineChart year={2022} />
                <LineChart year={2021} />
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}
    </>
  );
}

export default DashboardContent;
