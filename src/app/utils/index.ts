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

  static normalizeData = (data: Promise<Transaction[]>) => {};
}
