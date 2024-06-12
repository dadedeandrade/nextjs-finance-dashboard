"use client";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
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
  IconButton,
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
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Utils from "../utils";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import styled from "styled-components";

export type FormValues = {
  startDate?: Date | undefined | null;
  endDate?: Date | undefined | null;
  account?: string | undefined;
  industry?: string | undefined;
  state?: string | undefined;
};

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingLeft: "16px",
  backgroundColor: "#080808",
  height: 64,
}));

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

  const listOfStatesUsa = Utils.listOfStatesUsa();

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

  const validationSchema = yup.object({
    startDate: yup.date().nullable(),
    endDate: yup
      .date()
      .nullable()
      .min(yup.ref("startDate"), "end date can't be before start date"),
    account: yup.string(),
    industry: yup.string(),
    state: yup.string(),
  });

  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    control,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(validationSchema) });

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
            <Button
              color="primary"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleOpen}
              variant="contained"
              startIcon={<FilterListIcon />}
            >
              Filter Data
            </Button>
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
                  if (!errors) {
                    handleClose();
                  }
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
                    endDateError={errors.endDate}
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
                    availableOptions={listOfStatesUsa}
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
        <DrawerHeader>
          <Typography variant="h6" component="div" sx={{ color: "white" }}>
            Finances
          </Typography>
          <IconButton onClick={toggleDrawer(false)} sx={{ color: "white" }}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Stack
          sx={{
            bgcolor: "#080808",
            color: "#fff",
          }}
          direction={"column"}
          justifyContent={"space-between"}
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
