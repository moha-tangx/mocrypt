import { hash, compare } from "../hash.js";

hash("plainText", (hashed, err) => {
  if (err) throw err;
  console.log(hashed);
  compare(hashed, "plainText", (match, err) => {
    console.log(match);
  });
});
