// @ts-check
"use strict";

import { sign, verify } from "./sign.js";
import { createDate } from "./utils/utils.js";

/**
 * @param {any} id
 * @param {string} payload
 * @param {import("crypto").KeyLike} key
 */

/**
 * @description creates a jsonwebtoken with an id, payload and an expiry date. 
 *  A private key is needed for signing the payload
 *  @example const { privateKey } = createKeyPairSync();

const payload =
  "street known powder plates wall produce tip congress without balloon sand political note hurried combination choice buried particular radio feathers sale closely widely sudden";

const id = { id: "1751af46-ec16-5b6b-b130-7caab8c8d3aa" };

const token = createToken(id, payload, privateKey, "24hrs");

console.log(token);

//logs
//7b226964223a2231373531616634362d656331362d356236622d623133302d376361616238633864336161227d.7c6ca8....
 
 * @param {any} id
 * @param {any} payload
 * @param {import("crypto").KeyLike} key
 * @param {string|number} exp
 * @returns {string}
 */
export function createToken(id, payload, key, exp) {
  const identifier = Buffer.from(JSON.stringify(id)).toString("hex");
  const expDate = Buffer.from(createDate(exp).toString()).toString("hex");
  const signed = sign(payload, key).split(":")[1];
  const token = `${identifier}.${signed}.${expDate}`;
  return token;
}

/**
 *@description  verifies a jsonwebtoken created by the createToken function and returns a verifier function in the format of  `{
    id: any: id passed,
    exp_date: dateObject :the expiry date of the token,
    expired: boolean :if the token has expired or not,
    verified: boolean :if the token is valid or not,
 }`
 * @example const { privateKey } = createKeyPairSync();
    const payload =
      "street known powder plates wall produce tip congress without balloon sand political note hurried combination choice buried particular radio feathers sale closely widely sudden";

    const id = { id: "1751af46-ec16-5b6b-b130-7caab8c8d3aa" };

    const token = createToken(id, payload, privateKey, "24hrs");

    const verifier = verifyToken(token, privateKey, () => payload);

    console.log(verifier);

    //logs

    // {
    //   id: { id: '1751af46-ec16-5b6b-b130-7caab8c8d3aa' },
    //   exp_date: 2024-04-26T18:20:03.000Z,
    //   expired: false,
    //   verified: true
    // }
 * @param {string} token a jsonwebtoken created by the {@link createToken} function
 * @param {import("crypto").KeyLike} key this could be a private key or a public key
 * @param {(id:any)=>string} callBack the callback takes the of the verified token as a parameter if you need to do     some operations to get the secret payload or ignore the id parameter and return the secret payload
 */
export function verifyToken(token, key, callBack) {
  const [identifier, signature, expDate] = token.split("."),
    id = Buffer.from(identifier, "hex").toString("utf-8"),
    exp = Buffer.from(expDate, "hex").toString("utf-8"),
    secret = callBack(JSON.parse(id)),
    payload = `${secret}:${signature}`,
    exp_date = new Date(exp),
    verified = verify(payload, key),
    expired = new Date() > exp_date;

  return {
    id: JSON.parse(id),
    exp_date,
    expired,
    verified,
  };
}
