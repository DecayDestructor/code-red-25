import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Backstory from "../../assets/backstory/Backstory.png"

const Backstory_Level_1_3 = () => {
    const [text, setText] = useState("");
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const navigate = useNavigate();

    // First text passage
    const firstPassage = `  Gavin stood before the locked box, heart pounding. Inside lay Ichorfonias, the heart of Malakaroth's power—an invention born of pride, cruelty, and dark magic. Created by an ex-servant of Hephaestus, it was a living testament to obsession, a machine so intricate it held the very soul of its maker. Destroying it wasn't just ending a creation—it was crushing Malakaroth's reign and stripping him of his most deadly weapon. Ichorfonias's op code read-`;

    // Second text passage
    const secondPassage = `  In endless sums where patterns reside,
    I dance through terms with a shifting stride.
    First I diffrentiate myself with precision and grace,
    Then I integrate to a higher place.
    A sequence of steps both subtle and fleet,
    Till convergence and binary finally meet.`;

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
            navigate("/level_7_1");
        }
    };

    return (
        <div className="flex justify-center items-center flex-col h-screen relative">
            {/* Background Image */}
            <img
                src={Backstory}
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