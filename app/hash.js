// @ts-check
"use strict";

import { randomBytes, scryptSync, timingSafeEqual, scrypt } from "crypto";

/**
 * @description
 * hashes piece of text (string)  passed as argument **synchronously** (in a blocking code manner)  using the {@link scryptSync } function of the node `crypto` module and returns the **hashed** **salted** text together with the salt in the default encoding of `hex` format separated by a colon.
 * @author moha_tangx
 * @date 17/02/2024
 * @export hashSync
 * @param {string} plainText
 * @param {{encoding:BufferEncoding,length:number}} options
 * @return {string}
 * @example const hashed = hashSync("sensitive");
 * console.log(hashed);
 * //prints
 * //bd72b72cb4e1...e86cdc:9fd0d1a34fe3...b2395d116ed
 */
export function hashSync(
  plainText,
  { encoding = "hex", length = 64 } = { encoding: "hex", length: 64 }
) {
  const salt = randomBytes(64).toString(encoding);
  const hashedText = scryptSync(plainText, salt, length).toString(encoding);
  return `${salt}:${hashedText}`;
}

/**
 * @description
 * compares a plaintext (string) ***synchronously*** to a **hashed** string and returns true if it matches or false if doesn't.
 * It uses the {@link timingSafeEqual} function of the node crypto module for the comparison to prevent timing attack;
 * @author moha_tangx
 * @date 17/02/2024
 * @export compareSync
 * @param {string} hashed the hashed string
 * @param {string} plainText the string to be compared with,
 * @param {{encoding:import("crypto").BinaryToTextEncoding,length:number}} options options object the encoding and length of the hashed string
 * @return {boolean}
 * @example
 * const password = hashSync("myPassword_");
 * const is correctPassword = compareSync(password, "myPassword_");
 * console.log(correctPassword);
 * //prints
 * //true
 */
export function compareSync(
  hashed,
  plainText,
  { encoding = "hex", length = 64 } = { encoding: "hex", length: 64 }
) {
  const [salt, key] = hashed.split(":");
  const hashedBuffer = scryptSync(plainText, salt, length);
  const keyBuffer = Buffer.from(key, encoding);
  const match = timingSafeEqual(hashedBuffer, keyBuffer);
  return match;
}

/**
 * @description
 * hashes the piece of `text` (string)  passed as   argument **asynchronously** (in a non-blocking code manner) using the {@link scrypt} function of the node `crypto` module .It takes a callback that takes the hash and error as a parameters and returns the **hashed** **salted*** text together with the salt in the default encoding of `hex` format separated by a colon.
 ** An exception is thrown when hash creation fails.
 ** An exception is thrown when any of the input arguments specify invalid values or types.
 * @author moha_tangx
 * @date 17/02/2024
 * @export
 * @param {import("crypto").BinaryLike} plainText string to be hashed
  the returned hash encoding type
  should be a multiple of 2
  * @param {(hash: string,err:Error|null|undefined) => void} callback
 * @param {{length:number,encoding:BufferEncoding}} options
 * @example hash("some data to hash", (hash) => console.log(hash))
 * // prints :
 * //a814993bf3e...9a56670b50fdcbcecea261:6e8daa7aebbf87736c8b15dd229365372d58072d0fe996360b5fa0586b14730da7a7d8bf61a0af8efa312fbdce4c8f69d9664333d0637c96667573e9dd5b7bc1
 */
export async function hash(
  plainText,
  callback,
  { length = 64, encoding = "hex" } = {
    length: 64,
    encoding: "hex",
  }
) {
  const salt = randomBytes(length).toString(encoding);
  scrypt(plainText, salt, length, (err, hash) => {
    callback(`${salt}:${hash.toString(encoding)}`, err);
  });
}

/**
 * @description
 * compares a plaintext (string) **asynchronously** to a **hashed** string and returns Promise object with the value true if it matches or false if doesn't.
 * It uses the {@link timingSafeEqual} function of the node `crypto` module for the comparison to prevent timing attack;
 * @author moha_tangx
 * @date 17/02/2024
 * @param {string} plainText
 * @param {string} hashed
 * @param {(match:boolean,error:Error | null)=>*} callback
 * @param {{length: number,encoding: BufferEncoding,}} options
 * @return
 * @example const password = hashSync("myPassword_");
 * const isValidPassword = await compare("myPassword_",password)
 * console.log(validPassword);
 * //prints:
 * // true
 */
export async function compare(
  hashed,
  plainText,
  callback,
  { length = 64, encoding = "hex" } = {
    length: 64,
    encoding: "hex",
  }
) {
  const [salt, key] = hashed.split(":");
  scrypt(plainText, salt, length, (error, hashedBuffer) => {
    const keyBuffer = Buffer.from(key, encoding);
    const match = timingSafeEqual(hashedBuffer, keyBuffer);
    callback(match, error);
  });
}

export default {
  hash,
  compare,
  hashSync,
  compareSync,
};
