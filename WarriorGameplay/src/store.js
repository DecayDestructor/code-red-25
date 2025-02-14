// src/store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import { combineReducers } from 'redux';
import { LEVEL_MAP } from './utils/levelRoutes';

const SECRET_KEY = "your-secret-key";

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

// Load initial state from cookies
const savedState = Cookies.get("gameProgress");
const initialState = savedState ? decryptData(savedState) : {
  unlockedLevels: Object.keys(LEVEL_MAP).reduce((acc, level) => {
    acc[level] = level === 'level_1'; // Only level_1 is unlocked initially
    return acc;
  }, {}),
  latestUnlockedLevel: 'level_1' // Track the most recently unlocked level
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    unlockLevel: (state, action) => {
      const levelToUnlock = action.payload;
      if (LEVEL_MAP.includes(levelToUnlock)) {
        state.unlockedLevels[levelToUnlock] = true;
        state.latestUnlockedLevel = levelToUnlock;
        Cookies.set("gameProgress", encryptData(state), { expires: 7, secure: true, sameSite: 'Strict' });
      }
    },
  },
});

export const { unlockLevel } = gameSlice.actions;

const rootReducer = combineReducers({
  game: gameSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
