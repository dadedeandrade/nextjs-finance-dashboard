'use client';

import { IconButton } from "@mui/material";
import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { signIn } from "next-auth/react";

export default function GoogleSignInButton() {
  const handleClick = () => {
    signIn("google");
  };

  return (
    <IconButton aria-label="login with google" onClick={handleClick}>
      <GoogleIcon color="primary" />
    </IconButton>
  );
}
