import PaidIcon from "@mui/icons-material/Paid";
import useTransactions, { Transaction } from "@/app/hooks/useTransactions";
import { useAppSelector } from "@/app/store/store";
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

type Props = {
  sx: SxProps<Theme> | undefined;
};

function OverviewExpenses({ sx }: Props) {
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

  const expenses =
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
              Expenses
            </Typography>
            <Typography variant="body1">
              {expenses.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              $
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "error.main",
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

export default OverviewExpenses;
