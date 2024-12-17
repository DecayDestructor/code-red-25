import React, { useEffect, useState } from "react";

const CombinedComponent = () => {
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const [isNextClicked, setIsNextClicked] = useState(false);
    const [text, setText] = useState("");
    const [userInput, setUserInput] = useState("");
    const [resultMessage, setResultMessage] = useState("");

    const typingSpeed = 40;
    const correctTranslations = ["sgz", "tki", "378"];

    // Typewriter effect for backstory text
    const sourceText = `  The reverse world has always been the place where gods dispose of some of the most horrid creatures known to have stepped in this universe. They get teleported to the reverse world of Azgardos in catacombs which is very far from Arthur’s grave. There resides a map secretly protected by a serpent. The map is protected by the descendants of the underworld. Time runs unpredictably fast in the reverse world; so this time DON’T BE SLOW.`;

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

    // Handle verification of user input

    const handleVerify = () => {
        if (correctTranslations.includes(userInput.trim().toLowerCase())) {
            setResultMessage("Correct! Well done!");
            setTimeout(() => {
                window.location.href = "/backstory_level_3";
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
            {/* Background Image */}
            <img
                src="src/assets/levels/Level_1A.png"
                alt="Background"
                className="object-cover w-full h-full absolute z-0"
            />

            {!isNextClicked ? (
                // Typewriter effect section
                <div className="relative bg-white bg-opacity-50 p-6 rounded-lg max-w-3xl z-10">
                    <h1 className="text-2xl tracking-wide">
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

export default CombinedComponent;
