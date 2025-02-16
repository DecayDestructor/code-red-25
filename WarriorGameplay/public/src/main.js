import { k } from "/src/kaboomLoader.js";
import { room1 } from "/src/scenes/room1.js";
import { room2 } from "/src/scenes/room2.js";
import { setBackgroundColor } from "/src/scenes/roomUtils.js";
import { makeNotificationBox } from "/src/ui/notificationBox.js";
// import CryptoJS from "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js";

const SECRET_KEY = "default-secret-key"; // Same key as in store.js

function decryptData(encryptedData) {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error("Error decrypting cookie:", error);
    return null;
  }
}

function encryptData(data) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
}

function getGameProgress() {
  const cookies = document.cookie.split("; ");
  const gameProgressCookie = cookies.find((row) => row.startsWith("gameProgress="));

  if (gameProgressCookie) {
    const encryptedValue = gameProgressCookie.split("=")[1];
    return decryptData(decodeURIComponent(encryptedValue)) || {};
  }
  return { unlockedLevels: {}, latestUnlockedLevel: "level_1" };
}

function updateGameProgress(levelToUnlock) {
  const gameProgress = getGameProgress();

  // Unlock the level
  gameProgress.unlockedLevels[levelToUnlock] = true;
  // gameProgress.unlockedLevels["level5a"] = false;
  gameProgress.latestUnlockedLevel = levelToUnlock;

  // Encrypt and store in cookies
  const encryptedData = encryptData(gameProgress);
  document.cookie = `gameProgress=${encodeURIComponent(encryptedData)}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/; Secure; SameSite=Strict`;

  console.log(`Unlocked level: ${levelToUnlock}`);
}


async function main() {
  const room1Data = await (await fetch("./maps/room1.json")).json();
  const room2Data = await (await fetch("./maps/room2.json")).json();

  k.scene("room1", (previousSceneData) => {
    room1(k, room1Data, previousSceneData);
  });
  k.scene("room2", (previousSceneData) => {
    room2(k, room2Data, previousSceneData);
  });

  k.scene("final-exit", () => {
    setBackgroundColor(k, "#20214a");
    k.add(makeNotificationBox(k, "Press Enter to proceed."));

    k.onKeyPress("enter", () => {
      // console.log("Unlocking level_6_1 and updating cookies...");
      updateGameProgress("level_6_1");
      window.location.href = "./backstory_level_6_1";
    });
  });
}

k.scene("intro", () => {
  setBackgroundColor(k, "#20214a");
  k.add(
    makeNotificationBox(
      k,
      "Escape the factory!\nUse A, D to move, W to jump, Left Click to attack.\nPress Enter to start!"
    )
  );
  k.onKeyPress("enter", () => {
    const context = new AudioContext();
    context.resume();
    k.go("room1", { exitName: null });
  });
});

k.go("intro");

main();


