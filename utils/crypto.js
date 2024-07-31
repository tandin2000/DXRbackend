import crypto from 'crypto';

const IV_LENGTH = 16;

const encryptString = (text) => {
  let iv = crypto.randomBytes(IV_LENGTH);
  let cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(process.env.CRYPTO_ENCRYPT_KEY),
    iv
  );
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
};

const decryptString = (text) => {
  let textParts = text.split(":");
  let iv = Buffer.from(textParts.shift(), "hex");
  let encryptedText = Buffer.from(textParts.join(":"), "hex");

  try {
    let decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(process.env.CRYPTO_ENCRYPT_KEY),
      iv
    );
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  } catch (error) {
    logger.error(`decryptString utils: ${err.message}`);
    return null;
  }
};

const cryptoUtil = { encryptString, decryptString };
export default cryptoUtil;
