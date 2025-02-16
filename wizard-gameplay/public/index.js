const submitBtn = document.querySelector('.ans_btn')
// console.log(submitBtn);
// import axios from '../src/utils/api'
import checkAnswer from '../src/utils/checkAnswer.js'


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
  return { unlockedLevels: {}, latestUnlockedLevel: "level1" };
}

function updateGameProgress(levelToUnlock) {
  const gameProgress = getGameProgress();

  // Unlock the level
  gameProgress.unlockedLevels[levelToUnlock] = true;
  // gameProgress.unlockedLevels["level5"] = false;
  gameProgress.latestUnlockedLevel = levelToUnlock;

  // Encrypt and store in cookies
  const encryptedData = encryptData(gameProgress);
  document.cookie = `gameProgress=${encodeURIComponent(encryptedData)}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/; Secure; SameSite=Strict`;

  console.log(`Unlocked level: ${levelToUnlock}`);
}

submitBtn.addEventListener('click', async (e) => {
  const answer1 = document.querySelector('.ans_1')
  const answer2 = document.querySelector('.ans_2')
  const answer3 = document.querySelector('.ans_3')

  /////Sending the post request to the API//////
  //   const id = localStorage.getItem('id') || 1
  //   try {
  //     const response = await fetch(`answers/check-answer/wizard/5`, {
  //       method: 'POST',
  //       body: {
  //         teamId: id,
  //         //The elements of the answer array should be in the same order:
  //         //answer1 , answer2 and then answer3
  //         answer: [answer1, answer2, answer3],
  //       },
  //     })

  //     if (!response.ok) {
  //       throw new Error(`Response status: ${response.status}`)
  //     }

  //     const json = await response.json()

  //     //Routing to next level is answer is correct otherwise not
  try {
    const { correct } = await checkAnswer(
      answer1.append(answer2.append(answer3)),
      '5'
    )
    if (correct) {
      updateGameProgress("level6");
      window.location.href = '/level6'
    }
  } catch (e) {
    console.log(`Error while sending request : ${e}`)
  }
})
