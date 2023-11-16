import { ThemeOptions } from "@mui/material";
import React from "react";

declare module "@mui/material/styles" {
  interface ThemeOptions {
    status: {
      primary: React.CSSProperties["color"];
    };
  }
}
