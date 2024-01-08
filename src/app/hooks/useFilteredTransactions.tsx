import { Transaction } from "./useTransactions";
import { FormValues } from "../dashboard/layout";

export type FilteredTransactions = {
  filteredTransactions: Transaction[];
  filteredExpenses: number;
  filteredRevenue: number;
};

const useFilteredTransactions = (
  transactions: Transaction[] | undefined,
  filterState: FormValues
) => {
  if (!transactions) {
    return { filteredTransactions: [] };
  }

  const dateFilter = transactions.filter((el) => {
    if (filterState.startDate && filterState.endDate) {
      return (
        new Date(Math.round(Number(el.date))) >= filterState.startDate &&
        new Date(Math.round(Number(el.date))) <= filterState.endDate
      );
    } else {
      return el;
    }
  });
  const filteredTransactions = dateFilter.filter((transaction: Transaction) => {
    return (
      transaction.account
        .toLowerCase()
        .includes(filterState.account!.toLowerCase()) &&
      transaction.industry
        .toLowerCase()
        .includes(filterState.industry!.toLowerCase()) &&
      transaction.state.toLowerCase().includes(filterState.state!.toLowerCase())
    );
  });

  const filteredExpenses =
    filteredTransactions
      .filter((transaction: Transaction) => {
        return transaction.transaction_type == "withdraw";
      })
      .reduce(
        (partialSum, transaction) =>
          partialSum + parseFloat(transaction.amount) / 100,
        0
      ) || 0;

  const filteredRevenue =
    filteredTransactions
      .filter((el: Transaction) => el.transaction_type === "deposit")
      .reduce(
        (partialSum, transaction) =>
          partialSum + parseFloat(transaction.amount) / 100,
        0
      ) || 0;

  return {
    filteredTransactions,
    filteredExpenses: filteredExpenses || 0,
    filteredRevenue: filteredRevenue || 0,
  };
};

export default useFilteredTransactions;
