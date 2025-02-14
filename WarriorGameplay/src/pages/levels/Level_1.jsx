import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LayoutPage from '../interfaces/LayoutPage';
import { useDispatch } from 'react-redux';
import { unlockLevel  } from '../../store';

const Level_1A = () => {
    const [userInput, setUserInput] = useState("");
    const [resultMessage, setResultMessage] = useState("");
    const dispatch = useDispatch();
    dispatch(unlockLevel("level_1a"));

    const navigate = useNavigate();
    const correctTranslations = ["PARTHENON GREECE", "ATHENS GREECE"];

    const handleVerify = () => {
        if (correctTranslations.includes(userInput.trim().toUpperCase())) {
            setResultMessage("Correct! Well done!");
            setTimeout(() => {
                dispatch(unlockLevel("level_1A"));
                navigate("/backstory_level_1a");
            }, 1500);
        } else {
            setResultMessage("Incorrect. Try again!");
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleVerify();
        }
    };

    return (
        <div className="flex justify-center items-center flex-col h-screen relative">
            <img
                src="src/assets/levels/Level_1.jpg"
                alt="Background"
                className="object-cover w-full h-full absolute z-0"
            />
            <LayoutPage />
            <div className="bg-black bg-opacity-50 backdrop-blur-md shadow-lg rounded-lg p-8 w-11/12 sm:w-2/3 lg:w-1/3 text-white text-center">
                <h1 className="text-2xl font-bold mb-4">Enter Answer</h1>
                <input
                    type="text"
                    id="morseInput"
                    placeholder="Enter Your Answer Here"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="w-full px-4 py-2 text-black rounded-md border-2 border-gray-300 focus:outline-none focus:border-white focus:ring focus:ring-white"
                />
                <button
                    id="verifyButton"
                    onClick={handleVerify}
                    className="mt-4 px-6 py-2 bg-blue-900 hover:bg-blue-700 text-white font-semibold rounded-md"
                >
                    Verify
                </button>
                <p id="resultMessage" className="mt-4 text-lg font-medium">
                    {resultMessage}
                </p>
            </div>
        </div>
    );
};

export default Level_1A;