import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Backstory_Level_1_2 = () => {
    const [text, setText] = useState("");
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const navigate = useNavigate();

    // Replace all newline characters with spaces
    const sourceText = `  The grave unfolds to show Arthur's sword and there lies another torch; similar to the ones in the dungeon. As soon as Gavin touches the torch he teleports back to the dungeon. Now he returns to the palace and plans an attack on the borders of Malakaroth; the land of titans. Titans have long been under the control of demons. They don’t justify death, but believe in absolute carnage; sole carnage. But only one power; the infinite power of the light of sun can scorch the titans to death. But Malakaroth has used the spell of eternal darkness that has led to dark clouds blocking last of the rays of sunlight that can penetrate to the land of titans. Gavin knows about this; and also knows the sole way to defeat titans and that is undoing the spell.`;
    const typingSpeed = 3;

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
                        onClick={() => navigate("/level_3")}
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
