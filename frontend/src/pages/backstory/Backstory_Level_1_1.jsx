import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Backstory_Level_1_1 = () => {
    const [text, setText] = useState("");
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const navigate = useNavigate();

    // Replace all newline characters with spaces
    const sourceText = `Gaavin (You) rules the city of Azgardos, the only remaining citadel of the gods that houses the last of the once majestic palace. It’s well hidden; far from the continent of Kravaros. Just like your ancestors you wish to wage and continue the war against Lord Malakaroth. There is a dungeon; peculiar indeed, where even the best of the warriors are afraid to go to... in the dark corners of the citadel of Azgardos. The doors of the dungeon are protected by the best of sorcerers. The dungeon was cursed by Hades himself and possesses the essence of Ehmest, as it violated the laws of the underworld set by him. Since Gavin belongs to the bloodline of Hades; he can visit the dungeon to understand its secrets and know more about ways to win this war. The dungeon is said to posess route to the Arthur’s sword.`;
    const typingSpeed = 40;

    useEffect(() => {
        let index = 0;

        const interval = setInterval(() => {
            if (index < sourceText.length) {
                // Append the next character if it exists
                setText((prev) => prev + (sourceText[index] || ""));
                index++;
            } else {
                clearInterval(interval);
                setIsTypingComplete(true);
            }
        }, typingSpeed);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex justify-center items-center flex-col h-screen relative">
            {/* Background Image */}
            <img
                src="src/assets/backstory/Backstory.png"
                alt="Background"
                className="object-cover w-full h-full absolute z-0"
            />
            {/* Text Container */}
            <div className="relative bg-white bg-opacity-50 p-6 rounded-lg max-w-3xl z-10">
                <h1 className="text-2xl tracking-wide">
                    {text}
                    {!isTypingComplete && <span className="animate-pulse">|</span>}
                </h1>
                {isTypingComplete && (
                    <button
                        onClick={() => navigate("/backstory_Level_1_2")}
                        className="absolute bottom-[-4rem] right-0 px-6 py-3 bg-white bg-opacity-50 text-2xl tracking-wide rounded-lg hover:bg-opacity-80 transition-transform transform hover:scale-105"
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

export default Backstory_Level_1_1;
