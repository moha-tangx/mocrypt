// @ts-check
"use strict";

import { generatePassPhrase } from "./utils/utils.js";

import {
  generateKeyPair,
  generateKeyPairSync,
  generateKey,
  generateKeySync,
  createHmac,
} from "crypto";

/**
 * @description creates a public and private key synchronously using the {@link generateKeyPairSync} function of the node crypto module using the `rsa` algorithm
 * @author moha_tangx
 * @date 17/02/2024
 * @export createKeyPairSync
 * @param {{length: number, encrypted: boolean,passPhrase:string | undefined}} options
 * @example const { privateKey, publicKey } = createKeyPairSync();
  console.log(privateKey);
  console.log(publicKey);
  //logs :-----BEGIN PRIVATE KEY-----
  // MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAOF+cgbNDBZZPsyU
  // 1pZOO+XKszSOQbalB5QP9GIR4WSCMAv4H5L84yjcasgf07fsOuRaTW+9xzYEQfkU
  // eyVxtMiS8xQcWLTIxEvkcdgnyYsAxGm4EyBDj5oMQuio5+Zas35/bzSs3iQLlXlZ
  // imyN1n...36dhs4RmlUEKblyZtOLktDIwwzCrDYQswzwvU1UHutwHTWpED8xtBfRu
  // 1+VWCtxmRuU7iH1ouFdtklEIrDwHgLqUgVIv8Chuk1JO+LvDRGqraQJAPV5xaRn0
  // 2w3ZywQOG+8OMaEdRHN2yRxso6IEaUa2owaE9h26cOeEHXGnoG8T5AoemGIJmbfn
  // 5p0IVCAxJn+PvQ==
  // -----END PRIVATE KEY-----

  // -----BEGIN PUBLIC KEY-----
  // MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDhfnIG...+aDELoqOfmWrN+f280rN4kC5V5WYdSMM7
  // -----END PUBLIC KEY-----
 */
export function createKeyPairSync(
  { length = 1024, encrypted = false, passPhrase = generatePassPhrase() } = {
    length: 1024,
    encrypted: false,
    passPhrase: undefined,
  }
) {
  const { privateKey, publicKey } = generateKeyPairSync("rsa", {
    modulusLength: length, // the length of key in bits
    publicKeyEncoding: {
      type: "spki", // recommended to be 'spki' by the Node.js docs
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8", // recommended to be 'pkcs8' by the Node.js docs
      format: "pem",
      cipher: encrypted ? "aes-256-cbc" : undefined,
      passphrase: encrypted ? passPhrase : undefined,
    },
  });
  return { privateKey, publicKey };
}

/**
 * @description creates a public and private keys asynchronously 
 * @author moha_tangx
 * @date 17/02/2024
 * @export createKeyPair 
 * @param {(privateKey:import("crypto").KeyLike,publicKey:import("crypto").KeyLike)=>void} callback the callback takes the private and public keys as parameters 
 * @param {{length: number, encrypted: boolean,passPhrase:string | undefined}} options
 * @example createKeyPair((privateKey, publicKey) => {
  console.log(privateKey, publicKey);
  });

  // logs 
    //logs :-----BEGIN PRIVATE KEY-----
  // MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAOF+cgbNDBZZPsyU
  // 1pZOO+XKszSOQbalB5QP9GIR4WSCMAv4H5L84yjcasgf07fsOuRaTW+9xzYEQfkU
  // eyVxtMiS8xQcWLTIxEvkcdgnyYsAxGm4EyBDj5oMQuio5+Zas35/bzSs3iQLlXlZ
  // imyN1n...36dhs4RmlUEKblyZtOLktDIwwzCrDYQswzwvU1UHutwHTWpED8xtBfRu
  // 1+VWCtxmRuU7iH1ouFdtklEIrDwHgLqUgVIv8Chuk1JO+LvDRGqraQJAPV5xaRn0
  // 2w3ZywQOG+8OMaEdRHN2yRxso6IEaUa2owaE9h26cOeEHXGnoG8T5AoemGIJmbfn
  // 5p0IVCAxJn+PvQ==
  // -----END PRIVATE KEY-----

  // -----BEGIN PUBLIC KEY-----
  // MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDhfnIG...+aDELoqOfmWrN+f280rN4kC5V5WYdSMM7
  // -----END PUBLIC KEY-----
 */
export async function createKeyPair(
  callback,
  { length = 1024, encrypted = false, passPhrase = generatePassPhrase() } = {
    length: 1024,
    encrypted: false,
    passPhrase: undefined,
  }
) {
  generateKeyPair(
    "rsa",
    {
      modulusLength: length, // the length of your key in bits
      publicKeyEncoding: {
        type: "spki", // recommended to be 'spki' by the Node.js docs
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs8", // recommended to be 'pkcs8' by the Node.js docs
        format: "pem",
        cipher: encrypted ? "aes-256-cbc" : undefined,
        passphrase: encrypted ? passPhrase : undefined,
      },
    },
    (err, publicKey, privateKey) => {
      if (err) return err;
      callback(privateKey, publicKey);
    }
  );
}

/**
 * @description
 * generate a random key using the {@link generateKey} function of the node `crypto` module which internally uses the {@link createHmac} function of the node `crypto` module
 * @author moha_tangx
 * @date 17/02/2024
 * @export createKey
 * @param {(key:import("crypto").KeyLike,err:(Error|null))=>void} callback
 * @param {{length: number, type : "hmac" | "aes",encoding: import("crypto").Encoding}} options
 * @example
 *  await createKey((key,err)=>{
 * console.log(key);
 * });
 * //prints:
 * //65q6e..........620
 */
export async function createKey(
  callback,
  { length = 256, type = "hmac", encoding = "hex" } = {
    length: 256,
    type: "hmac",
    encoding: "hex",
  }
) {
  generateKey(type, { length }, (err, keyObject) => {
    const key = keyObject.export().toString(encoding);
    callback(key, err);
  });
}

/**
 * @description
 * synchronously generates a key with default encoding of `hmac` and a length of 1024.
 * Always consider passing the key to a buffer using the Buffer.from() function when using key outside the mocrypt   module as keys are automatically passed to buffer and the key length is set to a valid length.
 * @author moha_tangx
 * @date 17/02/2024
 * @export createKeySync
 * @param {{type : "hmac" | "aes", length: number , encoding : import("crypto").Encoding}} options
 * @example const key = createKeySync();
 * console.log(key);
 * //logs
 * // 0bb8edf36d92e17307ab845150...281216b59801bdb353e052b826c2e51ea64a0aa8fa9422305c107ede03a5a94edbddb447b6da6d49ad73a5c0cf61177c4c26117685583a92914f0b7cf54356
 * @return {string}
 */
export function createKeySync(
  { type = "hmac", length = 256, encoding = "hex" } = {
    type: "hmac",
    encoding: "hex",
    length: 256,
  }
) {
  const keyObject = generateKeySync(type, { length });
  return keyObject.export().toString(encoding);
}
