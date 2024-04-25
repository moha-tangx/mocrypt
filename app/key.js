// @ts-check
"use strict";

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
 * @param {number} [length=1024]
 * @return {{privateKey:import("crypto").KeyLike,publicKey:import("crypto").KeyLike}}
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
export function createKeyPairSync(length = 1024) {
  const { privateKey, publicKey } = generateKeyPairSync("rsa", {
    modulusLength: length, // the length of key in bits
    publicKeyEncoding: {
      type: "spki", // recommended to be 'spki' by the Node.js docs
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8", // recommended to be 'pkcs8' by the Node.js docs
      format: "pem",
      // cipher: "aes-256-cbc",
    },
  });
  return { privateKey, publicKey };
}

/**
 * @description creates a public and private keys asynchronously 
 * @author moha_tangx
 * @date 17/02/2024
 * @export createKeyPair
 * @param {number} [length=1024] the length of the key to be created it must be at least ***512*** defaults to 1024
 * @param {(privateKey:import("crypto").KeyLike,publicKey:import("crypto").KeyLike)=>void} callback the callback takes the private and public keys as parameters 
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
export async function createKeyPair(callback, length = 1024) {
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
 * @param {"hmac"|"aes"} [type="hmac"]
 * @param {number} [length=128]
 * @returns { Promise <any>}
 * @example
 *  await createKey((err,key)=>{
 * console.log(key);
 * });
 * //prints:
 * //65q6e..........620
 */
export async function createKey(callback, length = 1024, type = "hmac") {
  generateKey(type, { length }, (err, keyObject) => {
    const key = keyObject.export().toString("hex");
    callback(key, err);
  });
}

/**
 * @description
 * synchronously generates a key with default encoding of `hmac` and a length of 1024
 * @author moha_tangx
 * @date 17/02/2024
 * @export createKeySync
 * @param {"hmac"|"aes"} [type="hmac"]
 * @param {number} [length=1024]
 * @return {string}
 */
export function createKeySync(type = "hmac", length = 1024) {
  const keyObject = generateKeySync(type, { length });
  return keyObject.export().toString("hex");
}
