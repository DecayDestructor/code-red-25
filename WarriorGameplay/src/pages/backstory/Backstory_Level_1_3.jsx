import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Backstory_Level_1_3 = () => {
    const [text, setText] = useState("");
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const navigate = useNavigate();

    // First text passage
    const firstPassage = `  You enter the dungeon, and to your astonishment, a message glows on the wall, written in bright golden ichor-God's blood: "He was not fast enough. He died. Now you will too." Undeterred, you press forward into the pitch darkness, only to collide with a heavy wooden door. Again, glowing golden ichor etches a sinister message: "Too Slow; TOO SLOW! There resides Rhaegan, a majestic dragon, forged by demons through ancient hybridization techniques. It loathes slow, feeble intruders like YOU! Only five warriors have ever made it past. Will you be the sixth?" The challenge lies ahead—time to prove your worth.`;

    // Second text passage
    const secondPassage = `  I'm quick as a wink, 
    I'm gone in a flash,
    If you try to catch me,
    You'll never last.
    Only 10th second of your life has power
    If not, then there will be a blood shower...`;

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
                src="src/assets/backstory/Backstory_Level_1_3.png"
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