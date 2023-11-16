"use client";
import { CircularProgress, Grid } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

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
        <>
          <h1>Hello, Dashboard Page!</h1>
          <button onClick={() => signOut({ callbackUrl: "/" })}>
            Sign out
          </button>{" "}
        </>
      )}
    </>
  );
}

export default Dashboard;
