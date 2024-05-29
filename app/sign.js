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
 * @param {import("crypto").KeyLike} privateKey your private key *recommended to be kept secret*
 * @param {{algorithm: string,encoding:import("crypto").BinaryToTextEncoding}}  options 
 * option the encoding the signature is outputted default to **hex** the signing algorithm 
 * default to **rsa-sha256**
 * @returns {{signature:string,payload:string}}
 * @example
 * const keys = createKeyPairSync();
const { privateKey, publicKey } = keys;

let cookie = "some cookie to be sent to the user";

const signature = sign(cookie, privateKey);

console.log(signature);
// prints
// some cookie to be sent to the user:1cac5e9751ca06feed37ff0894b7f5d9a1f9b51...14544bf6a15ebf5a034faffb2824e04c816a4c7ce76af89be78a2382e79ef5d933751da82b3d46a100e5914b16b604af08c8f4afe3c5d269d90cc9a0
 */
export function sign(
  payload,
  privateKey,
  { algorithm = "rsa-sha256", encoding = "hex" } = {
    algorithm: "rsa-sha256",
    encoding: "hex",
  }
) {
  payload = JSON.stringify(payload);
  const signer = createSign(algorithm).update(payload);
  const signature = signer.sign(privateKey, encoding);
  return { signature, payload };
}

// VERIFY
/**
 * @description
 * verifies a  signature ( signed string) with a public key a private key can also be used to verify the signature
 * @author moha_tangx
 * @date 17/02/2024
 * @param {string} signature  includes the initial string and the signature
 * @param {string} payload  includes the initial string and the signature
 * @param {import("crypto").KeyLike|import("crypto").JsonWebKeyInput} Key the public key or private key of the privatekey keyPair used in signing the string 
 * @param {{algorithm:string,encoding:import("crypto").BinaryToTextEncoding}} options
 * @return {boolean}
 * @example
 * const keys = createKeyPairSync();
const { privateKey, publicKey } = keys;

let cookie = "some cookie to be sent to the user";

const signature = sign(cookie, privateKey);
const isVerified = verify(signature, publicKey);
console.log(signature);
console.log(isVerified);
// prints
// true
 */
export function verify(
  signature,
  payload,
  Key,
  { algorithm = "rsa-sha256", encoding = "hex" } = {
    algorithm: "rsa-sha256",
    encoding: "hex",
  }
) {
  if (typeof payload !== "string") {
    payload = JSON.stringify(payload);
  }
  const verifier = createVerify(algorithm).update(payload);
  const isVerified = verifier.verify(Key, signature, encoding);
  return isVerified;
}
