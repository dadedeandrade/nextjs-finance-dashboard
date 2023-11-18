"use client";
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  Drawer,
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
import HomeIcon from "@mui/icons-material/Home";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

  const router = useRouter();

  return (
    <section>
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
      <Drawer anchor={"left"} open={isDrawerOpen} onClose={toggleDrawer(false)}>
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
            <ListItemButton onClick={() => router.push("/dashboard")}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
            <ListItemButton onClick={() => router.push("/dashboard/pendingTransactions")}>
              <ListItemIcon>
                <SpaceDashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Pending Transactions" />
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
      {children}
    </section>
  );
}
