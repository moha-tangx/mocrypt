// @ts-check
"use strict";

import { generateKeyPair, randomBytes, generateKey } from "crypto";

/**
 * @description
 * generate a random key using the {@link generateKey} function of the node `crypto` module which internally uses the {@link createHmac} function of the node `crypto` module
 * @author moha_tangx
 * @date 17/02/2024
 * @export createKey
 * @param {{length: number, type : "hmac" | "aes",encoding: import("crypto").Encoding}} options
 * @example
 * const key = await createKey();
 * console.log(key)
 * //logs:
 * //65q6e..........620
 */
export async function createKey(
  { length = 256, type = "hmac", encoding = "hex" } = {
    length: 256,
    type: "hmac",
    encoding: "hex",
  }
) {
  return new Promise((resolve, reject) => {
    generateKey(type, { length }, (err, keyObject) => {
      const key = keyObject.export().toString(encoding);
      if (err) reject(err);
      resolve(key);
    });
  });
}

/**
 * @description creates a public and private keys asynchronously 
 * @author moha_tangx
 * @date 17/02/2024
 * @export createKeyPair 
 * @param {{algorithm:"rsa"|"dsa"|"ec"|"res-pss"|"x448"|"x25519"|"ed25519"|"ed448",
 * length: number, 
 * encrypted: boolean,
 * passPhrase:string | undefined}} options
 * @example   const {publicKey,privateKey} = await createKeyPair();
 * console.log(publicKey,privateKey);
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
  {
    algorithm = "rsa",
    length = 1024,
    encrypted = false,
    passPhrase = randomBytes(256).toString("hex"),
  } = {
    algorithm: "rsa",
    length: 1024,
    encrypted: false,
    passPhrase: undefined,
  }
) {
  return new Promise((resolve, reject) => {
    generateKeyPair(
      // @ts-ignore
      algorithm,
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
        if (err) reject(err);
        if (encrypted) {
          resolve({ privateKey, publicKey, passPhrase });
        } else {
          resolve({ privateKey, publicKey });
        }
      }
    );
  });
}
