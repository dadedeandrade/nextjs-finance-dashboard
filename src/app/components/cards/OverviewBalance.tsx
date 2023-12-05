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
import { Transaction } from "@/app/hooks/useTransactions";
import BalanceIcon from "@mui/icons-material/Balance";
import { useAppSelector } from "@/app/store/store";

type Props = {
  sx: SxProps<Theme> | undefined;
};

export const OverviewBalance = ({ sx }: Props) => {
  const filterState = useAppSelector((state) => state.filters);
  const transactionsState = useAppSelector((state) => state.transactions.data);

  if (!transactionsState) {
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

  const dateFilter = transactionsState.filter((el) => {
    if (filterState.startDate && filterState.endDate) {
      return (
        new Date(Math.round(Number(el.date))) >= filterState.startDate &&
        new Date(Math.round(Number(el.date))) <= filterState.endDate
      );
    } else {
      return el;
    }
  });

  const filteredTransactions = dateFilter.filter((transaction: Transaction) => {
    return (
      transaction.account
        .toLowerCase()
        .includes(filterState.account!.toLowerCase()) &&
      transaction.industry
        .toLowerCase()
        .includes(filterState.industry!.toLowerCase()) &&
      transaction.state.toLowerCase().includes(filterState.state!.toLowerCase())
    );
  });

  const expenses =
    filteredTransactions
      .filter((transaction: Transaction) => {
        return transaction.transaction_type == "withdraw";
      })
      .reduce(
        (partialSum, transaction) =>
          partialSum + parseFloat(transaction.amount) / 100,
        0
      ) || 0;

  const revenue =
    filteredTransactions
      .filter((el: Transaction) => el.transaction_type === "deposit")
      .reduce(
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
              Balance
            </Typography>
            <Typography variant="body1">
              {(revenue - expenses).toFixed(2)} $
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "#F79009",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <BalanceIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};
