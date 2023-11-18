import { useState, useEffect } from "react";

type Transaction = {
  date: number;
  amount: string;
  transaction_type: "deposit" | "withdraw";
  currency: string;
  account: string;
  industry: string;
  state: string;
};

type TransactionsData = {
  transactions: Transaction[];
  withdrawalTransactions: Transaction[];
  depositTransactions: Transaction[];
};
const useTransactions = () => {
  const [data, setData] = useState<TransactionsData | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch("/transactions.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const jsonData = await response.json();

      const withdrawals = jsonData.filter(
        (el: Transaction) => el.transaction_type === "withdraw"
      );

      const deposits = jsonData.filter(
        (el: Transaction) => el.transaction_type === "deposit"
      );

      setData({
        transactions: jsonData,
        withdrawalTransactions: withdrawals,
        depositTransactions: deposits,
      });
    } catch (error: any) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sumAllDeposits =
    data?.depositTransactions.reduce(
      (partialSum, transaction) =>
        partialSum + parseFloat(transaction.amount) / 100,
      0
    ) || 0;

  const sumAllWithdrawals =
    data?.withdrawalTransactions.reduce(
      (partialSum, transaction) =>
        partialSum + parseFloat(transaction.amount) / 100,
      0
    ) || 0;

  const futureTransactions =
    data?.transactions.filter((transaction) => transaction.date > Date.now()) ||
    [];

  return {
    transactions: data?.transactions,
    sumAllWithdrawals,
    sumAllDeposits,
    futureTransactions,
  };
};

export default useTransactions;
