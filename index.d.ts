declare module "mocrypt" {
  /**
* @description encrypts a plaintext (can be in any format) to a ciphered Text with a symmetric key
* @author moha_tangx
* @date 21/05/2024
* @param {any} payload text to be encrypted.
* @param {string | Buffer | import("crypto").KeyLike} key symmetric key can be generated from the createKey or createKeySync methods
* @param {{algorithm : string, inputEncoding : import("crypto").Encoding, outputEncoding:import("crypto").Encoding}} options an options object with the structure of : ```{algorithm: string, inputEncoding: import("crypto").Encoding, outputEncoding: import("crypto").Encoding}```
* @return {string}
* @example 
* const plainText =
"almost next test tin start equipment possible previous useful clock particularly door beside ship fierce only do brother pipe chosen donkey drive north stop";

const key = createKeySync(); // key should be kept secret;

const encryptedMessage = symmetricEncrypt(plainText, key);
console.log(encryptedMessage);
// logs: 40342898d80280aa4d4e85f138f456a4847341b1770c3c9557ce0ad9a4e4d6ab6bb251ea8c33d5fbbe3e47f817897eb94498ea01ea916c84792b9dcb4c5921e2556cd76f8a98c7c4f6f26ad832f84844cb3517209200acaae9de002cb91961170b3bb0614c50992b7b84b313013a6840f561edd3d9052237557b23561fd608a3e12174f7f0202f641136c990fa8a8bb8bcae79d30a6f13c1ad8b631ff6a023fd.5c16c59003fe1fe1

*/
  export function symmetricEncrypt(
    payload: any,
    key: string | Buffer | import("crypto").KeyLike,
    options: {
      algorithm: string;
      inputEncoding: import("crypto").Encoding;
      outputEncoding: import("crypto").Encoding;
    }
  ): string;
  /**
* @description decrypts a ciphered text to a plaintext with the symmetric key used in creating the cipher
* @author moha_tangx
* @date 21/05/2024
* @param {string} cipherText
* @param {import("crypto").KeyLike} key
* @param {{algorithm : string ,inputEncoding : import("crypto").Encoding,outputEncoding:import("crypto").Encoding}} options an options object with the structure of : ```{algorithm: string, inputEncoding: import("crypto").Encoding, outputEncoding: import("crypto").Encoding}```
* @return {any}
* @example const plainText =
"almost next test tin start equipment possible previous useful clock particularly door beside ship fierce only do brother pipe chosen donkey drive north stop";

const key = createKeySync(); // key should be kept secret;

const encryptedMessage = symmetricEncrypt(plainText, key);
console.log(encryptedMessage);
// logs: 40342898d80280aa4d4e85f138f456a4847341b1770c3c9557ce0ad9a4e4d6ab6bb251ea8c33d5fbbe3e47f817897eb94498ea01ea916c84792b9dcb4c5921e2556cd76f8a98c7c4f6f26ad832f84844cb3517209200acaae9de002cb91961170b3bb0614c50992b7b84b313013a6840f561edd3d9052237557b23561fd608a3e12174f7f0202f641136c990fa8a8bb8bcae79d30a6f13c1ad8b631ff6a023fd.5c16c59003fe1fe1

const decryptedMessage = symmetricDecrypt(encryptedMessage, key);
console.log(decryptedMessage);
// logs: almost next test tin start equipment possible previous useful clock particularly door beside ship fierce only do brother pipe chosen donkey drive north stop
*/
  export function symmetricDecrypt(
    cipherText: string,
    key: import("crypto").KeyLike,
    options: {
      algorithm: string;
      inputEncoding: import("crypto").Encoding;
      outputEncoding: import("crypto").Encoding;
    }
  ): any;

  /**
   *  @description
   * @author moha_tangx
   * @date 22/05/2024
   * @param {string} cipherText
   * @param {import("crypto").KeyLike} privateKey
   * @param {import("crypto").Encoding} encoding
   * @return {string}
   */
  function privateDec(
    cipherText: string,
    privateKey: import("crypto").KeyLike,
    encoding: import("crypto").Encoding
  ): string;

  /**
   * @description
   * @author moha_tangx
   * @date 22/05/2024
   * @param {string} cipherText
   * @param {import("crypto").KeyLike} publicKey
   * @param {import("crypto").Encoding} encoding
   * @returns {string}
   */
  function publicDec(
    cipherText: string,
    publicKey: import("crypto").KeyLike,
    encoding: import("crypto").Encoding
  ): string;

  /**
   * @description contains the methods for public and private asymmetric decryption
   */
  export interface decrypt {
    public: typeof publicDec;
    private: typeof privateDec;
  }

  /**
   *  @description public encryption
   * @author moha_tangx
   * @date 22/05/2024
   * @param {*} payload
   * @param {import("crypto").KeyLike} publicKey
   * @param {import("crypto").Encoding} encoding
   * @return {string}
   */
  function publicEnc(
    payload: any,
    publicKey: import("crypto").KeyLike,
    encoding: import("crypto").Encoding
  ): string;
  /**
   *  @description private encryption
   * @author moha_tangx
   * @date 22/05/2024
   * @param {*} payload
   * @param {import("crypto").KeyLike} privateKey
   * @param {import("crypto").Encoding} encoding
   * @return {string}
   */
  function privateEnc(
    payload: any,
    privateKey: import("crypto").KeyLike,
    encoding: import("crypto").Encoding
  ): string;

  /**
   * @description contains the methods for public and private asymmetric encryption
   */
  export interface encrypt {
    public: typeof publicEnc;
    private: typeof privateEnc;
  }
  /**
   * @description
   * hashes piece of text (string)  passed as argument **synchronously** (in a blocking code manner)  using the {@link scryptSync } function of the node `crypto` module and returns the **hashed** **salted** text together with the salt in the default encoding of `hex` format separated by a colon.
   * @author moha_tangx
   * @date 17/02/2024
   * @export hashSync
   * @param {string} plainText
   * @param {{encoding:BufferEncoding,length:number}} options
   * @return {string}
   * @example const hashed = hashSync("sensitive");
   * console.log(hashed);
   * //prints
   * //bd72b72cb4e1...e86cdc:9fd0d1a34fe3...b2395d116ed
   */
  export function hashSync(
    plainText: string,
    options: { encoding: BufferEncoding; length: number }
  ): string;

  /**
   * @description
   * compares a plaintext (string) ***synchronously*** to a **hashed** string and returns true if it matches or false if doesn't.
   * It uses the {@link timingSafeEqual} function of the node crypto module for the comparison to prevent timing attack;
   * @author moha_tangx
   * @date 17/02/2024
   * @export compareSync
   * @param {string} hashed the hashed string
   * @param {string} plainText the string to be compared with,
   * @param {{encoding:import("crypto").BinaryToTextEncoding,length:number}} options options object the encoding and length of the hashed string
   * @return {boolean}
   * @example
   * const password = hashSync("myPassword_");
   * const is correctPassword = compareSync(password, "myPassword_");
   * console.log(correctPassword);
   * //prints
   * //true
   */
  export function compareSync(
    hashed: string,
    plainText: string,
    options: { encoding: import("crypto").BinaryToTextEncoding; length: number }
  ): boolean;

  /**
 * @description
 * hashes the piece of `text` (string)  passed as   argument **asynchronously** (in a non-blocking code manner) using the {@link scrypt} function of the node `crypto` module .It takes a callback that takes the hash and error as a parameters and returns the **hashed** **salted*** text together with the salt in the default encoding of `hex` format separated by a colon.
 ** An exception is thrown when hash creation fails.
 ** An exception is thrown when any of the input arguments specify invalid values or types.
 * @author moha_tangx
 * @date 17/02/2024
 * @export
 * @param {import("crypto").BinaryLike} plainText string to be hashed
  the returned hash encoding type
  should be a multiple of 2
  * @param {(hash: string,err:Error|null|undefined) => void} callback
 * @param {{length:number,encoding:BufferEncoding}} options
 * @example hash("some data to hash", (hash) => console.log(hash))
 * // prints :
 * //a814993bf3e...9a56670b50fdcbcecea261:6e8daa7aebbf87736c8b15dd229365372d58072d0fe996360b5fa0586b14730da7a7d8bf61a0af8efa312fbdce4c8f69d9664333d0637c96667573e9dd5b7bc1
 */
  export function hash(
    plainText: import("crypto").BinaryLike,
    callback: (hash: string, err: Error | null | undefined) => void,
    options: { length: number; encoding: BufferEncoding }
  ): string;

  /**
   * @description
   * compares a plaintext (string) **asynchronously** to a **hashed** string and returns Promise object with the value true if it matches or false if doesn't.
   * It uses the {@link timingSafeEqual} function of the node `crypto` module for the comparison to prevent timing attack;
   * @author moha_tangx
   * @date 17/02/2024
   * @param {string} plainText
   * @param {string} hashed
   * @param {(match:boolean,error:Error | null)=>*} callback
   * @param {{length: number,encoding: BufferEncoding,}} options
   * @return
   * @example const password = hashSync("myPassword_");
   * const isValidPassword = await compare("myPassword_",password)
   * console.log(validPassword);
   * //prints:
   * // true
   */
  export function compare(
    hashed: string,
    plainText: string,
    callback: (match: boolean, error: Error | null) => any,
    options: { length: number; encoding: BufferEncoding }
  ): boolean;

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
    payload: any,
    key: import("crypto").KeyLike,
    options: {
      exp_date?: string | number | Date | undefined;
      algorithm?: string;
      encoding?: import("crypto").BinaryToTextEncoding;
    }
  ): {};

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
    token: string,
    key: import("crypto").KeyLike,
    options: {
      algorithm: string;
      encoding: import("node:crypto").BinaryToTextEncoding;
      payload: any;
    }
  ): boolean;

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
  export function createKeyPairSync(options: {
    length: number;
    encrypted: boolean;
    passPhrase: string | undefined;
  }): import("crypto").KeyLike;

  /**
 * @description creates a public and private keys asynchronously 
 * @author moha_tangx
 * @date 17/02/2024
 * @export createKeyPair 
 *  @param {(error:Error,privateKey:import("crypto").KeyLike,publicKey:import("crypto").KeyLike,passPhrase?:string)=>void} callback the callback takes the private and public keys as parameters 
 * @param {{algorithm:"rsa"|"dsa"|"ec"|"res-pss"|"x448"|"x25519"|"ed25519"|"ed448",
 * length: number, 
 * encrypted: boolean,
 * passPhrase:string | undefined}} options
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
  export function createKeyPair(
    callback: (
      error: Error,
      privateKey: import("crypto").KeyLike,
      publicKey: import("crypto").KeyLike,
      passPhrase?: string
    ) => void,
    options: {
      algorithm:
        | "rsa"
        | "dsa"
        | "ec"
        | "res-pss"
        | "x448"
        | "x25519"
        | "ed25519"
        | "ed448";
      length: number;
      encrypted: boolean;
      passPhrase: string | undefined;
    }
  ): import("crypto").KeyLike;

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
  export function createKey(
    callback: (key: import("crypto").KeyLike, err: Error | null) => void,
    options: {
      length: number;
      type: "hmac" | "aes";
      encoding: import("crypto").Encoding;
    }
  ): import("crypto").KeyLike;
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
  export function createKeySync(options: {
    type: "hmac" | "aes";
    length: number;
    encoding: import("crypto").Encoding;
  }): string;

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
  function sign(
    payload: object,
    privateKey: import("crypto").KeyLike,
    options: {
      algorithm: "rsa-sha256";
      encoding: "hex";
    }
  ): { signature: string; payload: string };

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
    signature: string,
    payload: string,
    Key: import("crypto").KeyLike | import("crypto").JsonWebKeyInput,
    options: {
      algorithm: string;
      encoding: import("crypto").BinaryToTextEncoding;
    }
  ): boolean;
}
