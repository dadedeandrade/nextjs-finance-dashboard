import {
  Avatar,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import useTransactions, { Transaction } from "@/app/hooks/useTransactions";
import BalanceIcon from "@mui/icons-material/Balance";
import { useAppSelector } from "@/app/store/store";
export const OverviewBalance = (props: any) => {
  const { value, sx } = props;

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
      return transaction.account
        .toLowerCase()
        .includes(filterState.account.toLowerCase());
    }
  );

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
