import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../../assets/backstory/Backstory.png"

const Backstory_Level_1_3 = () => {
    const [text, setText] = useState("");
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const navigate = useNavigate();

    // First text passage
    const firstPassage = `  The Reverse World is built on chaos, this is where gods used to banish the most horrid creatures to ever roam the universe. To succeed, one must navigate this twisted world swiftly, for hesitation is deadly. In the Reverse World, there is no time to waste. The key to ending Malakroth's reign and restoring light to Azgardos lies within this nightmarish dimension.`;

    // Second text passage
    const secondPassage = ` "In the whispers of time, the serpent winds backwards". What does it mean? Backwards shall you wind? Or reversal shall you do?`;

    const [currentPassage, setCurrentPassage] = useState(firstPassage);
    const typingSpeed = 3;

    useEffect(() => {
        setText("");
        setIsTypingComplete(false);
        let index = 0;

        const interval = setInterval(() => {
            if (index < currentPassage.length) {
                // Append the next character if it exists
                setText((prev) => prev + (currentPassage[index] || ""));
                index++;
            } else {
                clearInterval(interval);
                setIsTypingComplete(true);
            }
        }, typingSpeed);

        return () => clearInterval(interval);
    }, [currentPassage]);

    const handleNextClick = () => {
        if (currentPassage === firstPassage) {
            // If currently showing the first passage, switch to the second
            setCurrentPassage(secondPassage);
        } else {
            // If showing the second passage, navigate to the next level
            navigate("/level_1a");
        }
    };

    return (
        <div className="flex justify-center items-center flex-col h-screen relative">
            {/* Background Image */}
            <img
                src={bg}
                alt="Background"
                className="object-cover w-full h-full absolute z-0"
            />
            {/* Text Container */}
            <div className="relative bg-white bg-opacity-70 p-6 rounded-lg w-[48%] z-10 h-[66%]">
                <h1 className={`text-2xl tracking-wide whitespace-pre-line ${currentPassage === secondPassage ? 'text-center' : ''}`}>
                    {text}
                    {!isTypingComplete && <span className="animate-pulse">|</span>}
                </h1>
                {isTypingComplete && (
                    <button
                        onClick={handleNextClick}
                        className="absolute bottom-[-4rem] right-0 px-6 py-3 bg-white bg-opacity-70 text-2xl tracking-wide rounded-lg hover:bg-opacity-90 transition-transform transform hover:scale-105"
                    >
                        {currentPassage === firstPassage ? "Continue" : "Next"}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Backstory_Level_1_3;