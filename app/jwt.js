// @ts-check
"use strict";

import { sign } from "./sign.js";
import { createDate } from "./utils/utils.js";
import { createVerify } from "node:crypto";

/**
 * @description creates a jsonwebtoken with an id, payload and an expiry date. 
 *  A private key is needed for signing the payload
 *  @example const { privateKey } = createKeyPairSync();

const payload =
  "street known powder plates wall produce tip congress without balloon sand political note hurried combination choice buried particular radio feathers sale closely widely sudden";


const token = createToken(payload, privateKey,{exp_date:"24hrs"});

console.log(token);

//logs
//7b226964223a2231373531616634362d656331362d356236622d623133302d376361616238633864336161227d.7c6ca8....
 
 * @param {any} payload
 * @param {import("crypto").KeyLike} key
 * @param {{exp_date?:string|number|Date|undefined,algorithm?:string,encoding?:import("crypto").BinaryToTextEncoding}} options
 * @returns {string}
 */
export function createToken(
  payload,
  key,
  { exp_date = undefined, algorithm = "rsa-sha256", encoding = "hex" } = {
    exp_date: undefined,
    algorithm: "rsa-sha256",
    encoding: "hex",
  }
) {
  const expDate =
    exp_date && Buffer.from(createDate(exp_date).toString()).toString(encoding);
  payload = JSON.stringify(payload);
  const signed = sign(payload, key, {
    algorithm,
    encoding,
  })
    .split(":")
    .at(-1);
  const encodedPayload = Buffer.from(payload).toString(encoding);
  const token = expDate
    ? `${encodedPayload}.${signed}.${expDate}`
    : `${encodedPayload}.${signed}`;
  return token;
}

/**
 *@description  verifies a jsonwebtoken created by the createToken function and returns a verifier object in the format of  `{
    exp_date: dateObject :the expiry date of the token,
    expired: boolean :if the token has expired or not,
    verified: boolean :if the token is valid or not,
 }`
 * @example const { privateKey } = createKeyPairSync();
    const payload =
      "street known powder plates wall produce tip congress without balloon sand political note hurried combination choice buried particular radio feathers sale closely widely sudden";

    const token = createToken(payload, privateKey, "24hrs");

    const verifier = verifyToken(token, privateKey, {payload});

    console.log(verifier);

    //logs

    // {
    //   exp_date: 2024-04-26T18:20:03.000Z,
    //   expired: false,
    //   verified: true
    // }
 * @param {string} token a jsonwebtoken created by the {@link createToken} function
 * @param {import("crypto").KeyLike} key this could be a private key or a public key
 * @param {{ algorithm :string, encoding :import("node:crypto").BinaryToTextEncoding,payload:* }} options 
    */
export function verifyToken(
  token,
  key,
  { algorithm = "rsa-sha256", encoding = "hex", payload = undefined } = {
    algorithm: "rsa-sha256",
    encoding: "hex",
    payload: undefined,
  }
) {
  const [encodedPayload, signature, expDate] = token.split(".");
  if (!payload) {
    payload = Buffer.from(encodedPayload, encoding).toString("utf8");
  }
  payload = JSON.stringify(payload);
  const exp = expDate && Buffer.from(expDate, encoding).toString("utf8");
  const exp_date = exp ? new Date(exp) : null;
  const verifier = createVerify(algorithm).update(payload);
  const verified = verifier.verify(key, signature, encoding);
  const expired = exp_date ? new Date() > exp_date : false;
  return {
    exp_date,
    expired,
    verified,
  };
}
