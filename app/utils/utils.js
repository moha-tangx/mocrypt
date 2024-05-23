import words from "./words.json" assert { type: "json" };

export function generatePassPhrase() {
  const wordsArr = words.split(" ");
  const passPhraseArr = [];
  // set the loop to 100 rounds to make sure the length of the passPhrase is always not less than 512 bytes
  for (let i = 0; i < 100; i++) {
    const rand = Math.floor(Math.random() * wordsArr.length);
    passPhraseArr.push(wordsArr[rand]);
  }

  return passPhraseArr.join(" ");
}

/**
 * @description
 * @author moha_tangx
 * @date 25/04/2024
 * @param {any} timeOut the timeout parameter takes a number which is in seconds or a date constructor string in form of "month-date-year" or "month/date/year" or use the convenient syntax which is in form of "2hrs" for hours ,"30mns" for minutes.
 */
export function createDate(timeOut) {
  if (typeof timeOut === "number") {
    return new Date(Date.now() + 1_000 * timeOut);
  }

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
