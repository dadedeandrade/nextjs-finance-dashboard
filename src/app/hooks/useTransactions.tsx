import { useState, useEffect } from "react";

export type Transaction = {
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

      setData({
        transactions: jsonData,
      });
    } catch (error: any) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const revenue =
    data?.transactions
      .filter((el: Transaction) => el.transaction_type === "deposit")
      .reduce(
        (partialSum, transaction) =>
          partialSum + parseFloat(transaction.amount) / 100,
        0
      ) || 0;

  const expenses =
    data?.transactions
      .filter((el: Transaction) => el.transaction_type === "withdraw")
      .reduce(
        (partialSum, transaction) =>
          partialSum + parseFloat(transaction.amount) / 100,
        0
      ) || 0;

  const futureTransactions =
    data?.transactions.filter((transaction) => transaction.date > Date.now()) ||
    [];

  const getTransactionsPerMonth = () => {
    return [
      { transactionMonth: "Jan", amount: 123, transaction_type: "deposit" },
    ];
  };

  return {
    transactions: data?.transactions,
    expenses,
    revenue,
    futureTransactions,
  };
};

export default useTransactions;
