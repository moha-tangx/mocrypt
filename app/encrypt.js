// @ts-check
"use strict";

import {
  randomBytes,
  createDecipheriv,
  createCipheriv,
  privateDecrypt,
  privateEncrypt,
  publicDecrypt,
  publicEncrypt,
} from "crypto";

/**
 * @description encrypts a plaintext (can be in any format) to a ciphered Text with a symmetric key
 * @author moha_tangx
 * @date 21/05/2024
 * @param {any} payload text to be encrypted.
 * @param {string | Buffer | import("crypto").KeyLike} key symmetric key can be generated from the createKey or createKeySync methods
 * @param {{algorithm : string, inputEncoding : import("crypto").Encoding, outputEncoding:import("crypto").Encoding}} options an options object with the structure of : ```{algorithm: string, inputEncoding: import("crypto").Encoding, outputEncoding: import("crypto").Encoding}```
 * @return {string}
 * @example const plainText =
  "almost next test tin start equipment possible previous useful clock particularly door beside ship fierce only do brother pipe chosen donkey drive north stop";

const key = createKeySync(); // key should be kept secret;

const encryptedMessage = symmetricEncrypt(plainText, key);
console.log(encryptedMessage);
// logs: 40342898d80280aa4d4e85f138f456a4847341b1770c3c9557ce0ad9a4e4d6ab6bb251ea8c33d5fbbe3e47f817897eb94498ea01ea916c84792b9dcb4c5921e2556cd76f8a98c7c4f6f26ad832f84844cb3517209200acaae9de002cb91961170b3bb0614c50992b7b84b313013a6840f561edd3d9052237557b23561fd608a3e12174f7f0202f641136c990fa8a8bb8bcae79d30a6f13c1ad8b631ff6a023fd.5c16c59003fe1fe1

 */
export function symmetricEncrypt(
  payload,
  key,
  { algorithm = "aes256", inputEncoding = "utf8", outputEncoding = "hex" } = {
    algorithm: "aes256",
    inputEncoding: "utf8",
    outputEncoding: "hex",
  }
) {
  if (typeof key === "string") key = Buffer.from(key.slice(0, 32));
  const payloadStr = JSON.stringify(payload);
  const ivStr = randomBytes(8).toString("hex");
  const iv = Buffer.from(ivStr);
  const cipher = createCipheriv(algorithm, key, iv);
  const encryptedMessage =
    cipher.update(payloadStr, inputEncoding, outputEncoding) +
    cipher.final(outputEncoding);
  return `${encryptedMessage}.${ivStr}`;
}

/**
 * @description decrypts a ciphered text to a plaintext with the symmetric key used in creating the cipher
 * @author moha_tangx
 * @date 21/05/2024
 * @param {string} cipherText
 * @param {import("crypto").KeyLike} key
 * @param {{algorithm : string ,inputEncoding : import("crypto").Encoding,outputEncoding:import("crypto").Encoding}} options an options object with the structure of : ```{algorithm: string, inputEncoding: import("crypto").Encoding, outputEncoding: import("crypto").Encoding}```
 * @return {any}
 * @example const plainText =
  "almost next test tin start equipment possible previous useful clock particularly door beside ship fierce only do brother pipe chosen donkey drive north stop";

const key = createKeySync(); // key should be kept secret;

const encryptedMessage = symmetricEncrypt(plainText, key);
console.log(encryptedMessage);
// logs: 40342898d80280aa4d4e85f138f456a4847341b1770c3c9557ce0ad9a4e4d6ab6bb251ea8c33d5fbbe3e47f817897eb94498ea01ea916c84792b9dcb4c5921e2556cd76f8a98c7c4f6f26ad832f84844cb3517209200acaae9de002cb91961170b3bb0614c50992b7b84b313013a6840f561edd3d9052237557b23561fd608a3e12174f7f0202f641136c990fa8a8bb8bcae79d30a6f13c1ad8b631ff6a023fd.5c16c59003fe1fe1

const decryptedMessage = symmetricDecrypt(encryptedMessage, key);
console.log(decryptedMessage);
// logs: almost next test tin start equipment possible previous useful clock particularly door beside ship fierce only do brother pipe chosen donkey drive north stop
 */
