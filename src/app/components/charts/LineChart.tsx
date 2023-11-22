import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Card, CardContent, CircularProgress, Stack } from "@mui/material";
import useTransactions, { Transaction } from "@/app/hooks/useTransactions";
import { useAppSelector } from "@/app/store/store";
import Utils from "@/app/utils";

type UserData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string;
    borderWidth: number;
  }[];
};

type ChartData = {
  state: string;
  revenue: number;
  expenses: number;
};

function LineChart({ year }: { year: number }) {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [userData, setUserData] = useState<UserData>({
    labels: [],
    datasets: [
      {
        label: "Expenses",
        data: [],
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
      {
        label: "Revenue",
        data: [],
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  const { transactions } = useTransactions();
  const filterState = useAppSelector((state) => state.filters);

  useEffect(() => {
    if (!transactions) {
      return;
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

    const filteredTransactionsDeposit = dateFilter.filter(
      (transaction: Transaction) => {
        return (
          transaction.transaction_type === "deposit" &&
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
      }
    );

    const filteredTransactionsWithdraws = dateFilter.filter(
      (transaction: Transaction) => {
        return (
          transaction.transaction_type === "withdraw" &&
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
      }
    );

    const calculateRevenuePerState = (
      state: string,
      transactions: Transaction[]
    ) => {
      return (
        transactions
          .filter((el) => {
            const epochToDate = new Date(Math.round(Number(el.date)));

            return epochToDate.getUTCFullYear() === year && el.state === state;
          })
          .reduce(
            (partialSum, transaction) =>
              partialSum + parseFloat(transaction.amount) / 100,
            0
          ) || 0
      );
    };

    const calculateExpensesPerState = (
      state: string,
      transactions: Transaction[]
    ) => {
      return (
        transactions
          .filter((el) => {
            const epochToDate = new Date(Math.round(Number(el.date)));

            return epochToDate.getUTCFullYear() === year && el.state === state;
          })
          .reduce(
            (partialSum, transaction) =>
              partialSum + parseFloat(transaction.amount) / 100,
            0
          ) || 0
      );
    };

    const labels = Utils.listOfStatesUsa().filter((el) => el !== "");

    const revenueData = labels.map((state, index) =>
      calculateRevenuePerState(state, filteredTransactionsDeposit)
    );
    const expensesData = labels.map((state, index) =>
      calculateExpensesPerState(state, filteredTransactionsWithdraws)
    );

    setChartData(
      labels.map((state, index) => ({
        state,
        revenue: revenueData[index],
        expenses: expensesData[index],
      }))
    );

    setUserData({
      labels,
      datasets: [
        {
          label: "Expenses",
          data: expensesData,
          backgroundColor: ["#D32F2F"],
          borderColor: "black",
          borderWidth: 2,
        },
        {
          label: "Revenue",
          data: revenueData,
          backgroundColor: ["#2E7D32"],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    });
  }, [
    transactions,
    filterState.startDate,
    filterState.endDate,
    filterState.account,
    filterState.industry,
    filterState.state,
    year,
  ]);

  if (!transactions) {
    return (
      <Card sx={{ height: "100%" }}>
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
    <Line
      data={userData}
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: "top" as const,
          },
          title: {
            display: true,
            text: "Expenses / Revenue per state in " + year,
          },
        },
      }}
    />
  );
}

export default LineChart;
