# MOCRYPT

Mocrypt is a library built on top of the **node crypto** module that provides utility function to provide cryptographic functionalities such as hashing and verification of hash, encryption and decryption ,signing and verification and more.

The module intends to provide basic functionalities of hashing, symmetric and asymmetric keys generation, encryption, signing and signature verification and jsonwebtoken implementation.

Mocrypt provides high level of customization and make some rational decisions on choosing the algorithms and other choices that will suite majority of users. Most of the methods provided have a synchronous and asynchronous versions.

- the synchronous version of the function returns the generated value (hash|token|key|cipher).
- while the asynchronous versions takes a callback that takes the value (hash|token|key|cipher) as parameter.
  For having full control and customization on those functionalities, using the crypto node module would be a better option.

## METHODS:

- compare
- compareSync
- createKey
- createKeyPair
- createKeyPairSync
- createKeySync
- createToken
- hash
- hashSync
- private
- public
- sign
- symmetricDecrypt
- symmetricEncrypt
- verify
- verifyToken

## OBJECTS

- decrypt
- encrypt

## USAGE:

### Hashing and verifying a hash

- synchronous

  hashes piece of text (string) passed as argument **synchronously** (in a blocking code manner) using the {@link scryptSync } function of the node `crypto` module and returns the **hashed** **salted** text together with the salt in the default encoding of `hex` format separated by a colon.

```js
import {hashSync, compareSync} from "mocrypt";

const sensitive = "some sensitive data to be ciphered"
const hashed = hashSync(sensitive);
 console.log(hashed);
//logs:
//bd72b72cb4e1...e86cdc:9fd0d1a34fe3...b2395d116ed

 const password = hashSync("myPassword_");
 const is correctPassword = compareSync(password, "myPassword_");
 console.log(correctPassword);
 //logs:
 //true
```

- asynchronous

  compares a plaintext (string) **_synchronously_** to a **hashed** string and returns true if it matches or false if doesn't.

```js
import { hash, compare } from "mocrypt";

hash("some data to hash", (hash) => console.log(hash));
// logs:
//a814993bf3e...9a56670b50fdcbcecea261:6e8daa7aebbf87736c8b15dd229365372d5...2d0fe996360b5fa05864333d0637c96667573e9dd5b7bc1

const password = hashSync("myPassword_");
const isValidPassword = await compare("myPassword_", password);
console.log(validPassword);
//logs:
// true
```

### Signing and Verifying a payload

`Signing payload`

signs string synchronously and returns the signature;
It takes four arguments where algorithm and encoding are defaulted to **_`rsa-sha256`_** and **_`hex`_** respectively

```js
import { createKeyPairSync, sign } from "mocrypt";

const keys = createKeyPairSync();
const { privateKey, publicKey } = keys;

const cookie = "some cookie to be sent to the user";

const signature = sign(cookie, privateKey);
console.log(signature);

// logs:
//some cookie to be sent to the user:953e3bd73233e1463aaaef90e7...a3de9a8a37b9b6a77019e22f5f487fc48f658eff7bc8dd94aacf1921a574a05bae05d13aec7b4479b204004d05e6d7
```

`verifying a signature`

verifies a signature ( signed string) with a public key a private key can also be used to verify the signature

```js
import { verify, createKeyPairSync, sign } from "mocrypt";

const keys = createKeyPairSync();
const { privateKey, publicKey } = keys;

const cookie = "some cookie to be sent to the user";

// create the signature using the sign method
const signature = sign(cookie, privateKey);

//verifying the signature
const verified = verify(signature, publicKey);
console.log(verified);

//logs:
//true
```

### Generating and verifying jsonwebtoken

`creating a jsonwebtoken`

creates a jsonwebtoken with an id, payload and an expiry date.
A private key is needed for signing the payload

```js
import { createToken } from "mocrypt";

const payload =
  "street known powder plates wall produce tip congress without balloon sand political note hurried combination choice buried particular radio feathers sale closely widely sudden";

const id = { id: "1751af46-ec16-5b6b-b130-7caab8c8d3aa" };

const token = createToken(id, payload, privateKey, "24hrs");

console.log(token);

//logs:
//7b226964223a2231373531616634362d656331362d356236622d623133302d376361616238633864336161227d.7c6ca8....
```

