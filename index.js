// @ts-check
"use strict";

import hasher, { compare, compareSync, hash, hashSync } from "./app/hash.js";

import jwt, { createToken, verifyToken } from "./app/jwt.js";

import keys, {
  createKey,
  createKeyPair,
  createKeyPairSync,
  createKeySync,
} from "./app/key.js";

import signer, { sign, verify } from "./app/sign.js";

import encryptor, {
  decrypt,
  encrypt,
  symmetricDecrypt,
  symmetricEncrypt,
} from "./app/encrypt.js";

export {
  compare,
  compareSync,
  createKey,
  createKeyPair,
  createKeyPairSync,
  createKeySync,
  createToken,
  decrypt,
  encrypt,
  hash,
  hashSync,
  sign,
  symmetricDecrypt,
  symmetricEncrypt,
  verify,
  verifyToken,
};

export default {
  encryptor,
  hasher,
  jwt,
  keys,
  signer,
};
