import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
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
  month: string;
  revenue: number;
  expenses: number;
};

function BarChart({ year }: { year: number }) {
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
          "#2E7D32",
          "#1D2D44",
          "#0D1321",
          "#6AD5CB",
          "#2DE1C2",
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

    const dateFilter = Utils.filterTransactionsByDate(transactions, filterState);


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

    const calculateMonthlyRevenue = (
      monthIndex: number,
      transactions: Transaction[]
    ) => {
      return (
        transactions
          .filter((el) => {
            const epochToDate = new Date(Math.round(Number(el.date)));

            return (
              epochToDate.getUTCFullYear() === year &&
              epochToDate.getUTCMonth() === monthIndex
            );
          })
          .reduce(
            (partialSum, transaction) =>
              partialSum + parseFloat(transaction.amount) / 100,
            0
          ) || 0
      );
    };

    const calculateMonthlyExpenses = (
      monthIndex: number,
      transactions: Transaction[]
    ) => {
      return (
        transactions
          .filter((el) => {
            const epochToDate = new Date(Math.round(Number(el.date)));

            return (
              epochToDate.getUTCFullYear() === year &&
              epochToDate.getUTCMonth() === monthIndex
            );
          })
          .reduce(
            (partialSum, transaction) =>
              partialSum + parseFloat(transaction.amount) / 100,
            0
          ) || 0
      );
    };

    const labels = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const revenueData = labels.map((_, index) =>
      calculateMonthlyRevenue(index, filteredTransactionsDeposit)
    );
    const expensesData = labels.map((_, index) =>
      calculateMonthlyExpenses(index, filteredTransactionsWithdraws)
    );

    setChartData(
      labels.map((month, index) => ({
        month,
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
    <Bar
      data={userData}
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: "top" as const,
          },
          title: {
            display: true,
            text: "Expenses/ Revenue per month in " + year,
          },
        },
      }}
    />
  );
}

export default BarChart;
