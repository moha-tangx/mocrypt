// @ts-check
"use strict";

import { createSign, createVerify } from "crypto";

//SIGN
/**
 * @description
 * signs string and returns the signature;
 * It takes four arguments where algorithm and encoding are defaulted to ***`rsa-sha256`*** and ***`hex`*** respectively
 * @author moha_tangx
 * @date 17/02/2024
 * @param {object} payload data to be signed it is converted to string before being signed
 * @param {import("crypto").KeyLike} privateKey your private key *recommended to be in an environment variable*
 * @param {import("crypto").BinaryToTextEncoding}[encoding="hex"] the encoding the signature is      outputted default to **hex**
 * @param {string} [algorithm="rsa-sha256"] the signing algorithm default to **rsa-sha256**
 * @returns {string}
 * @example
 * const keys = createKeysSync(128);
const { privateKey, publicKey } = keys;

let cookie = "some cookie to be sent to the user";

const signature = Sign(cookie, privateKey);
const isVerified = verify(cookie, publicKey, signature);
console.log(isVerified);
// prints
// true
 */
export function sign(
  payload,
  privateKey,
  algorithm = "rsa-sha256",
  encoding = "hex"
) {
  if (typeof payload !== "string") payload = JSON.stringify(payload);
  const signer = createSign(algorithm).update(payload);
  const signature = signer.sign(privateKey, encoding);
  return `${payload}:${signature}`;
}

// VERIFY
/**
 * @description
 * verifies a  signature ( signed string) with a public key
 * @author moha_tangx
 * @date 17/02/2024
 * @param {string} token
 * @param {import("crypto").KeyLike|import("crypto").JsonWebKeyInput} publicKey
 * @param {string} [algorithm="rsa-sha256"]
 * @param {import("crypto").BinaryToTextEncoding} [encoding="hex"]
 * @return {boolean}
 * @example
 * const keys = createKeysSync(128);
const { privateKey, publicKey } = keys;

let cookie = "some cookie sent to the user";

const signature = Sign(cookie, privateKey);
const isVerified = verify(cookie, publicKey, signature);
console.log(isVerified);
// prints
// true
 */
export function verify(
  token,
  publicKey,
  algorithm = "rsa-sha256",
  encoding = "hex"
) {
  const [payload, signature] = token.split(":");
  const verifier = createVerify(algorithm).update(payload);
  const isVerified = verifier.verify(publicKey, signature, encoding);
  return isVerified;
}
