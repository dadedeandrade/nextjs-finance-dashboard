"use client";
import React from "react";
import { Grid } from "@mui/material";
import GoogleSignInButton from "./authButtons";

function SignInPage() {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", backgroundColor: "#0A150F" }}
    >
      <Grid
        item
        xs={3}
        sx={{ backgroundColor: "#1F332B", borderRadius: "5px" }}
        padding={2}
      >
        <GoogleSignInButton />
      </Grid>
    </Grid>
  );
}

export default SignInPage;
