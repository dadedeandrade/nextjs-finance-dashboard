import * as Mui from "@mui/material";
import Head from "next/head";
import OverviewExpenses from "../components/cards/OverviewExpenses";

function DashboardContent(props: any) {
  return (
    <>
      <Head>
        <title>Overview | Devias Kit</title>
      </Head>
      <Mui.Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Mui.Container maxWidth="xl">
          <Mui.Grid container spacing={3}>
            <Mui.Grid xs={12} sm={6} lg={3}>
              <OverviewExpenses
                difference={12}
                positive
                sx={{ height: "100%" }}
                value="$24k"
              />
            </Mui.Grid>
            <Mui.Grid xs={12} sm={6} lg={3}>
             Receipt
            </Mui.Grid>
            <Mui.Grid xs={12} sm={6} lg={3}>
              Pending Transactions
            </Mui.Grid>
            <Mui.Grid xs={12} sm={6} lg={3}>
              total balance
            </Mui.Grid>
          </Mui.Grid>
        </Mui.Container>
      </Mui.Box>
    </>
  );
}

export default DashboardContent;
