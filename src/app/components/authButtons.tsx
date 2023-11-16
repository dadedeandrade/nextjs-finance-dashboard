"use client";

import { Button, Container, IconButton, Stack } from "@mui/material";
import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { signIn } from "next-auth/react";
import styled from "styled-components";

export default function GoogleSignInButton() {
  const handleClick = () => {
    signIn("google");
  };

  return (
    <Button
      startIcon={<GoogleIcon color="success" fontSize="large" />}
      aria-label="login with google"
      onClick={handleClick}
    >
      <h3 style={{ color: "#A9E5BB" }}>Sign in with google</h3>
    </Button>
  );
}
