import PropTypes from "prop-types";
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import BalanceIcon from "@mui/icons-material/Balance";
import useTransactions from "@/app/hooks/useTransactions";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

export const OverviewPendingTransactions = ({ sx }: any) => {
  const { futureTransactions } = useTransactions();

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
              Pending Transactions
            </Typography>
            <Typography variant="body1">{futureTransactions.length}</Typography>
          </Stack>
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
      </CardContent>
    </Card>
  );
};

OverviewPendingTransactions.propTypes = {
  value: PropTypes.string,
  sx: PropTypes.object,
};