`verifying jsonwebtoken`

verifies a jsonwebtoken created by the createToken function and returns a verifier function in the format of

```js
{
  id: any; // id passed,
  exp_date: dateObject; //the expiry date of the token,
  expired: boolean; //if the token has expired or not,
  verified: boolean; //if the token is valid or not,
}
```

```js
import { createToken, verifyToken } from "mocrypt";

const { privateKey } = createKeyPairSync();
const payload =
  "street known powder plates wall produce tip congress without balloon sand political note hurried combination choice buried particular radio feathers sale closely widely sudden";

const id = { id: "1751af46-ec16-5b6b-b130-7caab8c8d3aa" };

const token = createToken(id, payload, privateKey, "24hrs");

const verifier = verifyToken(token, privateKey, (id) => payload);

console.log(verifier);

//logs:
// {
//   id: { id: '1751af46-ec16-5b6b-b130-7caab8c8d3aa' },
//   exp_date: 2024-04-26T18:20:03.000Z,
//   expired: false,
//   verified: true
// }
```

### Creating symmetric key

- synchronous

```js
import { createKeySync } from "mocrypt";

const key = createKeySync();
console.log(key);
//logs:
// 0bb8edf36d92e17307ab845150...281216b59801bdb353e052b826c2e51ea64a0aa305c107ede03a
```

- asynchronous
  generate a random key using the generateKey function of the node `crypto` module which internally uses the createHmac function of the node `crypto` module

```js
import { createKey } from "mocrypt";

createKey((key, err) => {
  console.log(key);
});
//logs:
//65q6e307ab845150..........6206d49ad73a5c0cf61177c4c2611681216b59801bdb35c0cf61177c
```

### Creating asymmetric key pairs

- synchronous

creates a public and private key synchronously using the generateKeyPairSync function of the node crypto module using the `rsa` algorithm

```js
import { createKeyPairSync } from "mocrypt";

const { privateKey, publicKey } = createKeyPairSync();
console.log(privateKey);
console.log(publicKey);
//logs :
//-----BEGIN PRIVATE KEY-----
// MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAOF+cgbNDBZZPsyU
// 1pZOO+XKszSOQbalB5QP9GIR4WSCMAv4H5L84yjcasgf07fsOuRaTW+9xzYEQfkU
// eyVxtMiS8xQcWLTIxEvkcdgnyYsAxGm4EyBDj5oMQuio5+Zas35/bzSs3iQLlXlZ
// imyN1n...5xaRn02w3ZywQOG+8OMaEdRHN2y6IEaUa2owaE9h26cOeEHXGnoG8T5
// -----END PRIVATE KEY-----

// -----BEGIN PUBLIC KEY-----
// MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDhfnIG...+aDELoqOfmWrN+f280rN4kC5V5WYdSMM7
// -----END PUBLIC KEY-----
```

- asynchronous

creates a public and private keys asynchronously

```js
import {createKeyPair} from "mocrypt";

createKeyPair((privateKey, publicKey) => {
  console.log(privateKey, publicKey);
  });
  //logs :
  //-----BEGIN PRIVATE KEY-----
  // MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAOF+cgbNDBZZPsyU
  // 1pZOO+XKszSOQbalB5QP9GIR4WSCMAv4H5L84yjcasgf07fsOuRaTW+9xzYEQfkU
  // eyVxtMiS8xQcWLTIxEvkcdgnyYsAxGm4EyBDj5oMQuio5+Zas35/bzSs3iQLlXlZ
  // imyN1n...5xaRn02w3ZywQOG+8OMaEdRHN2y6IEaUa2owaE9h26cOeEHXGnoG8T5
  // -----END PRIVATE KEY-----

  // -----BEGIN PUBLIC KEY-----
  // MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDhfnIG...+aDELoqOfmWrN+f280rN4kC5V5WYdSMM7
  // -----END PUBLIC KEY-----
 */
```
