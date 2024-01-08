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
import useTransactions from "@/app/hooks/useTransactions";
import BalanceIcon from "@mui/icons-material/Balance";
import { useAppSelector } from "@/app/store/store";
import useFilteredTransactions, {
} from "@/app/hooks/useFilteredTransactions";

type Props = {
  sx: SxProps<Theme> | undefined;
};

export const OverviewBalance = ({ sx }: Props) => {
  const { transactions } = useTransactions();
  const filterState = useAppSelector((state) => state.filters);
  const { filteredExpenses, filteredRevenue } = useFilteredTransactions(
    transactions,
    filterState
  );

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
              {(filteredRevenue! - filteredExpenses!).toFixed(2)} $
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
