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

function Dashboard() {
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
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
            dolor purus non enim praesent elementum facilisis leo vel. Risus at
            ultrices mi tempus imperdiet. Semper risus in hendrerit gravida
            rutrum quisque non tellus. Convallis convallis tellus id interdum
            velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean
            sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
            integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
            eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
            quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
            vivamus at augue. At augue eget arcu dictum varius duis at
            consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
            donec massa sapien faucibus et molestie ac. Consequat mauris nunc
            congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
            facilisi etiam dignissim diam. Pulvinar elementum integer enim neque
            volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
            tellus. Purus sit amet volutpat consequat mauris. Elementum eu
            facilisis sed odio morbi. Euismod lacinia at quis risus sed
            vulputate odio. Morbi tincidunt ornare massa eget egestas purus
            viverra accumsan in. In hendrerit gravida rutrum quisque non tellus
            orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant morbi
            tristique senectus et. Adipiscing elit duis tristique sollicitudin
            nibh sit. Ornare aenean euismod elementum nisi quis eleifend.
            Commodo viverra maecenas accumsan lacus vel facilisis. Nulla posuere
            sollicitudin aliquam ultrices sagittis orci a.
          </Box>
        </>
      )}
    </>
  );
}

export default Dashboard;
