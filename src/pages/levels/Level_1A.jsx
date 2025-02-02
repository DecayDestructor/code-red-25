import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet"; // Add this import
import LayoutPage from '../interfaces/LayoutPage';

const Level_1A = () => {
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const [isNextClicked, setIsNextClicked] = useState(false);
    const [text, setText] = useState("");
    const [userInput, setUserInput] = useState("");
    const [resultMessage, setResultMessage] = useState("");

    const navigate = useNavigate();
    const typingSpeed = 3;
    const correctTranslation = "KBGSLM";

    const sourceText = `  In the fabric of the page, whispers remain,
    Lying beneath, without a name.
    Seek the silent truth, veiled in code,
    Where the source reveals the path once sowed.`;

    useEffect(() => {
        let index = 0;

        const interval = setInterval(() => {
            if (index < sourceText.length) {
                setText((prev) => prev + (sourceText[index] || ""));
                index++;
            } else {
                clearInterval(interval);
                setIsTypingComplete(true);
            }
        }, typingSpeed);

        return () => clearInterval(interval);
    }, []);

    const handleVerify = () => {
        if (userInput.trim().toUpperCase() === correctTranslation) {
            setResultMessage("Correct! Well done!");
            setTimeout(() => {
                navigate("/level_2");
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
                    src="src/assets/levels/Level_1A.png"
                    alt="Background"
                    className="object-cover w-full h-full absolute z-0"
                />
                <LayoutPage />

                {!isNextClicked ? (
                    <div className="relative bg-white bg-opacity-50 p-6 rounded-lg max-w-3xl z-10">
                        <h1 className="text-2xl tracking-wide whitespace-pre-line text-center">
                            {text}
                            {!isTypingComplete && <span className="animate-pulse">|</span>}
                        </h1>
                        {isTypingComplete && (
                            <button
                                onClick={() => setIsNextClicked(true)}
                                className="absolute bottom-[-4rem] right-0 px-6 py-3 bg-white bg-opacity-50 text-2xl tracking-wide rounded-lg hover:bg-opacity-80 transition-transform transform hover:scale-105"
                            >
                                Next
                            </button>
                        )}
                    </div>
                ) : (
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
                )}
            </div>
        </>
    );
};

export default Level_1A;