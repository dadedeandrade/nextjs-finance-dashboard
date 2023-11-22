"use client";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Stack,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut, useSession } from "next-auth/react";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import FilterListIcon from "@mui/icons-material/FilterList";
import DatePick from "../components/modalForm/DatePick";
import ModalSelect from "../components/modalForm/ModalSelect";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setFilters } from "../store/filtersSlice";
import { useAppSelector } from "../store/store";

export type FormValues = {
  startDate: Date;
  endDate: Date;
  account: string;
  industry: string;
  state: string;
};

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
  const pathName = usePathname();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const stateList = [
    "",
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];

  const availableIndustries = [
    "",
    "Oil and Gas Equipment",
    "Food Consumer Products",
    "Hotels",
    "Apparel",
    "Education",
    "Airlines",
    "Automotive Retailing",
    "Advertising",
    "Computer Software",
    "Mail",
  ];

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<FormValues>();

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    dispatch(
      setFilters({
        account: data.account,
        endDate: data.endDate,
        industry: data.industry,
        startDate: data.startDate,
        state: data.state,
      })
    );
  };

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
              onClick={handleOpen}
            >
              <FilterListIcon />
            </IconButton>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              keepMounted
            >
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  await handleSubmit(onSubmit)();
                  handleClose();
                }}
              >
                <Stack
                  sx={{
                    width: isSmallScreen ? "90%" : "50%",
                    height: isSmallScreen ? "80%" : "auto",
                    padding: isSmallScreen ? "20px" : "50px",
                    backgroundColor: "white",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "background.paper",
                    border: "2px solid #000",
                    boxShadow: 24,
                    overflow: "scroll",
                  }}
                  gap={3}
                >
                  <Typography variant="h4">Filter by</Typography>

                  <DatePick
                    control={control}
                    labelFirst={"Start date"}
                    labelSecond={"End Date"}
                    nameFirst={"startDate"}
                    nameSecond={"endDate"}
                  />

                  <TextField
                    id="outlined-basic"
                    label="Account"
                    variant="outlined"
                    {...register("account")}
                  />
                  <ModalSelect
                    labelId="industry"
                    id="industry"
                    label="Industry"
                    availableOptions={availableIndustries}
                    inputLabel="Industry"
                    register={register}
                  />
                  <ModalSelect
                    inputLabel="State"
                    labelId="state"
                    id="state"
                    label="State"
                    availableOptions={stateList}
                    register={register}
                  />

                  <Button type="submit" size="small">
                    Apply Filters
                  </Button>
                  <Button onClick={() => handleClose()} size="small">
                    Cancel
                  </Button>
                </Stack>
              </form>
            </Modal>
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
            <ListItemButton
              onClick={() => router.push("/dashboard/pendingTransactions")}
            >
              <ListItemIcon>
                <SpaceDashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Pending Transactions" />
            </ListItemButton>
          </List>
          <List>
            <ListItemButton onClick={() => signOut({ callbackUrl: "/" })}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Sign Out" />
            </ListItemButton>

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
