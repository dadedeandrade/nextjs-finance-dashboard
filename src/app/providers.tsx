"use client";

import { SessionProvider } from "next-auth/react";
import { createTheme, colors, ThemeProvider } from "@mui/material";

type Props = {
  children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export const ThemeProviderMUI = ({ children }: Props) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#0a150f",
      },
      secondary: {
        main: colors.orange[500],
      },
      background: {
        default: "#f8faf7",
      },
    },
    status: {
      primary: "#e53e3e",
    },

    components: {
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: "#F8FAF7",
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            color: "#F8FAF7",
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          primary: {
            color: "#F8FAF7",
          },
          secondary: {
            color: "#F8FAF7",
          },
        },
      },
    },
  });
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
