"use client";
import ActiveFilters from "@/app/components/ActiveFilters";
import EnhancedTable, { Data } from "@/app/components/EnhancedTable";
import { useAppSelector } from "@/app/store/store";
import Utils from "@/app/utils";
import { Box, Paper } from "@mui/material";
import React from "react";

function Page() {
  const transactionsState = useAppSelector((state) => state.transactions.data);

  const filterState = useAppSelector((state) => state.filters);

  const futureTransactions = transactionsState
    ? transactionsState.filter((transaction) => {
        return (
          transaction.date > Date.now() &&
          transaction.account
            .toLowerCase()
            .includes(filterState.account!.toLowerCase()) &&
          transaction.industry
            .toLowerCase()
            .includes(filterState.industry!.toLowerCase()) &&
          transaction.state
            .toLowerCase()
            .includes(filterState.state!.toLowerCase())
        );
      })
    : [];
  const transactionsToRows: Data[] = futureTransactions.map((el, i) => {
    const formattedDate = Utils.formatEPOCHtoDate(el.date);

    return { ...el, id: i, date: formattedDate, amount: parseInt(el.amount) };
  });

  return (
    <>
      <Box sx={{ width: "100%", padding: 3 }}>
        <ActiveFilters />
      </Box>
      <EnhancedTable rows={transactionsToRows}></EnhancedTable>
    </>
  );
}

export default Page;
