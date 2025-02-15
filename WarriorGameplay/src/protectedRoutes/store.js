import { configureStore, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import { combineReducers } from 'redux';
import { LEVEL_MAP } from './levelRoutes';

const SECRET_KEY = import.meta.env.ENCRYPTION_KEY || "default-secret-key";

// Encrypt data before storing in cookies
const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// Decrypt stored cookie data
const decryptData = (encryptedData) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    return null;
  }
};

const savedState = Cookies.get("gameProgress");
const decryptedState = savedState ? decryptData(savedState) : null;

const initialState = decryptedState && decryptedState.unlockedLevels
  ? decryptedState
  : {
      unlockedLevels: Object.keys(LEVEL_MAP).reduce((acc, level) => {
        acc[level] = level === "level_1"; // Only "level_1" is unlocked initially
        return acc;
      }, {}),
      latestUnlockedLevel: LEVEL_MAP["level_1"] // Store the actual route, not just "level_1"
    };

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    unlockLevel: (state, action) => {
      const levelToUnlock = action.payload;
      if (LEVEL_MAP[levelToUnlock]) { // Ensure it's a valid level
        state.unlockedLevels[levelToUnlock] = true;
        state.latestUnlockedLevel = LEVEL_MAP[levelToUnlock]; // Store route instead of name
        Cookies.set("gameProgress", encryptData(state), { expires: 7, secure: true, sameSite: 'Strict' });
      }
    },
    lockLevel: (state, action) => {
      const levelToLock = action.payload;
      if (LEVEL_MAP[levelToLock] && state.unlockedLevels[levelToLock]) {
        state.unlockedLevels[levelToLock] = false;
        if (state.latestUnlockedLevel === LEVEL_MAP[levelToLock]) {
          state.latestUnlockedLevel = LEVEL_MAP["level_1"]; // Reset to first level if locked
        }
        Cookies.set("gameProgress", encryptData(state), { expires: 7, secure: true, sameSite: 'Strict' });
      }
    },
  },
});

console.log("Initial State Loaded:", initialState); // Debugging log
export const { unlockLevel, lockLevel } = gameSlice.actions;

const rootReducer = combineReducers({
  game: gameSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

// Expose Redux store globally
window.reduxStore = store;
window.dispatchUnlockLevel = (level) => {
  window.reduxStore.dispatch(unlockLevel(level));
};
window.dispatchLockLevel = (level) => {
  window.reduxStore.dispatch(lockLevel(level));
};

export default store;