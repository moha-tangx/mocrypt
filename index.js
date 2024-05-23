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

import {
  symmetricEncrypt,
  symmetricDecrypt,
  encrypt,
  decrypt,
} from "./app/encrypt.js";

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
  symmetricEncrypt,
  symmetricDecrypt,
  encrypt,
  decrypt,
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
  encrypt,
  decrypt,
};
