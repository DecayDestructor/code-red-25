import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LayoutPage from '../interfaces/LayoutPage';

const Level7_1 = () => {
    const [text, setText] = useState("");
    const [buttonsState, setButtonsState] = useState(Array(9).fill("0"));
    const targetPattern = "110011011";
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const sourceText = `  Gavin stood before the locked box, heart pounding. Inside lay Ichorfonias, the heart of Malakaroth's power-an invention born of pride, cruelty, and dark magic. Created by an ex-servant of Hephaestus, it was a living testament to obsession, a machine so intricate it held the very soul of its maker. Destroying it wasn't just ending a creation—it was crushing Malakaroth's reign and stripping him of his most deadly weapon. The key to his downfall lay within this box. The puzzle was maddening, but Gavin's determination burned brighter. He had to act quickly—solve the riddle, break the lock, and destroy Ichorfonias before it was too late. The moment that lock clicked open, victory would be his, and the tyrant's reign would end. Ichorfonias's op code read– To find the slope, a path you tread, By my rule, the curve is read. One mark, one change, the tale's creation—`;
    const typingSpeed = 3;

    const navigate = useNavigate();

    useEffect(() => {
        let index = 0;

        const interval = setInterval(() => {
            if (index < sourceText.length) {
                setText((prev) => prev + (sourceText[index] || ""));
                index++;
            } else {
                clearInterval(interval);
                setIsTypingComplete(true);
                document.getElementById("middle-text").classList.remove("hidden");
            }
        }, typingSpeed);

        return () => clearInterval(interval);
    }, []);

    const handleButtonClick = (index) => {
        const newState = [...buttonsState];
        newState[index] = newState[index] === "0" ? "1" : "0";
        setButtonsState(newState);
    };

    const handleSubmit = () => {
        const currentPattern = buttonsState.join("");
        if (currentPattern === targetPattern) {
            setIsCorrect(true);
            setTimeout(() => {
                navigate("/options_level_7a");
            }, 1000); // Add a slight delay for the green feedback to show
        }
    };

    return (
        <div className="flex justify-center items-center flex-col h-screen relative">
            {/* Background Image */}
            <img
                src="src/assets/backstory/Backstory.png"
                alt="Background"
                className="object-cover w-full h-full absolute z-0"
            />
            <LayoutPage />

            <div className="relative bg-gray-700 bg-opacity-70 w-11/12 max-w-4xl p-5 rounded-lg border-4 border-yellow-600 shadow-lg flex flex-col items-center">
                <div className="bg-red-800 bg-opacity-80 w-full p-3 rounded-md border-4 border-white shadow-md">
                    <p id="source-text" className="text-white text-lg font-bold text-center">
                        {text}
                        {!isTypingComplete && <span className="animate-pulse">|</span>}
                    </p>
                </div>

                <div id="middle-text" className="bg-red-800 bg-opacity-80 w-1/3 p-3 mt-5 rounded-md border-4 border-white shadow-md hidden">
                    <p className="text-white text-lg font-bold text-center">x<sup>5</sup>, e<sup>x</sup>, x<sup>2</sup></p>
                </div>

                <div className="flex flex-wrap gap-4 justify-center items-center mt-5">
                    {buttonsState.map((value, index) => (
                        <button
                            key={index}
                            onClick={() => handleButtonClick(index)}
                            className={`w-20 h-20 text-2xl font-bold border-4 rounded-lg cursor-pointer transition-all ${
                                isCorrect
                                    ? "border-green-500 bg-green-300"
                                    : value === "1"
                                    ? "border-red-500 bg-red-200"
                                    : "border-gray-400 bg-white"
                            }`}
                        >
                            {value}
                        </button>
                    ))}
                </div>

                <button
                    onClick={handleSubmit}
                    className={`mt-5 px-6 py-3 text-white text-lg font-bold rounded-lg shadow-md transition-transform transform hover:scale-105 ${
                        isCorrect ? "bg-green-500" : "bg-gradient-to-r from-pink-500 to-orange-400"
                    }`}
                >
                    Submit Code
                </button>
            </div>
        </div>
    );
};

export default Level7_1;
