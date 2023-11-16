"use client";
import React from "react";
import { Box, Container, Grid, Stack } from "@mui/material";
import GoogleSignInButton from "./authButtons";
import { Savings, SavingsOutlined } from "@mui/icons-material";

function SignInPage() {
  return (
    <Grid>
      <Container>
        <SavingsOutlined />
        <GoogleSignInButton />
      </Container>
    </Grid>
  );
}

export default SignInPage;
