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

  const futureTransactions = data?.transactions.filter(
    (transaction) => transaction.date > Date.now()
  );

  return {
    transactions: data?.transactions,
    futureTransactions,
  };
};

export default useTransactions;
