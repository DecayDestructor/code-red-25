import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Backstory_Level_1_2 = () => {
    const [text, setText] = useState("");
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const navigate = useNavigate();

    // Replace all newline characters with spaces
    const sourceText = `  After the war of Azzgardos, Malakaroth had sent one of his most powerful army; the Elitos army, to attack the capital of gods; Azzgardos. Fearless Arthur led the final defence to save Azzgardos by blocking every possible entrance to the capital, but alas only one dungeon remained. The dungeon harboured a horrible creature that led to the death of the great demigod; Arthur. The sword fell inside the portal to the catacombs of Ehmest... The dungeon was later locked and protected by the wizards to avoid any attacks by the demonic creature. Just like your predecessors, even if you wish to wage a battle against Malakaroth, and to do that you will now enter the dungeon to start your path to find the sword of Arthur the great.`;
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
                src="src/assets/backstory/Backstory_Level_1_2.png"
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
                        onClick={() => navigate("/backstory_level_1_3")}
                        className="absolute bottom-[-4rem] right-0 px-6 py-3 bg-white bg-opacity-50 text-2xl tracking-wide rounded-lg hover:bg-opacity-80 transition-transform transform hover:scale-105"
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

export default Backstory_Level_1_2;
