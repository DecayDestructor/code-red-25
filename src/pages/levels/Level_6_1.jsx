import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LayoutPage from '../interfaces/LayoutPage';

const BackstoryLevelComponent = () => {
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const [isNextClicked, setIsNextClicked] = useState(false);
    const [text, setText] = useState("");
    const [userInput, setUserInput] = useState("");
    const [resultMessage, setResultMessage] = useState("");
    const navigate = useNavigate();

    const typingSpeed = 3;
    const correctTranslation = "3.7.8.9";

    // First text passage
    const firstPassage = `  Malakaroth was famed for his ruthless cunning and cursed devices that trapped victims in webs of black magic. Hidden deep in the palace, his war room held the secrets to these traps. Gavin’s mission was to uncover the mystery and find the coordinates before it was too late. But as he ventured deeper, the sense of being watched grew stronger.
    What could help him in this endeavor? Perhaps the answer lies in an ancient riddle.`;

    // Second text passage
    const secondPassage = `  In steel halls, whispers of logic I weave, 
A language born where bright ideas cleave. 
From ancient roots, I rise, simple and strong, 
Guiding the coder's hand, all night long.`;

    const [currentPassage, setCurrentPassage] = useState(firstPassage);

    useEffect(() => {
        setText("");
        setIsTypingComplete(false);
        let index = 0;

        const interval = setInterval(() => {
            if (index < currentPassage.length) {
                setText((prev) => prev + (currentPassage[index] || ""));
                index++;
            } else {
                clearInterval(interval);
                setIsTypingComplete(true);
            }
        }, typingSpeed);

        return () => clearInterval(interval);
    }, [currentPassage]);

    // Handle verification of user input
    const handleVerify = () => {
        if (userInput.trim().toUpperCase() === correctTranslation) {
            setResultMessage("Correct! Well done!");
            setTimeout(() => {
                navigate("/level_7_1    ");
            }, 1500);
        } else {
            setResultMessage("Incorrect. Try again!");
        }
    };

    const handleNextClick = () => {
        if (currentPassage === firstPassage) {
            // If currently showing the first passage, switch to the second
            setCurrentPassage(secondPassage);
        } else {
            // If showing the second passage, show the input
            setIsNextClicked(true);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleVerify();
        }
    };

    return (
        <div className="flex justify-center items-center flex-col h-screen relative">
            {/* Background Image */}
            <img
                src="src/assets/levels/level_6_1.png"
                alt="Background"
                className="object-cover w-full h-full absolute z-0"
            />
            <LayoutPage />

            {!isNextClicked ? (
                // Typewriter effect section
                <div className="relative bg-white bg-opacity-50 p-6 rounded-lg max-w-3xl z-10">
                    <h1 className={`text-2xl tracking-wide whitespace-pre-line ${currentPassage === secondPassage ? 'text-center' : ''}`}>
                        {text}
                        {!isTypingComplete && <span className="animate-pulse">|</span>}
                    </h1>
                    {isTypingComplete && (
                        <button
                            onClick={handleNextClick}
                            className="absolute bottom-[-4rem] right-0 px-6 py-3 bg-white bg-opacity-50 text-2xl tracking-wide rounded-lg hover:bg-opacity-80 transition-transform transform hover:scale-105"
                        >
                            {currentPassage === firstPassage ? "Continue" : "Next"}
                        </button>
                    )}
                </div>
            ) : (
                // Input and submit box section
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
    );
};

export default BackstoryLevelComponent;