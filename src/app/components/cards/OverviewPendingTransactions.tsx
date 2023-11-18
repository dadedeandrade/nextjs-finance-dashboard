'use client';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import useTransactions from "@/app/hooks/useTransactions";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useRouter } from "next/navigation";

export const OverviewPendingTransactions = ({ sx }: any) => {
  const router = useRouter();
  const { futureTransactions } = useTransactions();
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="column"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack
            spacing={1}
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            width={"100%"}
          >
            <Typography color="text.secondary" variant="overline">
              Pending Transactions
            </Typography>
            <Avatar
              sx={{
                backgroundColor: "#6366F1",
                height: 56,
                width: 56,
              }}
            >
              <SvgIcon>
                <PendingActionsIcon />
              </SvgIcon>
            </Avatar>
          </Stack>

          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            width={"100%"}
          >
            <Typography variant="body1">{futureTransactions.length}</Typography>
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Button
                color="inherit"
                endIcon={
                  <SvgIcon fontSize="small">
                    <ArrowForwardIcon />
                  </SvgIcon>
                }
                size="small"
                variant="text"
                onClick={() => {
                  return router.push("/dashboard/pendingTransactions");
                }}
              >
                View all
              </Button>
            </CardActions>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
