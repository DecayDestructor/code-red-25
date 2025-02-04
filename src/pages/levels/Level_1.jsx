import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet"; // Add this import
import LayoutPage from '../interfaces/LayoutPage';

const Level_1A = () => {
    const [userInput, setUserInput] = useState("");
    const [resultMessage, setResultMessage] = useState("");

    const navigate = useNavigate();
    const correctTranslation = "PARTHENON GREECE";

    const handleVerify = () => {
        if (userInput.trim().toUpperCase() === correctTranslation) {
            setResultMessage("Correct! Well done!");
            setTimeout(() => {
                navigate("/backstory_level_2");
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
        <>
            <Helmet>
                <meta name="creature-name" content="In the whispers of time, the serpent winds backwards" />
            </Helmet>
            <div className="flex justify-center items-center flex-col h-screen relative">
                <img
                    src="src/assets/levels/Level_1.jpg"
                    alt="Background"
                    className="object-cover w-full h-full absolute z-0"
                />
                <LayoutPage />\
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
        </>
    );
};

export default Level_1A;