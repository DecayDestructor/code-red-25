
const SECRET_KEY = "default-secret-key"; // Use the same key as in store.js

function decryptData(encryptedData) {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error("Error decrypting cookie:", error);
    return null;
  }
}

function getGameProgress() {
  const cookies = document.cookie.split("; ");
  const gameProgressCookie = cookies.find(row => row.startsWith("gameProgress="));

  if (gameProgressCookie) {
    const encryptedValue = gameProgressCookie.split("=")[1];
    return decryptData(decodeURIComponent(encryptedValue)) || {};
  }
  return {};
}

function checkAccess() {
  const gameProgress = getGameProgress();
  const unlockedLevels = gameProgress.unlockedLevels || {};
  const latestUnlockedLevel = gameProgress.latestUnlockedLevel || "level_1"; // Default to level_1

  if (!unlockedLevels["level_5a"]) {
    // console.warn("Access denied: level_5A is locked! Redirecting to last unlocked level...");
    window.location.href = `/${latestUnlockedLevel}`; // Redirect to last unlocked level
  } else {
    // console.log("Access granted: level_5A is unlocked!");
  }
}

checkAccess();
