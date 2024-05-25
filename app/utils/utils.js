// @ts-check
"use strict";

/**
 * @description
 * @author moha_tangx
 * @date 25/04/2024
 * @param {any} timeOut the timeout parameter takes a number which is in seconds or a date constructor string in form of "month-date-year" or "month/date/year" or use the convenient syntax which is in form of "`number`hrs" for hours ,"`number`mns" for minutes.
 */
export function createDate(timeOut) {
  if (typeof timeOut === "number") {
    return new Date(Date.now() + 1_000 * timeOut);
  }
  // Hate regex ✖️⛔

  const expDate = timeOut.split("");
  const id = expDate.splice(-3).join("");
  const no = expDate.join("");

  if (id === "hrs") {
    return new Date(Date.now() + 1_000 * 60 * 60 * +no);
  }
  if (id === "mns") {
    return new Date(Date.now() + 1_000 * 60 * +no);
  }

  const date = new Date(timeOut);
  if ("" + date == "Invalid Date")
    throw Error("invalid date constructor format");
  return date;
}
