import React, { useEffect } from "react";
import PaidIcon from "@mui/icons-material/Paid";
import useTransactions, { Transaction } from "@/app/hooks/useTransactions";
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

type Props = {
  sx: SxProps<Theme> | undefined;
};

function OverviewRevenue({ sx }: Props) {
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
        transaction.transaction_type == "deposit" &&
        transaction.account
          .toLowerCase()
          .includes(filterState.account.toLowerCase()) &&
        transaction.industry
          .toLowerCase()
          .includes(filterState.industry.toLowerCase()) &&
        transaction.state
          .toLowerCase()
          .includes(filterState.state.toLowerCase())
      );
    }
  );

  const revenue =
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
              Revenue
            </Typography>
            <Typography variant="body1">
              {revenue.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              $
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "success.main",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <PaidIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default OverviewRevenue;
