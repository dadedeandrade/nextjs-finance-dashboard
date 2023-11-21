"use client";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Stack,
  SvgIcon,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import useTransactions, { Transaction } from "@/app/hooks/useTransactions";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/app/store/store";

type Props = {
  sx: SxProps<Theme> | undefined;
};

export const OverviewPendingTransactions = ({ sx }: Props) => {
  const router = useRouter();
  const { transactions } = useTransactions();
  const filterState = useAppSelector((state) => state.filters);

  if (!transactions) {
    return (
      <Card sx={sx}>
        <CardContent>
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="center"
            spacing={3}
          >
            <CircularProgress></CircularProgress>
          </Stack>
        </CardContent>
      </Card>
    );
  }
  const filteredTransactions = transactions.filter(
    (transaction: Transaction) => {
      return (
        transaction.transaction_type == "withdraw" &&
        transaction.account
          .toLowerCase()
          .includes(filterState.account.toLowerCase())
      );
    }
  );
  const futureTransactions = filteredTransactions.filter(
    (transaction) => transaction.date > Date.now()
  );

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="column"
          justifyContent="space-between"
        >
          <Stack
            spacing={1}
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            width={"100%"}
          >
            <Typography width={122} color="text.secondary" variant="overline">
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
