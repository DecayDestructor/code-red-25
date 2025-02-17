import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Backstory_Level_1_3 from "../../assets/backstory/Backstory_Level_1_3"

const Backstory_Level_1_3 = () => {
    const [text, setText] = useState("");
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const navigate = useNavigate();

    // First text passage
    const firstPassage = `  Gavin enters the dungeon and sees a depiction hanging on the wall of the battlefield and perhaps the only surviving object from the massacre of Azzgardos. The painting is said to have the clues to enter the location to the catacombs of Ehmest.`;

    // Second text passage
    const secondPassage = `  "A picture holds more than you see,
A silent whisper, a hidden key.
Not in the input frame, but the image deep behind,
is the place you seek where EXIF hides."`;

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
            navigate("/level_1");
        }
    };

    return (
        <div className="flex justify-center items-center flex-col h-screen relative">
            {/* Background Image */}
            <img
                src={Backstory_Level_1_3}
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