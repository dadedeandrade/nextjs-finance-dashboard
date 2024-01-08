import { FormValues } from "../dashboard/layout";
import { Transaction } from "../hooks/useTransactions";

export default class Utils {
  static formatEPOCHtoDate(date: number) {
    var dateObj = new Date(Math.round(Number(date)));

    return (
      dateObj.getUTCDate() +
      "-" +
      (dateObj.getUTCMonth() + 1) +
      "-" +
      dateObj.getUTCFullYear()
    );
  }

  static formatDate(date: Date) {
    return (
      date.toLocaleString("default", { month: "short" }) +
      " " +
      date.getUTCDate() +
      " " +
      date.getUTCFullYear()
    );
  }

  static formatNumber = (input: string) => {
    if (typeof input === "string") {
      const [parteInteira, parteDecimal] = input.split("");
      const resultado = parteDecimal
        ? `${parteInteira},${parteDecimal}`
        : parteInteira;

      return resultado;
    }

    return input;
  };

  static listOfStatesUsa() {
    return [
      "",
      "AL",
      "AK",
      "AZ",
      "AR",
      "CA",
      "CO",
      "CT",
      "DE",
      "FL",
      "GA",
      "HI",
      "ID",
      "IL",
      "IN",
      "IA",
      "KS",
      "KY",
      "LA",
      "ME",
      "MD",
      "MA",
      "MI",
      "MN",
      "MS",
      "MO",
      "MT",
      "NE",
      "NV",
      "NH",
      "NJ",
      "NM",
      "NY",
      "NC",
      "ND",
      "OH",
      "OK",
      "OR",
      "PA",
      "RI",
      "SC",
      "SD",
      "TN",
      "TX",
      "UT",
      "VT",
      "VA",
      "WA",
      "WV",
      "WI",
      "WY",
    ];
  }

  static normalizeData = (data: Promise<Transaction[]>) => {};

  static filterTransactionsByDate = (
    transactions: Transaction[],
    filterState: FormValues
  ) => {
    return transactions.filter((el) => {
      if (filterState.startDate && filterState.endDate) {
        return (
          new Date(Math.round(Number(el.date))) >= filterState.startDate &&
          new Date(Math.round(Number(el.date))) <= filterState.endDate
        );
      } else {
        return el;
      }
    });
  };
}
