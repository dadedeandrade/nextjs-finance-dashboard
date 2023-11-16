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
import HomeIcon from "@mui/icons-material/Home";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardContent from "./DashboardContent";

function Dashboard() {
  /*
"date": Data da transação no formato EPOCH em milissegundos;
"amount": Valor da transação em string, sem separador de decimais: A string "5565" representa uma transação de 55,65;
"transaction_type": Representa se a transação foi uma receita (deposit) ou despesa (withdraw);
"currency": Moeda da transação;
"account": Empresa de origem ou destino da transação;
"industry": Categoria de Indústria à qual a Empresa da transação pertence;
"state": Estado onde a Empresa da transação está incorporada.
*/
  const session = useSession();

  if (session.status == "unauthenticated") {
    redirect("/");
  }
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setIsDrawerOpen(open);
    };

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
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="primary">
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={toggleDrawer(true)}
                >
                  <MenuOpenIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Finances
                </Typography>

                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  <LogoutIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
          </Box>
          <Drawer
            anchor={"left"}
            open={isDrawerOpen}
            onClose={toggleDrawer(false)}
          >
            <Stack
              sx={{
                bgcolor: "#080808",
                color: "#fff",
              }}
              direction={"column"}
              justifyContent={"space-between"}
              minWidth={352}
              height={"100%"}
            >
              <List>
                <ListItemButton>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItemButton>
              </List>
              <List>
                <Divider></Divider>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      alt={session.data?.user?.name!}
                      src={session.data?.user?.image!}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={session.data?.user?.name}
                    secondary={session.data?.user?.email}
                  />
                </ListItem>
              </List>
            </Stack>
          </Drawer>
          <DashboardContent />
        </>
      )}
    </>
  );
}

export default Dashboard;
