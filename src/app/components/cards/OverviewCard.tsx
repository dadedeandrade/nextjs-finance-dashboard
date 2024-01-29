import React from "react";
import {
  Avatar,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  SvgIcon,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import { useAppSelector } from "@/app/store/store";
import { useRouter } from "next/navigation";
import PaidIcon from "@mui/icons-material/Paid";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import useTransactions, { Transaction } from "@/app/hooks/useTransactions";
import BalanceIcon from "@mui/icons-material/Balance";
import Utils from "@/app/utils";

type OverviewType = "balance" | "expenses" | "pending" | "revenue";

type OverviewCardProps = {
  type: OverviewType;
  sx?: SxProps<Theme> | undefined;
};

const OverviewCard: React.FC<OverviewCardProps> = ({ type, sx }) => {
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
            <CircularProgress />
          </Stack>
        </CardContent>
      </Card>
    );
  }

  const dateFilter = Utils.filterTransactionsByDate(transactions, filterState);

  const withdrawalTransactions = dateFilter.filter(
    (transaction) => transaction.transaction_type === "withdraw"
  );

  const depositTransactions = dateFilter.filter(
    (transaction) => transaction.transaction_type === "deposit"
  );

  let filteredTransactions: Transaction[] = [];
  let title: string;
  let backgroundColor: string;
  let icon: React.ReactElement;

  switch (type) {
    case "balance":
      title = "Balance";
      filteredTransactions = Utils.getBalanceBetweenTransactions();
      backgroundColor = "#F79009";
      icon = (
        <SvgIcon>
          <BalanceIcon />
        </SvgIcon>
      );
      break;
    case "expenses":
      title = "Expenses";
      filteredTransactions = withdrawalTransactions;
      backgroundColor = "error.main";
      icon = (
        <SvgIcon>
          <PaidIcon />
        </SvgIcon>
      );
      break;
    case "pending":
      title = "Pending Transactions";
      filteredTransactions = dateFilter.filter(
        (transaction) => transaction.date > Date.now()
      );
      backgroundColor = "#6366F1";
      icon = (
        <SvgIcon>
          <PendingActionsIcon />
        </SvgIcon>
      );
      break;
    case "revenue":
      title = "Revenue";
      filteredTransactions = depositTransactions;
      backgroundColor = "success.main";
      icon = (
        <SvgIcon>
          <PaidIcon />
        </SvgIcon>
      );
      break;
    default:
      return null;
  }

  const amount =
    filteredTransactions.reduce(
      (partialSum, transaction) =>
        partialSum + parseFloat(transaction.amount) / 100,
      0
    ) || 0;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              {title}
            </Typography>
            <Typography variant="body1">
              {amount.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              $
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor,
              height: 56,
              width: 56,
            }}
          >
            {icon}
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default OverviewCard;
