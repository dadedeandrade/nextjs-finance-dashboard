import React, { useEffect, useState } from "react";

function useTransactions() {
  type Transaction = {
    date: number;
    amount: string;
    transaction_type: "deposit" | "withdraw";
    currency: string;
    account: string;
    industry: string;
    state: string;
  };

  const [transactions, setTransactions] = useState<Transaction[]>();
  const [withdrawalTransactions, setWithdrawalTransactions] =
    useState<Transaction[]>();
  const [depositTransactions, setDepositTransactions] =
    useState<Transaction[]>();

  const getData = () => {
    fetch("transactions.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setTransactions(myJson);

        const withdrawals = myJson.filter(
          (el: any) => el.transaction_type === "withdraw"
        );
        const deposits = myJson.filter(
          (el: any) => el.transaction_type === "deposit"
        );
        setWithdrawalTransactions(withdrawals);
        setDepositTransactions(deposits);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return { transactions, withdrawalTransactions, depositTransactions };
}

export default useTransactions;
