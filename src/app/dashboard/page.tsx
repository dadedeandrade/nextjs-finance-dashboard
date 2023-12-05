"use server";
import React from "react";
import DashboardContent from "./DashboardContent";
import { promises as fs } from "fs";

async function Dashboard() {
  const file = await fs.readFile(
    process.cwd() + "/src/app/transactions.json",
    "utf8"
  );
  const data = JSON.parse(file);

  return (
    <>
      <DashboardContent data={data} />
    </>
  );
}

export default Dashboard;
