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
import useFilteredTransactions from "@/app/hooks/useFilteredTransactions";

type Props = {
  sx: SxProps<Theme> | undefined;
};

function OverviewRevenue({ sx }: Props) {
  const { transactions } = useTransactions();
  const filterState = useAppSelector((state) => state.filters);
  const { filteredRevenue } = useFilteredTransactions(
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
              Revenue
            </Typography>
            <Typography variant="body1">
              {filteredRevenue!.toLocaleString("en-US", {
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
