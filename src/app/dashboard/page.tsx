"use client";
import {
  AppBar,
  Avatar,
  Box,
  CircularProgress,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useState } from "react";

import DashboardContent from "./DashboardContent";
import {
  CategoryScale,
  LinearScale,
  Chart as ChartJS,
  BarElement,
} from "chart.js/auto";

ChartJS.register(CategoryScale, LinearScale);

function Dashboard() {
  const session = useSession();

  if (session.status == "unauthenticated") {
    redirect("/");
  }

  return (
    <>
      {session.status == "loading" ? (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: "100vh" }}
        >
          <Grid item xs={3} sx={{ borderRadius: "5px" }} padding={2}>
            <CircularProgress size={"large"} />
          </Grid>
        </Grid>
      ) : (
        <DashboardContent />
      )}
    </>
  );
}

export default Dashboard;
