"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

import DashboardContent from "./DashboardContent";
import {
  CategoryScale,
  LinearScale,
  Chart as ChartJS,
} from "chart.js/auto";
import Loading from "./loading";

ChartJS.register(CategoryScale, LinearScale);

function Dashboard() {
  const session = useSession();

  if (session.status == "unauthenticated") {
    redirect("/");
  }

  return (
    <>
      {session.status == "loading" ? <Loading></Loading> : <DashboardContent />}
    </>
  );
}

export default Dashboard;
