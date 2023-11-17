import PropTypes from "prop-types";
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import PaidIcon from "@mui/icons-material/Paid";
import useTransactions from "@/app/hooks/useTransactions";
import BalanceIcon from "@mui/icons-material/Balance";
export const OverviewBalance = (props: any) => {
  const { value, sx } = props;

  const { sumAllWithdrawals, sumAllDeposits } = useTransactions();

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
            <Typography variant="body1">{(sumAllDeposits - sumAllWithdrawals).toFixed(2)}$</Typography>
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

OverviewBalance.propTypes = {
  value: PropTypes.string,
  sx: PropTypes.object,
};