export function symmetricDecrypt(
  cipherText,
  key,
  { algorithm = "aes256", inputEncoding = "hex", outputEncoding = "utf8" } = {
    algorithm: "aes256",
    inputEncoding: "hex",
    outputEncoding: "utf8",
  }
) {
  if (typeof key === "string") key = Buffer.from(key.slice(0, 32));
  const [cipher, ivStr] = cipherText.split(".");
  const iv = Buffer.from(ivStr);
  const decipher = createDecipheriv(algorithm, key, iv);
  const decryptedMessage =
    decipher.update(cipher, inputEncoding, outputEncoding) +
    decipher.final(outputEncoding);
  try {
    return JSON.parse(decryptedMessage);
  } catch (err) {
    return decryptedMessage;
  }
}

/**
 * @description asymmetric encryption
 * @author moha_tangx
 * @abstract
 * @date 22/05/2024
 * @param {any} payload
 * @param {import("crypto").KeyLike} publicKey
 * @param {import("crypto").Encoding} encoding
 * @param {(publicKey:import("crypto").KeyLike,buffer:Buffer)=>Buffer} callback
 * @returns
 */
function enc(payload, publicKey, encoding = "hex", callback) {
  payload = JSON.stringify(payload);
  const buff = Buffer.from(payload);
  const encrypted = callback(publicKey, buff);
  return encrypted.toString(encoding);
}

/**
 * @description asymmetric decryption
 * @author moha_tangx
 * @abstract
 * @date 22/05/2024
 * @param {string} cipherText
 * @param {import("crypto").KeyLike} publicKey
 * @param {import("crypto").Encoding} encoding
 * @param {(publicKey:import("crypto").KeyLike,buffer:Buffer)=>Buffer} callback
 * @returns {string}
 */
function dec(cipherText, publicKey, encoding = "utf8", callback) {
  const buff = Buffer.from(cipherText, "hex");
  const decrypted = callback(publicKey, buff);
  return decrypted.toString(encoding);
}

/**
 * @description contains the methods for public and private asymmetric decryption
 */
export const decrypt = {
  /**
   * @description
   * @author moha_tangx
   * @date 22/05/2024
   * @param {string} cipherText
   * @param {import("crypto").KeyLike} publicKey
   * @param {import("crypto").Encoding} encoding
   * @returns {string}
   */
  public(cipherText, publicKey, encoding = "utf8") {
    return dec(cipherText, publicKey, (encoding = "utf8"), publicDecrypt);
  },

  /**
   *  @description
   * @author moha_tangx
   * @date 22/05/2024
   * @param {string} cipherText
   * @param {import("crypto").KeyLike} privateKey
   * @param {import("crypto").Encoding} encoding
   * @return {string}
   */
  private(cipherText, privateKey, encoding = "utf8") {
    return dec(cipherText, privateKey, (encoding = "utf8"), privateDecrypt);
  },
};

/**
 * @description contains the methods for public and private asymmetric encryption
 */

export const encrypt = {
  /**
   *  @description
   * @author moha_tangx
   * @date 22/05/2024
   * @param {*} payload
   * @param {import("crypto").KeyLike} publicKey
   * @param {import("crypto").Encoding} encoding
   * @return {string}
   */
  public(payload, publicKey, encoding = "hex") {
    return enc(payload, publicKey, encoding, publicEncrypt);
  },

  /**
   *  @description
   * @author moha_tangx
   * @date 22/05/2024
   * @param {*} payload
   * @param {import("crypto").KeyLike} privateKey
   * @param {import("crypto").Encoding} encoding
   * @return {string}
   */
  private(payload, privateKey, encoding = "hex") {
    return enc(payload, privateKey, encoding, privateEncrypt);
  },
};
