"use client";
import EnhancedTable, { Data } from "@/app/components/EnhancedTable";
import useTransactions from "@/app/hooks/useTransactions";
import Utils from "@/app/utils";
import React from "react";

function Page() {
  const { futureTransactions } = useTransactions();
  const transactionsToTows: Data[] = futureTransactions.map((el, i) => {
    const formattedDate = Utils.formatEPOCHtoDate(el.date);

    return { ...el, id: i, date: formattedDate, amount: parseInt(el.amount) };
  });

  return <EnhancedTable rows={transactionsToTows}></EnhancedTable>;
}

export default Page;
