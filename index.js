// @ts-check
"use strict";

import { hashSync, compareSync, hash, compare } from "./app/hash.js";

import { createToken, verifyToken } from "./app/jwt.js";

import {
  createKeyPairSync,
  createKeyPair,
  createKey,
  createKeySync,
} from "./app/key.js";

import { sign, verify } from "./app/sign.js";

export {
  hashSync,
  compareSync,
  hash,
  compare,
  createKeyPairSync,
  createKeyPair,
  createKey,
  createKeySync,
  sign,
  verify,
  createToken,
  verifyToken,
};

export default {
  hashSync,
  compareSync,
  hash,
  compare,
  createKeyPairSync,
  createKeyPair,
  createKey,
  createKeySync,
  sign,
  verify,
  createToken,
  verifyToken,
};

createKeyPair((privateKey, publicKey) => {
  console.log(privateKey, publicKey);
});
