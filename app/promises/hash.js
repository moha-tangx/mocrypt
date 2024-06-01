// @ts-check
"use strict";

import { randomBytes, scrypt, timingSafeEqual } from "crypto";
import { Buffer } from "buffer";

/**
 * @description
 * hashes the piece of `text` (string)  passed as   argument **asynchronously** (in a non-blocking code manner) using the {@link scrypt} function of the node `crypto` module .resolves the **hashed** **salted*** text together with the salt in the default encoding of `hex` format separated by a colon.
 ** the promise is when hash creation fails.
 ** An exception is thrown when any of the input arguments specified are invalid values or types.
 * @author moha_tangx
 * @date 1/06/2024
 * @export
 * @param {import("crypto").BinaryLike} plainText string to be hashed
  the returned hash encoding type
  should be a multiple of 2
 * @param {{length:number,encoding:BufferEncoding}} options
 * @example const hashed = await hash("some data to hash");
 *console.log(hashed); 
 * // prints :
 * //a814993bf3e...9a56670b50fdcbcecea261:6e8daa7aebbf87736c8b15dd229365372d58072d0fe996360b5fa0586b14730da7a7d8bf61a0af8efa312fbdce4c8f69d9664333d0637c96667573e9dd5b7bc1
 */
export async function hash(
  plainText,
  { length = 64, encoding = "hex" } = {
    length: 64,
    encoding: "hex",
  }
) {
  return new Promise((resolve, reject) => {
    const salt = randomBytes(length).toString(encoding);
    scrypt(plainText, salt, length, (err, hash) => {
      if (err) reject(err);
      resolve(`${salt}:${hash.toString(encoding)}`);
    });
  });
}

/**
 * @description
 * compares a plaintext (string) **asynchronously** to a **hashed** string and returns Promise object resolving with the value true if it matches or false if doesn't.
 * It uses the {@link timingSafeEqual} function of the node `crypto` module for the comparison to prevent timing attack;
 * @author moha_tangx
 * @date 1/06/2024
 * @param {string} plainText
 * @param {string} hashed
 * @param {{length: number,encoding: BufferEncoding,}} options
 * @return
 * @example const password = hashSync("myPassword_");
 * const isValidPassword = await compare(password,"myPassword_")
 * console.log(validPassword);
 * //prints:
 * /
 **/
export async function compare(
  hashed,
  plainText,
  { length = 64, encoding = "hex" } = {
    length: 64,
    encoding: "hex",
  }
) {
  return new Promise((resolve, reject) => {
    const [salt, key] = hashed.split(":");
    scrypt(plainText, salt, length, (err, hashedBuffer) => {
      const keyBuffer = Buffer.from(key, encoding);
      const match = timingSafeEqual(hashedBuffer, keyBuffer);
      if (err) reject(err);
      resolve(match);
    });
  });
}
