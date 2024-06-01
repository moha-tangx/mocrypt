declare module "mocrypt/promises" {
  /**
     * @description
     * hashes the piece of `text` (string)  passed as   argument **asynchronously** (in a non-blocking code manner) using the {@link scrypt} function of the node `crypto` module .resolves the **hashed** **salted*** text together with the salt in the default encoding of `hex` format separated by a colon.
     ** the promise is when hash creation fails.
     ** An exception is thrown when any of the input arguments specified are invalid values or types.
     * @author moha_tangx
     * @date 1/06/2024
     * @export
     * @param {import("crypto").BinaryLike} plainText string to be hashed
      the returned hash encoding type
      should be a multiple of 2
     * @param {{length:number,encoding:BufferEncoding}} options
     * @example const hashed = await hash("some data to hash");
     *console.log(hashed); 
     * // prints :
     * //a814993bf3e...9a56670b50fdcbcecea261:6e8daa7aebbf87736c8b15dd229365372d58072d0fe996360b5fa0586b14730da7a7d8bf61a0af8efa312fbdce4c8f69d9664333d0637c96667573e9dd5b7bc1
     */
  export function hash(
    plainText: import("crypto").BinaryLike,
    options: { length: number; encoding: BufferEncoding }
  ): Promise<string>;
  /**
   * @description
   * compares a plaintext (string) **asynchronously** to a **hashed** string and returns Promise object resolving with the value true if it matches or false if doesn't.
   * It uses the {@link timingSafeEqual} function of the node `crypto` module for the comparison to prevent timing attack;
   * @author moha_tangx
   * @date 1/06/2024
   * @param {string} plainText
   * @param {string} hashed
   * @param {{length: number,encoding: BufferEncoding,}} options
   * @return
   * @example const password = hashSync("myPassword_");
   * const isValidPassword = await compare(password,"myPassword_")
   * console.log(validPassword);
   * //prints:
   * /
   **/
  export function compare(
    hashed: string,
    plainText: string,
    options: { length: number; encoding: BufferEncoding }
  ): Promise<boolean>;
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
  export function createKey(options: {
    length: number;
    type: "hmac" | "aes";
    encoding: import("crypto").Encoding;
  }): Promise<string>;
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
  export function createKeyPair(options: {
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
  }): Promise<string>;
}
