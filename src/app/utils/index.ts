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
}
