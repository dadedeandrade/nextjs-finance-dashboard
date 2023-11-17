import React, { useEffect } from "react";
import * as Mui from "@mui/material";
import PaidIcon from "@mui/icons-material/Paid";
import useTransactions from "@/app/hooks/useTransactions";

type Props = {
  difference: number;
  positive: boolean;
  value: string;
  sx: any;
};

function OverviewRevenue({ difference, positive, value, sx }: Props) {
  const { depositTransactions } = useTransactions();
  if (!depositTransactions) {
    return <>Loading</>;
  }
  const sum = depositTransactions!.reduce(
    (partialSum, a) => partialSum + parseFloat(a.amount) / 100,
    0
  );

  return (
    <Mui.Card sx={sx}>
      <Mui.CardContent>
        <Mui.Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Mui.Stack spacing={1}>
            <Mui.Typography color="text.secondary" variant="overline">
              Revenue
            </Mui.Typography>
            <Mui.Typography variant="body1" >
              {sum.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              $
            </Mui.Typography>
          </Mui.Stack>
          <Mui.Avatar
            sx={{
              backgroundColor: "success.main",
              height: 56,
              width: 56,
            }}
          >
            <Mui.SvgIcon>
              <PaidIcon />
            </Mui.SvgIcon>
          </Mui.Avatar>
        </Mui.Stack>
      </Mui.CardContent>
    </Mui.Card>
  );
}

export default OverviewRevenue;
