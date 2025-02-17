import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Backstory from "../../assets/backstory/Backstory.png"

const Backstory_Level_1_1 = () => {
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const [isNextClicked, setIsNextClicked] = useState(false);
    const [text, setText] = useState("");
    const [showSpecialChars, setShowSpecialChars] = useState(false);

    const navigate = useNavigate();
    const typingSpeed = 3;

    const sourceText = `  In the eerie catacombs of Ehmest, silence weighs heavily, broken only by your footsteps. At a narrow corridor's end, a dead end reveals a grave marked by an intricate seal of cryptic, familiar symbols. On the wall there is some text shimmering in a fading glow "What must you use to tap and write, to communicate, often and daily. Fit for your pockets and usable with your fingers." before it fully fades, leaving Gavin alone with the symbols engraved on the grave...`;

    useEffect(() => {
        let index = 0;

        const interval = setInterval(() => {
            if (index < sourceText.length) {
                setText((prev) => prev + (sourceText[index] || ""));
                index++;
            } else {
                clearInterval(interval);
                setShowSpecialChars(true);
                setTimeout(() => {
                    setIsTypingComplete(true);
                }, 500);
            }
        }, typingSpeed);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex justify-center items-center flex-col h-screen relative">
            <img
                src={Backstory}
                alt="Background"
                className="object-cover w-full h-full absolute z-0"
            />
            <div className="relative bg-white bg-opacity-70 p-6 rounded-lg w-[48%] z-10 h-[66%]">
                <div className="flex flex-col items-center">
                    <h1 className="text-2xl tracking-wide mb-4">
                        {text}
                        {!showSpecialChars && <span className="animate-pulse">|</span>}
                    </h1>
                    <div className="text-4xl font-bold mt-6">
                        {showSpecialChars && "#&*"}
                        {showSpecialChars && !isTypingComplete && (
                            <span className="animate-pulse">|</span>
                        )}
                    </div>
                </div>
                {isTypingComplete && (
                    <button
                        onClick={() => navigate("/level_2")}
                        className="absolute bottom-[-4rem] right-0 px-6 py-3 bg-white bg-opacity-70 text-2xl tracking-wide rounded-lg hover:bg-opacity-90 transition-transform transform hover:scale-105"
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

export default Backstory_Level_1_1;
