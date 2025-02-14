import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

const SECRET_KEY = "your-secret-key"; // Store this securely, not in frontend!

// Encrypt data before storing in cookies
export const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// Decrypt stored cookie data
export const decryptData = (encryptedData) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    return null; // Return null if decryption fails
  }
};

// Save encrypted game progress in cookies
export const saveGameProgress = (levelCompleted) => {
  const encryptedData = encryptData({ levelCompleted });
  Cookies.set("gameProgress", encryptedData, { expires: 7, secure: true, sameSite: 'Strict' });
};

// Load game progress from cookies
export const loadGameProgress = () => {
  const encryptedData = Cookies.get("gameProgress");
  return encryptedData ? decryptData(encryptedData) : { levelCompleted: 0 };
};
